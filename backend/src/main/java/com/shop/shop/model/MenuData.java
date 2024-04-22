package com.shop.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class MenuData {
    private List<GenderDto> genders;

    @Data
    @AllArgsConstructor
    public static class GenderDto {
        private String name;
        private List<CategoryDto> categories;
    }

    @Data
    @AllArgsConstructor
    public static class CategoryDto {
        private String name;
        private List<SubcategoryDto> subcategories;
    }

    @Data
    @AllArgsConstructor
    public static class SubcategoryDto {
        private String name;
        private List<String> productTypes;
    }
}
