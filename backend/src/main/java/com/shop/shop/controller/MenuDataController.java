package com.shop.shop.controller;

import com.shop.shop.model.MenuData;
import com.shop.shop.service.MenuDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/menu-data")
public class MenuDataController {
    private final MenuDataService menuDataService;

    public MenuDataController(MenuDataService menuDataService) {
        this.menuDataService = menuDataService;
    }

    @GetMapping()
    public ResponseEntity<MenuData> getMenuData() {
        var menuData = menuDataService.getMenuData();
        return ResponseEntity.ok(menuData);
    }
}
