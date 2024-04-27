package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.repository.ItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<Item> getItemsOnSale(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepository.findByCurrentPriceNotNull(pageable);
    }

    public Optional<List<Item>> getItemsForIds(List<Integer> ids) {
        return itemRepository.findByIdIn(ids);
    }

    public Page<Item> getItemsWithFilters(int page,
                                          int size,
                                          Gender gender,
                                          Category category,
                                          String subcategory,
                                          String productType) {
        Pageable pageable = PageRequest.of(page, size);
        if (productType != null && subcategory != null && category != null && gender != null) {
            return itemRepository
                    .findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseAndProductTypeProductTypeIgnoreCaseOrderByName(
                            pageable,
                            gender,
                            category,
                            subcategory,
                            productType);
        } else if (subcategory != null && category != null && gender != null) {
            return itemRepository.findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseOrderByName(
                    pageable,
                    gender,
                    category,
                    subcategory);
        } else if (category != null && gender != null) {
            return itemRepository.findByGenderAndProductTypeCategoryOrderByName(pageable, gender, category);
        } else if (gender != null) {
            return itemRepository.findByGenderOrderByName(pageable, gender);
        }
        return itemRepository.findAll(pageable);
    }
}
