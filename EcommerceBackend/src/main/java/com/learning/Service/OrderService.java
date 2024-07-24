package com.learning.Service;

import com.learning.Exception.CartItemException;
import com.learning.Exception.OrderException;
import com.learning.Exception.UserException;
import com.learning.Model.Address;
import com.learning.Model.Order;
import com.learning.Model.User;

import java.util.List;

public interface OrderService {
    public Order createOrder(User user, Address shippingAddress) throws CartItemException, UserException;
    public Order getOrderById(Integer orderId) throws OrderException;
    public List<Order> usersOrderHistory(Integer userId);

    public Order placedOrder(Integer orderId) throws OrderException;
    public Order confirmedOrder(Integer orderId) throws OrderException;
    public Order shippedOrder(Integer orderId) throws OrderException;
    public Order cancledOrder(Integer orderId) throws OrderException;
    public Order deliveredOrder(Integer orderId) throws OrderException;

    public List<Order> getAllOrders();
    public void deleteOrder(Integer orderId) throws OrderException;
}
