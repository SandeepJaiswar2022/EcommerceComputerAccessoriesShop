package com.learning.Controller;

import com.learning.Exception.CartItemException;
import com.learning.Exception.OrderException;
import com.learning.Exception.UserException;
import com.learning.Model.Address;
import com.learning.Model.Order;
import com.learning.Model.User;
import com.learning.Repository.AddressRepo;
import com.learning.Service.OrderItemService;
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
    private final OrderItemService orderItemService;
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
        System.out.println("\n\nGet user history of orders called\n\n");
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<?> userOrderHistory(
            @RequestHeader("Authorization") String authHeader
    ) throws UserException {
        User user = userService.findUserByJwtToken(authHeader);
        List<Order> orderList = orderService.usersOrderHistory(user.getId());
        System.out.println("\n\nGet user history of orders called\n\n");
        return ResponseEntity.ok(orderList);
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<?> findOrderById(
            @PathVariable Integer orderId,
            @RequestHeader("Authorization") String authHeader) throws UserException, OrderException {
     User user = userService.findUserByJwtToken(authHeader);
     Order order = orderService.getOrderById(orderId);
     return ResponseEntity.ok(order);
    }

    @GetMapping("/admin/order")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<?> getAllOrders(){
        List<Order> orderList = orderService.getAllOrders();
        System.out.println("\n\nAdmin:Get All orders called\n\n");
        return ResponseEntity.ok(orderList);
    }

    @PutMapping("/admin/order/confirmed/{orderItemId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> confirmOrder(
            @PathVariable Integer orderItemId
            ) throws UserException, OrderException {
        orderItemService.changeOrderItemStatus(orderItemId,"CONFIRMED");
        System.out.println("\n\nChange OrderItem Status Confirmed called\n\n");
        return ResponseEntity.ok("Order confirmed");
    }

    @PutMapping("/admin/order/shipped/{orderItemId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> shipOrder(
            @PathVariable Integer orderItemId
    ) throws UserException, OrderException {
        orderItemService.changeOrderItemStatus(orderItemId,"SHIPPED");
        System.out.println("\n\nChange OrderItem Status Shipped called\n\n");
        return ResponseEntity.ok("Order shipped");
    }

    @PutMapping("/admin/order/delivered/{orderItemId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> deliverOrder(
            @PathVariable Integer orderItemId
    ) throws UserException, OrderException {
        orderItemService.changeOrderItemStatus(orderItemId,"DELIVERED");
        System.out.println("\n\nChange OrderItem Status Delivered called\n\n");
        return ResponseEntity.ok("Order Delivered");
    }

    @PutMapping("/order/{orderItemId}")
    @PreAuthorize("hasAuthority('user:update')")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Integer orderItemId
    ) throws UserException, OrderException {
        orderItemService.changeOrderItemStatus(orderItemId,"CANCELLED");
        System.out.println("\n\nChange OrderItem Status Cancelled called\n\n");
        return ResponseEntity.ok("Order Cancelled");    }

    @DeleteMapping("/admin/order/delete/{orderId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<?> deleteOrderById(
            @PathVariable Integer orderId) throws OrderException {
        orderService.deleteOrder(orderId);
        System.out.println("\n\nDelete Order by id called\n\n");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
