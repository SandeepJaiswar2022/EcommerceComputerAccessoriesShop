package com.learning.Service;

import com.learning.Exception.UserException;
import com.learning.Model.User;

public interface UserService {
     User findUserById(Integer userId) throws UserException;
     User findUserByJwtToken(String jwtToken) throws UserException;
}
