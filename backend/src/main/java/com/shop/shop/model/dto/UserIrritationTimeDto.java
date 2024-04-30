package com.shop.shop.model.dto;

import com.shop.shop.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserIrritationTimeDto {
    private Integer id;
    private Integer userId;
    private String location;
    private Double elapsedTime;
}
