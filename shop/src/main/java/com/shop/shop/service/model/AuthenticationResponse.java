package com.shop.shop.service.model;

public class AuthenticationResponse {

    private final String token;

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
