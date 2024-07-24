package com.learning.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private Double totalPrice;

    private Double totalDiscountPrice;

    private Double discount;

    private String orderStatus;

    private Integer totalItem;

}
