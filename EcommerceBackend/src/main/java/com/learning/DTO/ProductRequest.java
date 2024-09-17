package com.learning.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private double discountPercentage;
    private Integer stock;
    private String brand;
    private String imageUrl;
    private String category;
}
