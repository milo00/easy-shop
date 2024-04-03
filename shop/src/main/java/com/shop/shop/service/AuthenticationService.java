package com.shop.shop.service;

import com.shop.shop.model.User;
import com.shop.shop.repository.UserRepository;
import com.shop.shop.service.model.AuthenticationResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    public AuthenticationResponse register(User requestUser) {
        var user = new User();
        user.setUsername(requestUser.getUsername());
        user.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        user.setRole(requestUser.getRole());

        user = userRepository.save(user);
        var token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User requestUser) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                requestUser.getUsername(), requestUser.getPassword()));
        var user = userRepository.findByUsername(requestUser.getUsername()).orElseThrow();
        var token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
