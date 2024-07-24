package com.learning.Service;

import com.learning.DTO.ProductRequest;
import com.learning.Exception.ProductException;
import com.learning.Model.Product;

import java.util.List;

public interface ProductService {
    public Product createProduct(ProductRequest req);

    public Product getProductByID(Integer id) throws ProductException;

    public Product updateProduct(ProductRequest req,Integer productID) throws ProductException;

    public void deleteProduct(Integer id) throws ProductException;

    public List<Product> getAllProductByCategory(String category);

    public List<Product> getAllProducts();
}
