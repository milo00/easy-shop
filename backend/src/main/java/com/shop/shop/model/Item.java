package com.shop.shop.model;

import com.shop.shop.config.converter.GenderConverter;
import com.shop.shop.model.enums.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Item {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Convert(converter = GenderConverter.class)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "product_type")
    private ProductType productType;

    @Column(nullable = false)
    private Double regularPrice;

    private Double currentPrice;

    private String colour;

    private String usage;

    private String imgUrl;
}
