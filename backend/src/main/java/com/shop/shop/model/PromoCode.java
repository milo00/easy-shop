package com.shop.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class PromoCode {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false)
    private String code;
    @Column(nullable = false)
    private LocalDateTime expirationDate;

    @Column(nullable = false)
    @Min(1)
    @Max(100)
    private int discountPercent;
    @Column()
    private User forUser;
}
