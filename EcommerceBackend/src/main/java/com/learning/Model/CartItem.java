package com.learning.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;

    private BigDecimal totalPrice;

    public void setTotalPrice(BigDecimal totalPrice) {
        // Round the price to 2 decimal places
        this.totalPrice = totalPrice.setScale(2, RoundingMode.DOWN);
    }
}



//JSON IGNORE on both product and user
/*
[
    {
        "id": 1,
        "quantity": 2,
        "totalPrice": 106799.98
    },
    {
        "id": 2,
        "quantity": 6,
        "totalPrice": 367199.94
    }
]*/

//Without JSON IGNORE
/*
[
    {
        "id": 1,
        "quantity": 2,
        "totalPrice": 106799.98,
        "user" :{USER INFO},
        "product":{PRODUCT INFO}

    },
    {
        "id": 2,
        "quantity": 6,
        "totalPrice": 367199.94
        "user" :{USER INFO},
        "product":{PRODUCT INFO}
    }
]*/