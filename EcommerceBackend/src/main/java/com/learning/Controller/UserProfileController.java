package com.learning.Controller;

import com.learning.Exception.UserException;
import com.learning.Model.User;
import com.learning.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class UserProfileController {
    private final UserService service;

    @GetMapping("/myprofile")
    @PreAuthorize("hasAnyAuthority('admin:read','user:read')")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String authHeader) throws UserException {
        User user = service.findUserByJwtToken(authHeader);
        return ResponseEntity.ok(user);
    }
}
