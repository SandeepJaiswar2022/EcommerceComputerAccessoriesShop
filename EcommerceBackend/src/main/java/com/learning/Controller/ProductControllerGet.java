package com.learning.Controller;

import com.learning.Exception.ProductException;
import com.learning.Model.Category;
import com.learning.Model.Product;
import com.learning.Repository.CategoryRepo;
import com.learning.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecommerce")
@RequiredArgsConstructor
@CrossOrigin
public class ProductControllerGet {
    private final ProductService productService;
    private final CategoryRepo categoryRepo;

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

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories()
    {
        List<Category> categories = categoryRepo.findAll();
//        System.out.println("categories = " + categories);
        return ResponseEntity.ok(categories);
    }
}
