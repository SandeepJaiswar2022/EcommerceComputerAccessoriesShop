package com.learning.Configuration;

import com.learning.DTO.AuthenticationRequest;
import com.learning.DTO.RegisterRequest;
import com.learning.Exception.UserException;
import com.learning.Model.Role;
import com.learning.Model.User;
import com.learning.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) throws UserException {
        User user = userRepo.findByEmail(request.getEmail());
        if(user!=null)
        {
            throw  new UserException("Email already exists");
        }

        user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepo.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .jwtToken(jwtToken)
                .message("Registered Successfully")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws BadCredentialsException {

        var user = userRepo.findByEmail(request.getEmail());

//        System.out.println("user 1: " + user);

        if(user==null)
        {
            throw new BadCredentialsException("Invalid email");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .jwtToken(jwtToken)
                .message("Authenticated Successfully")
                .build();

    }
}
