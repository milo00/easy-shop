package com.shop.shop.repository;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<List<Item>> findByProductTypeCategoryOrderByName(Category category);

    Optional<List<Item>> findByGenderOrderByName(Gender gender);

    Optional<List<Item>> findByCurrentPriceNotNull();
}
