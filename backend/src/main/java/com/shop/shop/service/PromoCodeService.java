package com.shop.shop.service;

import com.shop.shop.model.PromoCode;
import com.shop.shop.repository.PromoCodeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PromoCodeService {
    private final PromoCodeRepository promoCodeRepository;

    public Optional<PromoCode> validateCode(String promoCode) {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        var dbCode = promoCodeRepository.findFirstByCodeOrderByExpirationDateDesc(promoCode);
        if (dbCode.isPresent() && dbCode.get().getExpirationDate().isAfter(LocalDate.now().atStartOfDay())) {
            return dbCode;
        } else return Optional.empty();
    }
}
