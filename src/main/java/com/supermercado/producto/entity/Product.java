package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Data
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @Column(nullable = false,unique = true,length = 30)
    private String name;

    @Column(nullable = false,length = 300)
    private String description;

    @Column(nullable = false,length = 100)
    private String category;

    @Column(nullable = false)
    private Double price;
}
