package com.learning.Service;

import com.learning.Exception.OrderException;
import com.learning.Model.Order;
import com.learning.Model.OrderItem;
import com.learning.Repository.OrderItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepo orderItemRepo;

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepo.save(orderItem);
    }

    @Override
    public void changeOrderItemStatus(Integer orderItemId,String status) throws OrderException {
        Optional<OrderItem> orderItem = orderItemRepo.findById(orderItemId);
        if (orderItem.isPresent()) {
            OrderItem orderItem1 = orderItem.get();
            orderItem1.setOrderStatus(status);
        }
    }
}
