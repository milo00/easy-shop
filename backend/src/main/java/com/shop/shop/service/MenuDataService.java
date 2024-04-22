package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.MenuData;
import com.shop.shop.model.ProductType;
import com.shop.shop.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuDataService {
    private final ItemRepository itemRepository;

    public MenuDataService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public MenuData getMenuData() {
        List<Object[]> menuData = itemRepository.findMenuData();
        MenuData resultMenuData = new MenuData();
        Map<Gender, MenuData.GenderDto> genderMap = new LinkedHashMap<>();

        for (Object[] row : menuData) {
            MenuData.GenderDto genderDto = genderMap.computeIfAbsent((Gender) row[0], key -> new MenuData.GenderDto(((Gender) row[0]).name(), new ArrayList<>()));
            Category categoryName = (Category) row[1];
            MenuData.CategoryDto categoryDto = genderDto.getCategories()
                    .stream()
                    .filter(c -> c.getName().equals(categoryName.name()))
                    .findFirst()
                    .orElseGet(() -> {
                        MenuData.CategoryDto newCategoryDto = new MenuData.CategoryDto(categoryName.name(), new ArrayList<>());
                        genderDto.getCategories().add(newCategoryDto);
                        return newCategoryDto;
                    });

            String subcategoryName = (String) row[2];
            MenuData.SubcategoryDto subcategoryDto = categoryDto.getSubcategories()
                    .stream()
                    .filter(s -> s.getName().equals(subcategoryName))
                    .findFirst()
                    .orElseGet(() -> {
                        MenuData.SubcategoryDto newSubcategoryDto = new MenuData.SubcategoryDto(subcategoryName, new ArrayList<>());
                        categoryDto.getSubcategories().add(newSubcategoryDto);
                        return newSubcategoryDto;
                    });

            ProductType productType = (ProductType) row[3];
            subcategoryDto.getProductTypes().add(productType.getProductType());
        }

        resultMenuData.setGenders(new ArrayList<>(genderMap.values()));
        return resultMenuData;
    }
}
