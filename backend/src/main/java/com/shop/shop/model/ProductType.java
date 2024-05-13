package com.shop.shop.model;

import com.shop.shop.model.enums.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProductType {
    @Id
    private String productType;

    @Column(nullable = false)
    private String subcategory;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Category category;
}
