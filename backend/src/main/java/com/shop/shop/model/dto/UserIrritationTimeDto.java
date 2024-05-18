package com.shop.shop.model.dto;

import com.shop.shop.model.enums.LoaderType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserIrritationTimeDto {
    private Integer id;
    private Integer userId;
    private String location;
    private Double elapsedTime;
    private LocalDateTime startTime;
    private LoaderType loaderType;
}
