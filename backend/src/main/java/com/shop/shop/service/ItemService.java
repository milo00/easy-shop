package com.shop.shop.service;

import com.shop.shop.model.enums.Category;
import com.shop.shop.model.enums.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.repository.ItemRepository;
import com.shop.shop.service.model.ItemSortingType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Optional<List<Item>> getItemsForIds(List<Integer> ids) {
        return itemRepository.findByIdIn(ids);
    }

    public Page<Item> getItemsWithFilters(int page,
                                          int size,
                                          ItemSortingType sortingType,
                                          Gender gender,
                                          Category category,
                                          String subcategory,
                                          String productType,
                                          Boolean onSale) {
        var sorting = sortingType.isDescending() ? Sort.by(sortingType.toString()).descending() : Sort.by(sortingType.toString());
        var pageable = PageRequest.of(page, size, sorting);
        try {
            Thread.sleep(7500);
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
            return itemRepository.findByGenderAndCategory(pageable, genders, category.getPolishTranslation(), onSale);
        }
        if (productType == null) {
            return itemRepository.findByGenderAndCategoryAndSubcategory(
                    pageable,
                    genders,
                    category.getPolishTranslation(),
                    subcategory,
                    onSale);
        }
        return itemRepository
                .findByGenderAndCategoryAndSubcategoryAndProductType(
                        pageable,
                        genders,
                        category.getPolishTranslation(),
                        subcategory,
                        productType,
                        onSale);

    }
}
