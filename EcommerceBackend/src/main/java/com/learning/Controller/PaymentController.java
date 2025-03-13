package com.learning.Controller;

import com.learning.DTO.ApiResponse;
import com.learning.DTO.PaymentResponse;
import com.learning.Exception.OrderException;
import com.learning.Model.Order;
import com.learning.Model.OrderItem;
import com.learning.Repository.OrderItemRepo;
import com.learning.Repository.OrderRepo;
import com.learning.Service.OrderService;
import com.learning.Service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);
    private final OrderItemRepo orderItemRepo;
    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    private final OrderService orderService;

    private final UserService userService;

    private final OrderRepo orderRepo;

    @PostMapping("/payment/{orderId}")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<PaymentResponse> createPaymentLink(
            @PathVariable int orderId, @RequestHeader("Authorization") String authHeader)
            throws OrderException, RazorpayException {
        Order order = orderService.getOrderById(orderId);
        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstname());
            customer.put("email", order.getUser().getEmail());

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);

            JSONObject paymentLinkRequest = new JSONObject();
            int amount = order.getTotalDiscountPrice().setScale(0, RoundingMode.FLOOR).intValue();
            System.out.println("\n\n\nAmount : " + amount+"\n\n\n");
            long amountInPaise = amount * 100L;
            paymentLinkRequest.put("amount", amountInPaise);
            paymentLinkRequest.put("accept_partial", false);
            paymentLinkRequest.put("first_min_partial_amount", amountInPaise);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("notify", notify);
            paymentLinkRequest.put("customer", customer);
            paymentLinkRequest.put("callback_url", "http://localhost:5176/postordersummary/"+orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest); //client.create.order(pymntrequest)

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkURL = paymentLink.get("short_url");

            PaymentResponse paymentResponse = new PaymentResponse();
            paymentResponse.setPaymentLinkId(paymentLinkId);
            paymentResponse.setPaymentLinkURL(paymentLinkURL);
            return new ResponseEntity<PaymentResponse>(paymentResponse, HttpStatus.CREATED); //

        } catch (RazorpayException e) {
            throw new RazorpayException(e.getMessage());
        }
    }


    @GetMapping("/payment")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<ApiResponse> redirect(
            @RequestParam(name = "paymentId")String paymentId,
            @RequestParam(name = "orderId")int orderId) throws OrderException, RazorpayException {
        Order order = orderService.getOrderById(orderId);
        System.out.println("\nCalled1 Payment id "+paymentId+"\n");
        RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
        try {
            Payment payment = razorpay.payments.fetch(paymentId);
            //Method card or upi
            String paymentMethod = payment.get("method");
            System.out.println("\nCalled2 "+paymentMethod+"\n");
            //Amount
            Integer amountPaid = (Integer) payment.get("amount");
            String amountPaidString = String.valueOf(amountPaid);
            System.out.println("\nCalled3\n" + amountPaidString + "\n");
            //Created at
            Date createdAtDate = (Date) payment.get("created_at");
            LocalDateTime dateTime = createdAtDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = dateTime.format(formatter);
            System.out.println("\nCalled4\n" + formattedDateTime + "\n");

            if(payment.get("status").equals("captured")) {
                System.out.println("\nCalled5 "+"captured");
                System.out.println("\n\nPayment ID : "+paymentId+"\n\n");
                order.getPaymentDetail().setPaymentId(paymentId);
                order.getPaymentDetail().setPaymentMethod(paymentMethod);
                order.getPaymentDetail().setPaymentDateAndTime(formattedDateTime);
                order.getPaymentDetail().setAmountPaid(amountPaidString);
                order.getPaymentDetail().setStatus("COMPLETED");
                System.out.println("\nPayment Status : "+order.getPaymentDetail().getStatus()+"\n\n");
                List<OrderItem> orderItems = order.getOrderItems();
                List<OrderItem> updatedOrderItems = new ArrayList<OrderItem>();

                for (OrderItem orderItem : orderItems )
                {
                    orderItem.setOrderStatus("CONFIRMED");
//                    System.out.println("\nCalled6666  ");
                    updatedOrderItems.add(orderItem);
                }

                for (OrderItem updatedItem : updatedOrderItems) {
                    System.out.println("\nCalled6666");
                    orderItemRepo.save(updatedItem);  // Save outside the iteration
                }
                order.setOrderItems(updatedOrderItems);
                orderRepo.save(order);
            }
            ApiResponse response = new ApiResponse();
            response.setStatus(true);
            System.out.println("\nCalled8\n");
            response.setMsg("Your order has been placed");
            return new ResponseEntity<ApiResponse>(response,HttpStatus.ACCEPTED);
        }catch (Exception e) {
            e.printStackTrace();
            throw new RazorpayException(e.getMessage());
        }

    }
}
