package com.app.lovemusic.services;

import com.app.lovemusic.dtos.LoginUserDto;
import com.app.lovemusic.dtos.RegisterUserDto;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.exceptions.UserAlreadyExistsException;
import com.app.lovemusic.repositories.MusicianRepository;
import com.app.lovemusic.repositories.OrganizerRepository;
import com.app.lovemusic.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final MusicianRepository musicianRepository;
    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;

    public AuthenticationService(
            MusicianRepository musicianRepository,
            OrganizerRepository organizerRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository, UserService userService) {
        this.musicianRepository = musicianRepository;
        this.organizerRepository = organizerRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public User signup(RegisterUserDto input) {
        User user = switch (input.getAccountType().toLowerCase()) {
            case "organizer" -> new Organizer();
            case "musician" -> new Musician();
            default -> throw new IllegalArgumentException("Invalid account type");
        };

        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setFullName(input.getFullName());
        user.setUserRole("ROLE_USER");
        // save user to the database, connecting to the table organizer or musician
        return userService.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        User user = userService.findByEmail(input.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User with email " + input.getEmail() + " not found");
        }
        return user;
    }
}

