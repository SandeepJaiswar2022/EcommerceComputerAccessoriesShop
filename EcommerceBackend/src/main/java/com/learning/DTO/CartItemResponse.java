package com.learning.DTO;

import com.learning.Model.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
   private List<CartItem> cartItems;
   private Integer cartTotalQuantity;
   private BigDecimal cartTotalPrice;
   private BigDecimal cartTotalDiscount;
   private BigDecimal cartTotalPriceAfterDiscount;

   public void setCartTotalPrice(BigDecimal cartTotalPrice) {
      // Round the price to 2 decimal places
      this.cartTotalPrice = cartTotalPrice.setScale(2, RoundingMode.DOWN);
   }
   public void setCartTotalDiscount(BigDecimal cartTotalDiscount) {
      // Round the price to 2 decimal places
      this.cartTotalDiscount = cartTotalDiscount.setScale(2, RoundingMode.DOWN);
   }
   public void setCartTotalPriceAfterDiscount(BigDecimal cartTotalPriceAfterDiscount) {
      // Round the price to 2 decimal places
      this.cartTotalPriceAfterDiscount = cartTotalPriceAfterDiscount.setScale(2, RoundingMode.DOWN);
   }
}
