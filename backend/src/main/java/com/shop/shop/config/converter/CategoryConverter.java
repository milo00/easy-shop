package com.shop.shop.config.converter;

import com.shop.shop.model.enums.Category;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;

@Converter(autoApply = true)
public class CategoryConverter implements AttributeConverter<Category, String> {

    @Override
    public String convertToDatabaseColumn(Category category) {
        return category != null ? category.getPolishTranslation() : null;
    }

    @Override
    public Category convertToEntityAttribute(String dbData) {
        return dbData != null ? Arrays.stream(Category.values())
                .filter(c -> c.getPolishTranslation().equals(dbData))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown category: " + dbData))
                : null;
    }
}
