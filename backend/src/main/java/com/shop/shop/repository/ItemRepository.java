package com.shop.shop.repository;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<List<Item>> findByGenderAndProductTypeCategoryOrderByName(Gender gender, Category category);

    Optional<List<Item>> findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseOrderByName(
            Gender gender,
            Category category,
            String subcategory);

    Optional<List<Item>> findByGenderAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseAndProductTypeProductTypeIgnoreCaseOrderByName(
            Gender gender,
            Category category,
            String subcategory,
            String productType);

    Optional<List<Item>> findByGenderOrderByName(Gender gender);

    Optional<List<Item>> findByCurrentPriceNotNull();

    @Query("SELECT i.gender AS gender, " +
            "       i.productType.category AS category, " +
            "       i.productType.subcategory AS subcategory, " +
            "       i.productType AS productType " +
            "FROM Item i " +
            "GROUP BY i.gender, i.productType.category, i.productType.subcategory, i.productType")
    List<Object[]> findMenuData();
}
