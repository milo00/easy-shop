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
        try {
            Thread.sleep(12000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return itemRepository.findById(id);
    }

    public Optional<List<Item>> getItemsForIds(List<Integer> ids) {
        try {
            Thread.sleep(12000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return itemRepository.findByIdIn(ids);
    }

    public Page<Item> getItemsWithFilters(int page,
                                          int size,
                                          Gender gender,
                                          Category category,
                                          String subcategory,
                                          String productType,
                                          Boolean onSale) {
        var pageable = PageRequest.of(page, size);
        try {
            Thread.sleep(12000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (gender == null) {
            return itemRepository.findAll(pageable, onSale);
        }

        var genders = gender == Gender.KIDS ? List.of(Gender.GIRLS, Gender.BOYS) : List.of(gender);

        if (category == null) {
            return itemRepository.findByGender(pageable, genders, onSale);
        }
        if (subcategory == null) {
            return itemRepository.findByGenderAndCategory(pageable, genders, category.name(), onSale);
        }
        if (productType == null) {
            return itemRepository.findByGenderAndCategoryAndSubcategory(
                    pageable,
                    genders,
                    category.name(),
                    subcategory,
                    onSale);
        }
        return itemRepository
                .findByGenderAndCategoryAndSubcategoryAndProductType(
                        pageable,
                        genders,
                        category.name(),
                        subcategory,
                        productType,
                        onSale);

    }
}
