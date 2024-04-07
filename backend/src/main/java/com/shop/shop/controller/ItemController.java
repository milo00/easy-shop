package com.shop.shop.controller;

import com.shop.shop.model.Gender;
import com.shop.shop.model.Item;
import com.shop.shop.model.User;
import com.shop.shop.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping()
    public ResponseEntity<List<Item>> getTop10() {
        var items = itemService.getTop10Items();
        return ResponseEntity.ok(items.getContent());
    }

    @GetMapping("/gender")
    public ResponseEntity<List<Item>> getByGender(@RequestParam Gender gender) {
        var items = itemService.getItemsByGender(gender);
        return ResponseEntity.ok(items.orElse(List.of()));
    }

    @GetMapping("/discount")
    public ResponseEntity<List<Item>> getOnDiscount() {
        var items = itemService.getItemsOnDiscount();
        return ResponseEntity.ok(items.orElse(List.of()));
    }

//    @GetMapping("/categories")
//    public ResponseEntity<List<String>> getByGender(@RequestBody Gender gender) {
//        var items = itemService.getItemsByGender(gender);
//        return ResponseEntity.ok(items.orElse(List.of()));
//    }
}
