package com.shop.shop.service.model;

import com.shop.shop.model.User;

public record AuthenticationResponse(String token, User user) {
}
