package com.shop.shop.repository;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Page<Item> findByGenderInOrderByName(Pageable pageable, List<Gender> genders);

    Page<Item> findByGenderInAndProductTypeCategoryOrderByName(Pageable pageable, List<Gender> genders, Category category);

    Page<Item> findByGenderInAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseOrderByName(
            Pageable pageable,
            List<Gender> genders,
            Category category,
            String subcategory);

    Page<Item> findByGenderInAndProductTypeCategoryAndProductTypeSubcategoryIgnoreCaseAndProductTypeProductTypeIgnoreCaseOrderByName(
            Pageable pageable,
            List<Gender> genders,
            Category category,
            String subcategory,
            String productType);

    Page<Item> findByCurrentPriceNotNull(Pageable pageable);

    Optional<List<Item>> findByIdIn(List<Integer> ids);

    @Query("SELECT i.gender AS gender, " +
            "       i.productType.category AS category, " +
            "       i.productType.subcategory AS subcategory, " +
            "       i.productType AS productType " +
            "FROM Item i " +
            "GROUP BY i.gender, i.productType.category, i.productType.subcategory, i.productType")
    List<Object[]> findMenuData();
}
