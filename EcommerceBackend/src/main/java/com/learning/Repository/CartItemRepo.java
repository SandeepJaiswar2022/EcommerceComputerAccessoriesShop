package com.learning.Repository;

import com.learning.Model.CartItem;
import com.learning.Model.Product;
import com.learning.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Integer> {
    public List<CartItem> findByUser(User user);

    public CartItem findByProductAndUser(Product product, User user);

    @Query("delete from CartItem c where c.user.id=?1 and c.product.id=?2")
    @Modifying
    public void deleteByUserAndProduct(Integer userId, Integer productId);
}
