package com.learning.Controller;

import com.learning.DTO.ProductRequest;
import com.learning.Exception.ProductException;
import com.learning.Model.Product;
import com.learning.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@RequiredArgsConstructor
//CrossOrigin
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @PostMapping("/products")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        Product newProduct = productService.createProduct(request);
        return new ResponseEntity<Product>(newProduct,HttpStatus.CREATED);
    }


    @DeleteMapping("/products/{productId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer productId)
            throws ProductException {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/products/{productId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer productId, @RequestBody ProductRequest request)
        throws ProductException {
        Product product = productService.updateProduct(request, productId);
        return ResponseEntity.ok(product);
    }
}
