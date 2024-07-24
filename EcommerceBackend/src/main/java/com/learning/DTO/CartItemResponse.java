package com.learning.DTO;

import com.learning.Model.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
   private List<CartItem> cartItems;
   private Integer cartTotalQuantity;
   private Double cartTotalPrice;
   private Double cartTotalDiscount;
   private Double cartTotalPriceAfterDiscount;

}
