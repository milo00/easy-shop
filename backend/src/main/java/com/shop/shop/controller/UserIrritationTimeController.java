package com.shop.shop.controller;

import com.shop.shop.model.UserIrritationTime;
import com.shop.shop.model.dto.UserIrritationTimeDto;
import com.shop.shop.service.UserIrritationTimeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/user-irritation-time")
public class UserIrritationTimeController {

    private final UserIrritationTimeService userIrritationTimeService;

    @PostMapping()
    public ResponseEntity<UserIrritationTime> create(@RequestBody UserIrritationTimeDto userIrritationTimeDto) {
        var result = userIrritationTimeService.create(userIrritationTimeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
