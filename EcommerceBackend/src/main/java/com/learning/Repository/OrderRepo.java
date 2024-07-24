package com.learning.Repository;

import com.learning.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    /*
    @Query("select o from Order o where o.user.id" +
            "=:userId and (o.orderStatus='PLACED' or " +
            "o.orderStatus='CONFIRMED' or o.orderStatus='SHIPPED' " +
            "or o.orderStatus='DELIVERED')")
     */


    @Query("select o from Order o where o.user.id=:userId")
    public List<Order> findUserOrders(@Param("userId") Integer userId);

}
