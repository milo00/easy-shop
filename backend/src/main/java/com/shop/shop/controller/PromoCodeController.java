package com.shop.shop.controller;

import com.shop.shop.model.PromoCode;
import com.shop.shop.service.PromoCodeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promo-code")
@AllArgsConstructor
public class PromoCodeController {
    private final PromoCodeService promoCodeService;

    @PostMapping("/validate")
    public ResponseEntity<PromoCode> getItem(@RequestBody String code) {
        var validCode = promoCodeService.validateCode(code);
        return validCode.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null));
    }

}
