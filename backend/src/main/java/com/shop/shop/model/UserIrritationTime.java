package com.shop.shop.model;

import com.shop.shop.model.dto.UserIrritationTimeDto;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class UserIrritationTime {

    public UserIrritationTime(UserIrritationTimeDto userIrritationTimeDto, User user, LocalDate date) {
        this.id = userIrritationTimeDto.getId();
        this.location = userIrritationTimeDto.getLocation();
        this.elapsedTime = userIrritationTimeDto.getElapsedTime();
        this.user = user;
        this.date = date;
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
    private LocalDate date;
}
