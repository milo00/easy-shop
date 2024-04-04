package com.shop.shop.service;

import com.shop.shop.model.User;
import com.shop.shop.repository.UserRepository;
import com.shop.shop.service.model.AuthenticationResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public void register(User requestUser) {
        var user = new User(requestUser);
        user.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        userRepository.save(user);
    }

    public AuthenticationResponse authenticate(User requestUser) {
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                requestUser.getUsername(), requestUser.getPassword()));
        var token = jwtService.generateToken(requestUser.getUsername());
        return new AuthenticationResponse(token, (User) authentication.getPrincipal());
    }
}
