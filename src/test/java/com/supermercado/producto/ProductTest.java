package com.supermercado.producto;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class ProductTest {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testProduct() {
        Product product = new Product();
        product.setName("ASRock B560M Steel Legend");
        product.setDescription("Placa base compatible con procesadores i3,i5,i7 y i9, soporte RAM DDR4 4800 MHz");
        product.setCategory("Motherboard");
        product.setPrice(523.311);

        Product saveProduct = productRepository.save(product);
        Product existProduct = entityManager.find(Product.class, saveProduct.getId());

        assertEquals(product.getName(), existProduct.getName());
    }

}
