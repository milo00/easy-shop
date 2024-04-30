package com.shop.shop.service;

import com.shop.shop.model.UserIrritationTime;
import com.shop.shop.model.dto.UserIrritationTimeDto;
import com.shop.shop.repository.UserIrritationTimeRepository;
import com.shop.shop.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class UserIrritationTimeService {
    private final UserIrritationTimeRepository userIrritationTimeRepository;
    private final UserRepository userRepository;


    public UserIrritationTime create(UserIrritationTimeDto userIrritationTimeDto) {
        var user = userRepository.findById(userIrritationTimeDto.getUserId());
        return user.map(value -> userIrritationTimeRepository.save(new UserIrritationTime(userIrritationTimeDto, value)))
                .orElseThrow(() -> new NoSuchElementException("Wrong user id" + userIrritationTimeDto.getUserId()));
    }
}
