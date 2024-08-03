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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class PaymentController {

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
            System.out.println("Razorpay API Key: " + apiKey);
            System.out.println("Razorpay API Secret: " + apiSecret);
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstname());
            customer.put("email", order.getUser().getEmail());

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", Math.round(order.getTotalDiscountPrice()*100));
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("notify", notify);
            paymentLinkRequest.put("customer", customer);
            paymentLinkRequest.put("callback_url", "http://localhost:5173/postordersummary" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkURL = paymentLink.get("short_url");

            PaymentResponse paymentResponse = new PaymentResponse();
            paymentResponse.setPaymentLinkId(paymentLinkId);
            paymentResponse.setPaymentLinkURL(paymentLinkURL);
            return ResponseEntity.ok(paymentResponse);

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
        RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
        try {
            Payment payment = razorpay.payments.fetch(paymentId);
            if(payment.get("status").equals("captured")) {
                order.getPaymentDetail().setPaymentId(paymentId);
                order.getPaymentDetail().setStatus("COMPLETED");
                List<OrderItem> orderItems = order.getOrderItems();
                for (OrderItem orderItem : orderItems )
                {
                    orderItem.setOrderStatus("CONFIRMED");
                    orderItemRepo.save(orderItem);
                }
                order.setOrderItems(orderItems);
                orderRepo.save(order);
            }
            ApiResponse response = new ApiResponse();
            response.setStatus(true);
            response.setMsg("Your order has been placed");
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

}
