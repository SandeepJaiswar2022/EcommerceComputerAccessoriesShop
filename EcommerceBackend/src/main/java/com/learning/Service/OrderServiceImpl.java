package com.learning.Service;

import com.learning.Exception.CartItemException;
import com.learning.Exception.OrderException;
import com.learning.Exception.UserException;
import com.learning.Model.*;
import com.learning.Repository.AddressRepo;
import com.learning.Repository.OrderItemRepo;
import com.learning.Repository.OrderRepo;
import com.learning.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl  implements OrderService{

    private final OrderRepo orderRepo;
    private final CartItemService cartItemService;
    private final AddressRepo addressRepo;
    private final UserRepo userRepo;
    private final OrderItemRepo orderItemRepo;

    @Override
    public Order createOrder(User user, Address shippingAddress) throws CartItemException, UserException {
        shippingAddress.setUser(user);
        //Adding Current address in to the list<address> of User profile
        user.getAddresses().add(addressRepo.save(shippingAddress));
        userRepo.save(user); //updating user

        List<CartItem> cartItemList = cartItemService.findByUser(user); //Getting user cartItems

        List<OrderItem> orderItemList = new ArrayList<>();

        BigDecimal allCartItemPrice = BigDecimal.valueOf(0);
        BigDecimal totalDiscountPrice = BigDecimal.valueOf(0);
        Integer totalQuantity = 0;
        for (CartItem cartItem : cartItemList) {

            OrderItem orderItem = new OrderItem();

            BigDecimal totalPrice= cartItem.getTotalPrice();
            orderItem.setPrice(totalPrice);

            allCartItemPrice = allCartItemPrice.add(totalPrice);

            Integer quantity = cartItem.getQuantity();
            orderItem.setQuantity(quantity);
            totalQuantity+=quantity;

            orderItem.setProduct(cartItem.getProduct());
            orderItem.setUserId(cartItem.getUser().getId());
            orderItem.setOrderStatus("PENDING");


//            double discountPrice = orderItem.getProduct().getDiscountPrice()*cartItem.getQuantity();
            BigDecimal discountPrice = orderItem.getProduct().getDiscountPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
//            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
            orderItem.setDiscountPrice(discountPrice);
            totalDiscountPrice=totalDiscountPrice.add(discountPrice);
            OrderItem orderItemSaved = orderItemRepo.save(orderItem);
            orderItemList.add(orderItemSaved);
        }

//        BigDecimal discountPercentage = ((allCartItemPrice-totalDiscountPrice)*100)/allCartItemPrice;

        BigDecimal discountPercentage = allCartItemPrice.subtract(totalDiscountPrice) // Subtract discount from total price
                .multiply(BigDecimal.valueOf(100)) // Multiply by 100 to get percentage
                .divide(allCartItemPrice, 2, RoundingMode.HALF_UP);

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setOrderItems(orderItemList);
        order.setTotalPrice(allCartItemPrice);
        order.setTotalDiscountPrice(totalDiscountPrice);
        order.setDiscount(discountPercentage);
        order.setTotalItem(totalQuantity);

        order.setOrderDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        order.setOrderTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        order.getPaymentDetail().setStatus("COMPLETED");

       Order savedOrder= orderRepo.save(order);
        List<OrderItem> orderItemListCopy = new ArrayList<>(orderItemList);
        for(OrderItem orderItem : orderItemListCopy)
        {
            orderItem.setOrder(savedOrder);
        }
        orderItemRepo.saveAll(orderItemListCopy);

        return savedOrder;
    }


    @Override
    public Order getOrderById(Integer orderId) throws OrderException {
        Optional<Order> order = orderRepo.findById(orderId);

        if(order.isPresent())
        {
            return order.get();
        }
        throw new OrderException("Order not found with orderID : "+orderId);
    }

    @Override
    public List<Order> usersOrderHistory(Integer userId) {
        return orderRepo.findUserOrders(userId);
    }

//    @Override
//    public Order placedOrder(Integer orderId) throws OrderException {
//        Order order = getOrderById(orderId);
//        order.setOrderStatus("PLACED");
//        order.getPaymentDetail().setStatus("COMPLETED");
//        return orderRepo.save(order);
//    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public void deleteOrder(Integer orderId) throws OrderException {
        Order order = getOrderById(orderId);
        orderRepo.delete(order);
    }
}
