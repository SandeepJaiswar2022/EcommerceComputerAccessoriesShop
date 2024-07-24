package com.learning.Service;

import com.learning.DTO.ProductRequest;
import com.learning.Exception.ProductException;
import com.learning.Model.Product;
import com.learning.Repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    @Override
    public Product createProduct(ProductRequest req) {
        Product product = new Product(0, req.getTitle(),
                req.getDescription(),
                req.getPrice(),
                req.getDiscountPrice(),
                req.getDiscountPercentage(),
                req.getStock(),
                req.getBrand(),
                req.getImageUrl(),
                req.getCategory());

        return productRepo.save(product);
    }

    @Override
    public Product getProductByID(Integer id) throws ProductException {
        Optional<Product> product = productRepo.findById(id);
        if (product.isPresent())
            return product.get();
        else
            throw new ProductException("Product Not Found with ID: " + id);
    }

    @Override
    public Product updateProduct(ProductRequest req, Integer productID) throws ProductException {
        Product product = getProductByID(productID);

        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setDiscountPrice(req.getDiscountPrice());
        product.setDiscountPercentage(req.getDiscountPercentage());
        product.setStock(req.getStock());
        product.setBrand(req.getBrand());
        product.setImageUrl(req.getImageUrl());
        product.setCategory(req.getCategory());

        return productRepo.save(product);
    }

    @Override
    public void deleteProduct(Integer id) throws ProductException {
        Product product = getProductByID(id);
        productRepo.delete(product);
    }

    @Override
    public List<Product> getAllProductByCategory(String category) {
        return productRepo.findAllByCategory(category);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();

        //In stock and out of stock (product quantity implement in react)
        //Pagination implement in react
        //Search by category implement in react (get all product then map)
    }
}
