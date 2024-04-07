package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.repository.ItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Optional<List<Item>> getItemsByGender(Gender gender) {
        return itemRepository.findByGenderOrderByName(gender);
    }

    public Optional<List<Item>> getItemsByCategory(Category category) {
        return itemRepository.findByProductTypeCategoryOrderByName(category);
    }

    public Optional<List<Item>> getItemsOnDiscount() {
        return itemRepository.findByCurrentPriceNotNull();
    }

    public Page<Item> getTop10Items() {
        return itemRepository.findAll(PageRequest.of(0, 10));
    }
}
