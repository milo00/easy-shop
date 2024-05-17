package com.shop.shop.model.enums;

public enum Gender {
    GIRLS("DZIEWCZYNKI"),
    BOYS("CHŁOPCY"),
    MEN("MĘŻCZYŹNI"),
    WOMEN("KOBIETY"),
    KIDS("DZIECI");

    private final String polishTranslation;

    Gender(String polishTranslation) {
        this.polishTranslation = polishTranslation;
    }

    public String getPolishTranslation() {
        return polishTranslation;
    }
}
