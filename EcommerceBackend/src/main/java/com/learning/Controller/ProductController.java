package com.learning.Controller;

import com.learning.DTO.ProductRequest;
import com.learning.Exception.ProductException;
import com.learning.Model.Category;
import com.learning.Model.Product;
import com.learning.Repository.CategoryRepo;
import com.learning.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ecommerce")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;
    private final CategoryRepo categoryRepo;

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

    @DeleteMapping("/admin/category/{categoryId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteCategory(@PathVariable int categoryId)
            throws ProductException {
        Optional<Category> category = categoryRepo.findById(categoryId);
        if (category.isPresent()) {

            String categoryToDelete = category.get().getCategoryName();
            productService.deleteProductsByCategory(categoryToDelete);
            categoryRepo.deleteById(categoryId);
        }
        System.out.println("\n\nCategory Deleted\n\n");

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/admin/category/{category}")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<Category> addCategory(@PathVariable String category)
            throws ProductException {
        Category c = new Category();
        System.out.println("\n\nCategory: " + category+"\n\n");
        c.setCategoryName(category);
        return ResponseEntity.ok(categoryRepo.save(c));
    }
}
