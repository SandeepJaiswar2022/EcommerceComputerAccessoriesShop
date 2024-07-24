package com.learning.Repository;

import com.learning.Model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo  extends JpaRepository<OrderItem, Integer> {
}
