package com.learning.Service;

import com.learning.Model.OrderItem;
import com.learning.Repository.OrderItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepo orderItemRepo;

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepo.save(orderItem);
    }
}
