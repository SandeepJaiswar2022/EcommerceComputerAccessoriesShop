package com.learning.Controller;

import com.learning.DTO.AddItemRequest;
import com.learning.DTO.CartItemResponse;
import com.learning.Exception.CartItemException;
import com.learning.Exception.ProductException;
import com.learning.Exception.UserException;
import com.learning.Model.CartItem;
import com.learning.Model.User;
import com.learning.Service.CartItemService;
import com.learning.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/ecommerce")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
@CrossOrigin
public class CartController {
    private final CartItemService cartItemService;
    private final UserService userService;


    @GetMapping("/cart")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<CartItemResponse> getUserCart(@RequestHeader("Authorization") String authHeader) throws UserException, CartItemException {
        User user = userService.findUserByJwtToken(authHeader);
        return getCartItemResponseResponseEntity(user);
    }

    private ResponseEntity<CartItemResponse> getCartItemResponseResponseEntity(User user) throws UserException, CartItemException {
        List<CartItem> cartItems = cartItemService.findByUser(user);
        CartItemResponse cartItemResponse = new CartItemResponse();
        Integer cartTotalQuantity=0;
        BigDecimal cartTotalPrice= BigDecimal.valueOf(0.0);
        BigDecimal cartTotalDiscount= BigDecimal.valueOf(0.0);
        BigDecimal cartTotalPriceAfterDiscount= BigDecimal.valueOf(0.0);
        for (CartItem cartItem : cartItems) {
            cartTotalQuantity += cartItem.getQuantity();
            cartTotalPrice=cartTotalPrice.add(cartItem.getTotalPrice());
            cartTotalPriceAfterDiscount=cartTotalPriceAfterDiscount.add(cartItem.getProduct().getDiscountPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            //cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        }
        cartTotalDiscount=cartTotalPrice.subtract(cartTotalPriceAfterDiscount);
        cartItemResponse.setCartTotalQuantity(cartTotalQuantity);
        cartItemResponse.setCartTotalPrice(cartTotalPrice);
        cartItemResponse.setCartTotalDiscount(cartTotalDiscount);
        cartItemResponse.setCartTotalPriceAfterDiscount(cartTotalPriceAfterDiscount);
        cartItemResponse.setCartItems(cartItems);
        return ResponseEntity.ok(cartItemResponse);
    }

    @PostMapping("/cart")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<CartItemResponse> addProductToCart(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String authHeader)
            throws UserException, ProductException, CartItemException {
        User user = userService.findUserByJwtToken(authHeader);
        Integer addedQuantity = cartItemService.
                addCartItem(req.getQuantity(), req.getProductId(), user);
        return getCartItemResponseResponseEntity(user);
    }

    @PutMapping("/cart")
    @PreAuthorize("hasAuthority('user:update')")
    public ResponseEntity<String> updateCartItemQuantity(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String authHeader)
            throws UserException, ProductException {
        User user = userService.findUserByJwtToken(authHeader);
        cartItemService.updateQuantity(req.getQuantity(), req.getProductId(), user);
        return ResponseEntity.ok("Quantity updated successfully");
    }

    @DeleteMapping("/cart/{productId}")
    @PreAuthorize("hasAuthority('user:delete')")
    public ResponseEntity<String> deleteCartItem(
            @PathVariable Integer productId,
            @RequestHeader("Authorization") String authHeader)
            throws UserException, ProductException {
        User user = userService.findUserByJwtToken(authHeader);
        cartItemService.deleteCartItem(productId, user.getId());
        return ResponseEntity.ok("Product deleted from your cart.");
    }

}
