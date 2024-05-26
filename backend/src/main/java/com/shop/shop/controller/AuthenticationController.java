package com.shop.shop.controller;

import com.shop.shop.filter.JwtAuthenticationFilter;
import com.shop.shop.model.User;
import com.shop.shop.repository.UserRepository;
import com.shop.shop.service.AuthenticationService;
import com.shop.shop.service.model.AuthenticationResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AuthenticationController(AuthenticationService authenticationService, UserRepository userRepository) {
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        authenticationService.register(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/users/password")
    public ResponseEntity<Void> updatePassword(@RequestBody User user) {
        var succeeded = authenticationService.updatePassword(user);
        return new ResponseEntity<>(succeeded ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user) {
        user.setUsername(user.getFirstName().toLowerCase() + "_" + user.getLastName().toLowerCase());
        var authenticationResponse = authenticationService.authenticate(user);
        var httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtAuthenticationFilter.AUTHORIZATION_HEADER,
                "Bearer " + authenticationResponse.token());
        return new ResponseEntity<>(authenticationResponse, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        var users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        var user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null));
    }

}
