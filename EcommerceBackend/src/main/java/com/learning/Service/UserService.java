package com.learning.Service;

import com.learning.Exception.UserException;
import com.learning.Model.User;

import java.util.List;

public interface UserService {
     User findUserById(Integer userId) throws UserException;
     User findUserByJwtToken(String jwtToken) throws UserException;
     List<User> findAllUsers() throws UserException;
}
