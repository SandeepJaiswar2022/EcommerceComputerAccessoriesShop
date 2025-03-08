package com.learning.Advice;

import com.learning.Exception.*;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(EmailConflictException.class)
    public ResponseEntity<String> handleEmailConflict(EmailConflictException ex)
    {
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);//409
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<String> handleException(UserException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); //404
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleJwtTokenExpiredException(ExpiredJwtException ex){
        System.out.println("\n\nREQUEST COMING\n\n");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token has been expired");//401
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());//401
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<String> handleProductException(ProductException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);//404
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<String> handleOrderException(OrderException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);//404
    }

    @ExceptionHandler(CartItemException.class)
    public ResponseEntity<String> handleCartItemException(CartItemException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);//404
    }
}
