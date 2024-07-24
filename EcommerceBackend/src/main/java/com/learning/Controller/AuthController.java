package com.learning.Controller;

import com.learning.DTO.AuthenticationRequest;
import com.learning.Configuration.AuthenticationResponse;
import com.learning.Configuration.AuthenticationService;
import com.learning.DTO.RegisterRequest;
import com.learning.Exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthenticationService authService;


    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Hello World this is demo page");
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) throws UserException {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) throws BadCredentialsException {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
