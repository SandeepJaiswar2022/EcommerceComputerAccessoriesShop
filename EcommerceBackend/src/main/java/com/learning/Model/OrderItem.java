package com.learning.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private Double price;

    private Double discountPrice;

    private String orderStatus;

    private Integer userId;

    private LocalDateTime deliveryDate;
}
