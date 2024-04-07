package com.shop.shop.config;

import org.springframework.core.convert.converter.Converter;
import com.shop.shop.model.Gender;

public class StringToGenderConverter implements Converter<String, Gender> {

    @Override
    public Gender convert(String source) {
        int ordinal = Integer.parseInt(source);
        if (ordinal >= 0 && ordinal < Gender.values().length) {
            return Gender.values()[ordinal];
        } else {
            throw new IllegalArgumentException("Invalid ordinal value for Gender enum: " + ordinal);
        }
    }
}
