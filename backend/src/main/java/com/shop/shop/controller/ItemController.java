package com.shop.shop.controller;

import com.shop.shop.model.enums.Category;
import com.shop.shop.model.enums.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.service.ItemService;
import com.shop.shop.service.model.ItemSortingType;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping()
    public ResponseEntity<Page<Item>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "DEFAULT") ItemSortingType sortingType,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) String productType
    ) {
        var items = itemService.getItemsWithFilters(page, size, sortingType, gender, category, subcategory, productType, false);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Integer id) {
        var item = itemService.getItem(id);
        return ResponseEntity.ok(item.orElse(null));
    }

    @GetMapping("/sale")
    public ResponseEntity<Page<Item>> getOnSale(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "DEFAULT") ItemSortingType sortingType,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) String productType) {
        var items = itemService.getItemsWithFilters(page, size, sortingType, gender, category, subcategory, productType, true);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Item>> getForIds(@RequestParam List<Integer> ids) {
        var items = itemService.getItemsForIds(ids);
        return ResponseEntity.ok(items.orElse(List.of()));
    }
}
