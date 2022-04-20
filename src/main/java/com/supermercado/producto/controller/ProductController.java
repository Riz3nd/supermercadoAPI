package com.supermercado.producto.controller;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.Message;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    private Message message = new Message();

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

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.PUT)
    public ResponseEntity editProduct(@RequestBody Product newProduct,@PathVariable int id){
        Map<String, String> response = new LinkedHashMap<>();
        try{
            Product product = productRepository.findById(id).get();
            product.setName(newProduct.getName());
            product.setDescription(newProduct.getDescription());
            product.setCategory(newProduct.getCategory());
            product.setPrice(newProduct.getPrice());
            productRepository.save(product);
            return message.viewMessage(HttpStatus.OK,"success","Product edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product not found!");
        }
    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProduct(@PathVariable int id){
        Map<String, String> response = new LinkedHashMap<>();
        try{
            Product product = productRepository.findById(id).get();
            productRepository.delete(product);
            return message.viewMessage(HttpStatus.OK,"success","Product delete success!!");
        }catch (Exception e){

            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product delete fail!!");
        }
    }



}
