package com.learning.Service;

import com.learning.Exception.OrderException;
import com.learning.Model.OrderItem;

public interface OrderItemService {

    OrderItem createOrderItem(OrderItem orderItem);

    public void changeOrderItemStatus(Integer orderItemId, String status) throws OrderException;
}
