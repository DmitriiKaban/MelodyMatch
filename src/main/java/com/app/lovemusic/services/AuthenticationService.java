package com.app.lovemusic.services;

import com.app.lovemusic.dtos.LoginUserDto;
import com.app.lovemusic.dtos.RegisterUserDto;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.exceptions.UserAlreadyExistsException;
import com.app.lovemusic.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {

        User user = new User();
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setFullName(input.getFullName());

        if (!Set.of("organizer", "musician").contains(input.getRole().toLowerCase())) {
            throw new IllegalArgumentException("Invalid role");
        }

        user.setUserRole("ROLE_" + input.getRole().toUpperCase());

        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + input.getEmail() + " already exists");
        }

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
