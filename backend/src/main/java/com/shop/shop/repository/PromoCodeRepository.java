package com.shop.shop.repository;

import com.shop.shop.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PromoCodeRepository extends JpaRepository<PromoCode, Integer> {
    Optional<PromoCode> findFirstByCodeOrderByExpirationDateDesc(String code);
}
