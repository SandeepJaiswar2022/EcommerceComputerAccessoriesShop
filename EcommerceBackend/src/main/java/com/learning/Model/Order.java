package com.learning.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    private String orderDate;

    private String orderTime;

    @OneToOne
    private Address shippingAddress;

    @Embedded
    private PaymentDetails paymentDetail = new PaymentDetails();

    private BigDecimal totalPrice;

    private BigDecimal totalDiscountPrice;

    private BigDecimal discount;

    private Integer totalItem;

    public void setTotalPrice(BigDecimal totalPrice) {
        // Round the price to 2 decimal places
        this.totalPrice = totalPrice.setScale(2, RoundingMode.DOWN);
    }
    public void setTotalDiscountPrice(BigDecimal totalDiscountPrice) {
        // Round the price to 2 decimal places
        this.totalDiscountPrice = totalDiscountPrice.setScale(2, RoundingMode.DOWN);
    }
    public void setDiscount(BigDecimal discount) {
        // Round the price to 2 decimal places
        this.discount = discount.setScale(2, RoundingMode.DOWN);
    }

}
