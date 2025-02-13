package com.shop.shop.model;

import com.shop.shop.model.dto.UserIrritationTimeDto;
import com.shop.shop.model.enums.LoaderType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class UserIrritationTime {

    public UserIrritationTime(UserIrritationTimeDto userIrritationTimeDto, User user) {
        this.id = userIrritationTimeDto.getId();
        this.location = userIrritationTimeDto.getLocation();
        this.elapsedTime = userIrritationTimeDto.getElapsedTime();
        this.dateTime = userIrritationTimeDto.getStartTime();
        this.loaderType = userIrritationTimeDto.getLoaderType();
        this.user = user;
    }

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Double elapsedTime;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private LoaderType loaderType;

}
