package com.learning.Controller;

import com.learning.Exception.OrderException;
import com.learning.Exception.UserException;
import com.learning.Model.Category;
import com.learning.Model.Role;
import com.learning.Model.User;
import com.learning.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("ecommerce")
@PreAuthorize("hasAnyRole('ADMIN')")
@RequiredArgsConstructor
@CrossOrigin
public class UserManagementController {
    private final UserRepo userRepo;

    @GetMapping("/admin/users")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<User>> getAllUsers() {
//        System.out.println("\n\nAll users\n\n");
        return ResponseEntity.ok(userRepo.findAll());
    }

    @DeleteMapping("admin/users/{userId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) throws UserException, OrderException {

        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                userRepo.deleteById(userId);
                return ResponseEntity.noContent().build();
            } else {
                throw new UserException("User with ID " + userId + " not found.");
            }
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Return a generic 500 error for any unexpected issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/admin/users/{userId}/{role}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<?> updateRole(@PathVariable int userId, @PathVariable String role) throws UserException {
        System.out.println("\n\nUpdate role to : " + role + "\n\n");

        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setRole(Role.valueOf(role));
                userRepo.save(user);
                return ResponseEntity.ok(user);
            } else {
                throw new UserException("User with ID " + userId + " not found.");
            }
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Return a generic 500 error for any unexpected issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
