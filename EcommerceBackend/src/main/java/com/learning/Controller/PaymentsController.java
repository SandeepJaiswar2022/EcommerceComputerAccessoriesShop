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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class PaymentsController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);
    private final OrderItemRepo orderItemRepo;
    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    private final OrderService orderService;

    private final UserService userService;

    private final OrderRepo orderRepo;

    @PostMapping("/payments/{orderId}")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<PaymentResponse> createPaymentLink(
            @PathVariable int orderId, @RequestHeader("Authorization") String authHeader)
            throws OrderException, RazorpayException {
        Order order = orderService.getOrderById(orderId);
        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            // Customer details
            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstname());
            customer.put("email", order.getUser().getEmail());

            // Notification settings
            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);

            // Payment link request
            JSONObject paymentLinkRequest = new JSONObject();

            // Correct amount conversion to paise (assuming 'order.getTotalDiscountPrice()' returns BigDecimal)
            BigDecimal totalDiscountPrice = order.getTotalDiscountPrice();
            int amountInPaise = totalDiscountPrice.movePointRight(2).intValueExact(); // Multiply by 100 to convert to paise

            System.out.println("\n\n\nAmount in Paise: " + amountInPaise + "\n\n\n");

//            if (amountInPaise > 500000) {
//                throw new RazorpayException("Amount exceeds the maximum allowed limit of INR 5,000.");
//            }
            paymentLinkRequest.put("amount",900000 ); // Amount in paise
            paymentLinkRequest.put("accept_partial", false);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("notify", notify);
            paymentLinkRequest.put("customer", customer);

            // Callback URL to redirect after payment completion
            paymentLinkRequest.put("callback_url", "http://localhost:5173/postordersummary/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Create payment link
            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            // Extract payment link details
            String paymentLinkId = paymentLink.get("id");
            String paymentLinkURL = paymentLink.get("short_url");

            // Prepare the response
            PaymentResponse paymentResponse = new PaymentResponse();
            paymentResponse.setPaymentLinkId(paymentLinkId);
            paymentResponse.setPaymentLinkURL(paymentLinkURL);

            return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);

        } catch (RazorpayException e) {
            throw new RazorpayException(e.getMessage());
        }
    }



    @GetMapping("/payments")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<?> redirect(
            @RequestParam(name = "paymentId")String paymentId,
            @RequestParam(name = "orderId")int orderId) throws OrderException, RazorpayException {
        Order order = orderService.getOrderById(orderId);
        RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
        System.out.println("\nCalled1\n");
        try {
            Payment payment = razorpay.payments.fetch(paymentId);
            System.out.println("\nCalled2\n");
            String paymentMethod = payment.get("method");
            String amountPaid  = payment.get("amount");
            long createdAt = payment.get("created_at");

            // Convert the Unix timestamp to LocalDateTime
            LocalDateTime dateTime = LocalDateTime.ofInstant(Instant.ofEpochSecond(createdAt), ZoneId.systemDefault());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = dateTime.format(formatter);


            if(payment.get("status").equals("captured")) {
                //System.out.println("\n\nPayment ID : "+paymentId+"\n\n");
                System.out.println("\nCalled3\n");
                order.getPaymentDetail().setPaymentId(paymentId);
                order.getPaymentDetail().setPaymentMethod(paymentMethod);
                order.getPaymentDetail().setPaymentDateAndTime(formattedDateTime);
                order.getPaymentDetail().setAmountPaid(amountPaid);
                order.getPaymentDetail().setStatus("COMPLETED");
               // System.out.println("\n\nPayment Status : "+order.getPaymentDetail().getStatus()+"\n\n");

                List<OrderItem> orderItems = order.getOrderItems();

                for (OrderItem orderItem : orderItems )
                {
                    orderItem.setOrderStatus("CONFIRMED");
                    System.out.println("\nCalled4\n");
                    orderItemRepo.save(orderItem);
                }
                order.setOrderItems(orderItems);
                orderRepo.save(order);
            }
            ApiResponse response = new ApiResponse();
            response.setStatus(true);
            response.setMsg("Your order has been placed");
            System.out.println("\nCalled1\n");
            return new ResponseEntity<ApiResponse>(response,HttpStatus.ACCEPTED);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
