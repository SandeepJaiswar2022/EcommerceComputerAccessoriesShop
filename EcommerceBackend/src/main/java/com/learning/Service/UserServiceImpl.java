package com.learning.Service;

import com.learning.Configuration.JwtService;
import com.learning.Exception.UserException;
import com.learning.Model.User;
import com.learning.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtService jwtService;

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> user = userRepo.findById(userId);
        return user.orElseThrow(()->new UserException("User Not Found with id : "+userId));
    }

    @Override
    public User findUserByJwtToken(String authHeader) throws UserException {
        String jwtToken = authHeader.substring(7);
        String email = jwtService.extractUsername(jwtToken);
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email"+email);
        }
        return user;
    }

}
