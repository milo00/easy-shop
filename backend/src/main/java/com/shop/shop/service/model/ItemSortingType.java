package com.shop.shop.service.model;

import java.util.Objects;

public enum ItemSortingType {
    DEFAULT, NAME_ASC, NAME_DESC, PRICE_ASC, PRICE_DESC;

    @Override
    public String toString() {
        String[] parts = this.name().split("_");
        var name = parts[0];
        if (Objects.equals(name, "DEFAULT")) return "id";
        if (Objects.equals(name, "PRICE")) return "currentPrice";
        return parts[0].toLowerCase();
    }

    public boolean isDescending() {
        return this.name().endsWith("_DESC");
    }
}
