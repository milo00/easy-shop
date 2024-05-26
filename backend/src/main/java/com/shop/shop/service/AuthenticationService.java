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

    public void register(User requestUser) {
        var user = new User(requestUser);
        user.setUsername(user.getFirstName().toLowerCase() + "_" + user.getLastName().toLowerCase());
        user.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        userRepository.save(user);
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public boolean updatePassword(User requestUser) {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        var user = new User(requestUser);
        user.setUsername(user.getFirstName().toLowerCase() + "_" + user.getLastName().toLowerCase());
        var dbUser = userRepository.findByUsernameAndYearOfBirth(user.getUsername(), user.getYearOfBirth());
        if (dbUser.isEmpty()) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        user.setId(dbUser.get().getId());
        user.setRole(dbUser.get().getRole());
        userRepository.save(user);
        return true;
    }

    public AuthenticationResponse authenticate(User requestUser) {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                requestUser.getUsername(), requestUser.getPassword()));
        var token = jwtService.generateToken(requestUser.getUsername());
        return new AuthenticationResponse(token, (User) authentication.getPrincipal());
    }
}
