package com.shop.shop.service;

import com.shop.shop.model.UserIrritationTime;
import com.shop.shop.model.dto.UserIrritationTimeDto;
import com.shop.shop.repository.UserIrritationTimeRepository;
import com.shop.shop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class UserIrritationTimeService {
    private final UserIrritationTimeRepository userIrritationTimeRepository;
    private final UserRepository userRepository;

    public UserIrritationTime create(UserIrritationTimeDto userIrritationTimeDto) {
        var user = userRepository.findById(userIrritationTimeDto.getUserId());
        return user.map(value -> userIrritationTimeRepository.save(
                        new UserIrritationTime(userIrritationTimeDto, value, LocalDateTime.now())))
                .orElseThrow(() -> new NoSuchElementException("Wrong user id" + userIrritationTimeDto.getUserId()));
    }

    @Transactional
    public List<UserIrritationTime> createBatch(List<UserIrritationTimeDto> userIrritationTimeDtos) {
        var returnedList = new ArrayList<UserIrritationTime>();
        for (var userIrritationTimeDto : userIrritationTimeDtos) {
            returnedList.add(create(userIrritationTimeDto));
        }
        return returnedList;
    }
}
