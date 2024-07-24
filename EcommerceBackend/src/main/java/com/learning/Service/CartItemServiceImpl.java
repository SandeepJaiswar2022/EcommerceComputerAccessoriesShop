package com.learning.Service;

import com.learning.Exception.CartItemException;
import com.learning.Exception.ProductException;
import com.learning.Exception.UserException;
import com.learning.Model.CartItem;
import com.learning.Model.Product;
import com.learning.Model.User;
import com.learning.Repository.CartItemRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepo cartItemRepo;
    private final UserService userService;
    private final ProductService productService;


    @Override
    //Get CartItems for current logged-in user
    public List<CartItem> findByUser(User user)
            throws UserException {
        return cartItemRepo.findByUser(user); //[] or [cartItems]
    }

    @Override
    public Integer addCartItem(Integer quantity, Integer productID, User user)
            throws ProductException {
        int addedQuantity = 0;
        Product product = productService.getProductByID(productID);
        CartItem cartItem = cartItemRepo.findByProductAndUser(product, user);
        if (cartItem != null) {
            addedQuantity = cartItem.getQuantity() + quantity;
            cartItem.setQuantity(addedQuantity);
            cartItem.setTotalPrice(addedQuantity * product.getPrice());
        } else {
            cartItem = new CartItem();
            cartItem.setQuantity(quantity);
            cartItem.setProduct(product);
            cartItem.setUser(user);
            cartItem.setTotalPrice(quantity * product.getPrice());
        }
        cartItemRepo.save(cartItem);
        return quantity;
    }

    @Override
    public void updateQuantity(Integer quantity, Integer productID, User user) throws ProductException {
        Product product = productService.getProductByID(productID);
        CartItem cartItem = cartItemRepo.findByProductAndUser(product, user);

        //CartItem always exists
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            cartItem.setTotalPrice(quantity * product.getPrice());
        }
        else
            throw new ProductException("Product not found");
        cartItemRepo.save(cartItem);
    }

    @Override
    public void deleteCartItem(Integer productID, Integer userId) throws ProductException {
        cartItemRepo.deleteByUserAndProduct(userId,productID);
    }

}
