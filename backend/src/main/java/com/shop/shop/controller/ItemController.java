package com.shop.shop.controller;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.service.ItemService;
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
    public ResponseEntity<List<Item>> getAll(
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) String productType
    ) {
        var items = itemService.getItemsWithFilters(gender, category, subcategory, productType);
        return ResponseEntity.ok(items.orElse(List.of()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Integer id) {
        var item = itemService.getItem(id);
        return ResponseEntity.ok(item.orElse(null));
    }

    @GetMapping("/sale")
    public ResponseEntity<List<Item>> getOnSale() {
        var items = itemService.getItemsOnSale();
        return ResponseEntity.ok(items.orElse(List.of()));
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Item>> getForIds(@RequestParam List<Integer> ids) {
        var items = itemService.getItemsForIds(ids);
        return ResponseEntity.ok(items.orElse(List.of()));
    }
}
