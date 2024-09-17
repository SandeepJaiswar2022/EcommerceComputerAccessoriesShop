package com.learning.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Double discountPercentage;
    private Integer stock;
    private String brand;
    private String imageUrl;
    private String category;

    public void setPrice(BigDecimal price) {
        // Round the price to 2 decimal places
        this.price = price.setScale(2, RoundingMode.DOWN);
    }
    public void setDiscountPrice(BigDecimal discountPrice) {
        // Round the price to 2 decimal places
        this.discountPrice = discountPrice.setScale(2, RoundingMode.DOWN);
    }
}
