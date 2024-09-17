package com.learning.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Order order;

    @ManyToOne
    private Product product;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal discountPrice;

    private String orderStatus;

    private Integer userId;

    private LocalDateTime deliveryDate;

    public void setDiscountPrice(BigDecimal discountPrice) {
        // Round the price to 2 decimal places
        this.discountPrice = discountPrice.setScale(2, RoundingMode.DOWN);
    }

    public void setPrice(BigDecimal price) {
        // Round the price to 2 decimal places
        this.price = price.setScale(2, RoundingMode.DOWN);
    }
}
