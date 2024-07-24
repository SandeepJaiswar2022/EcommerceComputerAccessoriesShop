package com.learning.Controller;

import com.learning.Exception.ProductException;
import com.learning.Model.Product;
import com.learning.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce")
@RequiredArgsConstructor
@CrossOrigin
public class ProductControllerGet {
    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Integer productId)
            throws ProductException {
        Product product = productService.getProductByID(productId);
        return ResponseEntity.ok(product);
    }
}
