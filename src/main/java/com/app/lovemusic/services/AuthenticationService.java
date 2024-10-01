package com.app.lovemusic.services;

import com.app.lovemusic.dtos.LoginUserDto;
import com.app.lovemusic.dtos.RegisterUserDto;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public User signup(RegisterUserDto input) {
        User user = switch (input.getAccountType().toLowerCase()) {
            case "organizer" -> new Organizer();
            case "musician" -> new Musician();
            default -> throw new IllegalArgumentException("Invalid account type");
        };

        switch (input.getAccountType().toLowerCase()) {
            case "organizer" -> {
                user.setUserRole("ROLE_ORGANIZER");
            }
            case "musician" -> {
                user.setUserRole("ROLE_MUSICIAN");
            }
            default -> throw new IllegalArgumentException("Invalid account type");
        }

        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setFullName(input.getFullName());

        return userService.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        Optional<User> user = userService.findByEmail(input.getEmail());
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + input.getEmail() + " not found");
        }
        return user.get();
    }
}

