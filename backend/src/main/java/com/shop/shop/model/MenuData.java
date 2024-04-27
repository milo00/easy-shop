package com.shop.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class MenuData {
    private List<MenuDataInner> data;

    @Data
    @AllArgsConstructor
    public static class MenuDataInner {
        private String name;
        private List<MenuDataInner> data;
    }
}
