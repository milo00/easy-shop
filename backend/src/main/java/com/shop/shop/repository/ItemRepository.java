package com.shop.shop.repository;

import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query("SELECT i FROM Item i " +
            "JOIN i.productType pt " +
            "WHERE (:onSale = true AND i.currentPrice IS NOT NULL OR :onSale = false) " +
            "ORDER BY i.name")
    Page<Item> findAll(
            Pageable pageable,
            @Param("onSale") Boolean onSale);

    @Query("SELECT i FROM Item i " +
            "JOIN i.productType pt " +
            "WHERE (i.gender IN :genders) " +
            "AND (:onSale = true AND i.currentPrice IS NOT NULL OR :onSale = false) " +
            "ORDER BY i.name")
    Page<Item> findByGender(
            Pageable pageable,
            @Param("genders") List<Gender> genders,
            @Param("onSale") Boolean onSale);

    @Query("SELECT i FROM Item i " +
            "JOIN i.productType pt " +
            "WHERE (i.gender IN :genders) " +
            "AND LOWER(pt.category) = LOWER(:category) " +
            "AND (:onSale = true AND i.currentPrice IS NOT NULL OR :onSale = false) " +
            "ORDER BY i.name")
    Page<Item> findByGenderAndCategory(
            Pageable pageable,
            @Param("genders") List<Gender> genders,
            @Param("category") String category,
            @Param("onSale") Boolean onSale);

    @Query("SELECT i FROM Item i " +
            "JOIN i.productType pt " +
            "WHERE i.gender IN :genders " +
            "AND LOWER(pt.category) = LOWER(:category) " +
            "AND LOWER(pt.subcategory) = LOWER(:subcategory) " +
            "AND (:onSale = true AND i.currentPrice IS NOT NULL OR :onSale = false) " +
            "ORDER BY i.name")
    Page<Item> findByGenderAndCategoryAndSubcategory(
            Pageable pageable,
            @Param("genders") List<Gender> genders,
            @Param("category") String category,
            @Param("subcategory") String subcategory,
            @Param("onSale") Boolean onSale);


    @Query("SELECT i FROM Item i " +
            "JOIN i.productType pt " +
            "WHERE i.gender IN :genders " +
            "AND LOWER(pt.category) = LOWER(:category) " +
            "AND LOWER(pt.subcategory) = LOWER(:subcategory) " +
            "AND LOWER(pt.productType) = LOWER(:productType) " +
            "AND (:onSale = true AND i.currentPrice IS NOT NULL OR :onSale = false) " +
            "ORDER BY i.name")
    Page<Item> findByGenderAndCategoryAndSubcategoryAndProductType(
            Pageable pageable,
            @Param("genders") List<Gender> genders,
            @Param("category") String category,
            @Param("subcategory") String subcategory,
            @Param("productType") String productType,
            @Param("onSale") Boolean onSale);

    Page<Item> findByCurrentPriceNotNull(Pageable pageable);

    Optional<List<Item>> findByIdIn(List<Integer> ids);

    @Query("SELECT CASE " +
            "  WHEN i.currentPrice IS NOT NULL THEN 'SALE' " +
            "  WHEN i.gender = 'BOYS' OR i.gender = 'GIRLS' THEN 'KIDS' " +
            "  ELSE '' " +
            "END AS additional, " +
            "i.gender, pt.category, pt.subcategory, pt.productType " +
            "FROM Item i " +
            "JOIN i.productType pt " +
            "GROUP BY additional, i.gender, pt.category, pt.subcategory, pt.productType " +
            "ORDER BY additional, i.gender, pt.category, pt.subcategory, pt.productType")
    List<Object[]> findMenuData();
}
