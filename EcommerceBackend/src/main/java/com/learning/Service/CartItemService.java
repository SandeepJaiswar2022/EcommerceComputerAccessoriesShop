package com.learning.Service;

import com.learning.Exception.CartItemException;
import com.learning.Exception.ProductException;
import com.learning.Exception.UserException;
import com.learning.Model.CartItem;
import com.learning.Model.User;

import java.util.List;

public interface CartItemService {


    List<CartItem> findByUser(User user) throws UserException, CartItemException;

    Integer addCartItem(Integer quantity, Integer productID, User user) throws ProductException;

    void updateQuantity(Integer quantity, Integer productID, User user) throws ProductException;

    void deleteCartItem(Integer productID, Integer user) throws ProductException;

}
