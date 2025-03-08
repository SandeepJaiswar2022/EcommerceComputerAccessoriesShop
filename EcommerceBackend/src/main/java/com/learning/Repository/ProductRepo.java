package com.learning.Repository;

import com.learning.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findAllByCategory(String category);
    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.category = :category")
    void deleteProductsByCategory(@Param("category") String category);
}
