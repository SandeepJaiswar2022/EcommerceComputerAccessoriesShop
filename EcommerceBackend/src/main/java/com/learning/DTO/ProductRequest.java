package com.learning.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String title;
    private String description;
    private double price;
    private double discountPrice;
    private double discountPercentage;
    private Integer stock;
    private String brand;
    private String imageUrl;
    private String category;
}
