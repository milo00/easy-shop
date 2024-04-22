package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }


    public Optional<Item> getItem(Integer id) {
        return itemRepository.findById(id);
    }

    public Optional<List<Item>> getItemsOnSale() {
        return itemRepository.findByCurrentPriceNotNull();
    }

    public Optional<List<Item>> getItemsWithFilters(Gender gender,
                                                    Category category,
                                                    String subcategory,
                                                    String productType) {
        if (productType != null && subcategory != null && category != null && gender != null) {
            return itemRepository
                    .findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseAndProductTypeProductTypeIgnoreCaseOrderByName(
                            gender,
                            category,
                            subcategory,
                            productType);
        } else if (subcategory != null && category != null && gender != null) {
            return itemRepository.findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseOrderByName(
                    gender,
                    category,
                    subcategory);
        } else if (category != null && gender != null) {
            return itemRepository.findByGenderAndProductTypeCategoryOrderByName(gender, category);
        } else if (gender != null) {
            return itemRepository.findByGenderOrderByName(gender);
        }
        return Optional.of(itemRepository.findAll());
    }
}
