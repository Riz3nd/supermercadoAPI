package com.supermercado.producto.controller;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.GET)
    public ResponseEntity<Product> getProduct(@PathVariable Integer id){
        Optional<Product> findProduct = productRepository.findById(id);
        if(findProduct.isPresent()) return  ResponseEntity.ok(findProduct.get());
        Map<String,String> errorResponse = new LinkedHashMap<>();
        errorResponse.put("error","Not Found");
        errorResponse.put("message","User not found");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "api/product", method = RequestMethod.POST)
    public Product createProduct(@RequestBody Product product){
        return productRepository.save(product);
    }

    @RequestMapping(value = "api/products", method = RequestMethod.GET)
    public List<Product> listProducts(){
        return productRepository.findAll();
    }



}
