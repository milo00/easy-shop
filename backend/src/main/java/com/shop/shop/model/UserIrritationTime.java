package com.shop.shop.model;

import com.shop.shop.model.dto.UserIrritationTimeDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
public class UserIrritationTime {

    public UserIrritationTime(UserIrritationTimeDto userIrritationTimeDto, User user) {
        this.id = userIrritationTimeDto.getId();
        this.location = userIrritationTimeDto.getLocation();
        this.elapsedTime = userIrritationTimeDto.getElapsedTime();
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
}
