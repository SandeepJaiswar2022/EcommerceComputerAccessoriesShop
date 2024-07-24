package com.learning.Controller;

import com.learning.Exception.CartItemException;
import com.learning.Exception.OrderException;
import com.learning.Exception.UserException;
import com.learning.Model.Address;
import com.learning.Model.Order;
import com.learning.Model.User;
import com.learning.Repository.AddressRepo;
import com.learning.Service.OrderService;
import com.learning.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final AddressRepo addressRepo;

    @PostMapping("/order")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<Order> createOrder(
            @RequestBody Address shippingAddress,
            @RequestHeader("Authorization") String authHeader
            ) throws UserException, CartItemException {
        User user = userService.findUserByJwtToken(authHeader);
        Order order = orderService.createOrder(user,shippingAddress);
        if(order == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<?> userOrderHistory(
            @RequestHeader("Authorization") String authHeader
    ) throws UserException {
        User user = userService.findUserByJwtToken(authHeader);
        List<Order> orderList = orderService.usersOrderHistory(user.getId());
        return ResponseEntity.ok(orderList);
    }

//    @GetMapping("/order/{orderId}")
//    @PreAuthorize("hasAuthority('user:read')")
//    public ResponseEntity<?> findOrderById(
//            @PathVariable Integer orderId,
//            @RequestHeader("Authorization") String authHeader) throws UserException, OrderException {
//     User user = userService.findUserByJwtToken(authHeader);
//     Order order = orderService.getOrderById(orderId);
//     return ResponseEntity.ok(order);
//    }

    @GetMapping("/admin/order")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<?> getAllOrders(){
        List<Order> orderList = orderService.getAllOrders();
        return ResponseEntity.ok(orderList);
    }

    @PutMapping("/admin/order/confirmed/{orderId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> confirmOrder(
            @PathVariable Integer orderId
            ) throws UserException, OrderException {
        Order order = orderService.confirmedOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/admin/order/shipped/{orderId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> shipOrder(
            @PathVariable Integer orderId
    ) throws UserException, OrderException {
        Order order = orderService.shippedOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/admin/order/delivered/{orderId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> deliverOrder(
            @PathVariable Integer orderId
    ) throws UserException, OrderException {
        Order order = orderService.deliveredOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/admin/order/cancelled/{orderId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Integer orderId
    ) throws UserException, OrderException {
        Order order = orderService.cancledOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/admin/order/delete/{orderId}")
    public ResponseEntity<?> deleteOrderById(
            @PathVariable Integer orderId) throws OrderException {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
