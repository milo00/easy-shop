package com.shop.shop.model.enums;

public enum Category {
    FOOTWEAR("OBUWIE"),
    APPAREL("ODZIEŻ");

    private final String polishTranslation;

    Category(String polishTranslation) {
        this.polishTranslation = polishTranslation;
    }

    public String getPolishTranslation() {
        return polishTranslation;
    }
}
