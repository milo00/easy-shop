package com.shop.shop.config.converter;

import com.shop.shop.model.enums.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {

    @Override
    public String convertToDatabaseColumn(Gender gender) {
        return gender != null ? gender.getPolishTranslation() : null;
    }

    @Override
    public Gender convertToEntityAttribute(String dbData) {
        return dbData != null ? Arrays.stream(Gender.values())
                .filter(g -> g.getPolishTranslation().equals(dbData))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown gender: " + dbData))
                : null;
    }
}
