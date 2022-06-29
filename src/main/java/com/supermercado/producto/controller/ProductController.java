package com.supermercado.producto.controller;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supermercado.producto.util.JWTUtil;
import com.supermercado.producto.util.Message;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    private Message message = new Message();
    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token){
        String id = jwtUtil.getKey(token);
        return id != null;
    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.GET)
    public ResponseEntity getProduct(@PathVariable Integer id){
        Optional<Product> findProduct = productRepository.findById(id);
        if(findProduct.isPresent()) return  ResponseEntity.ok(findProduct.get());
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product not found!");
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
        try{
            Product product = productRepository.findById(id).get();
            product.setProductName(newProduct.getProductName());
            product.setDescription(newProduct.getDescription());
            product.setCategory(newProduct.getCategory());
            product.setPrice(newProduct.getPrice());
            productRepository.save(product);
            return message.viewMessage(HttpStatus.OK,"success","Product edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product not found!");
        }
    }

//    @RequestMapping(value = "api/users/{id}", method = RequestMethod.PUT)
//    public ResponseEntity editUser(@RequestBody User newUser,@PathVariable Long id){
//        Map<String, String> response = new LinkedHashMap<>();
//        try{
//            User user = userRepository.findById(id).get();
//            user.setFirstName(newUser.getFirstName());
//            user.setLastName(newUser.getLastName());
//            user.setEmail(newUser.getEmail());
//            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
//            userRepository.save(user);
//            return message.viewMessage(HttpStatus.OK,"success","user edit success!!");
//        }catch (Exception e){
//            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
//        }
//    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProduct(@PathVariable int id){
        try{
            Product product = productRepository.findById(id).get();
            productRepository.delete(product);
            return message.viewMessage(HttpStatus.OK,"success","Product delete success!!");
        }catch (Exception e){

            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product delete fail!!");
        }
    }



}
