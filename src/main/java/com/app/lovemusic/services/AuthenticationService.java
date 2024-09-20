package com.app.lovemusic.services;

import com.app.lovemusic.dtos.LoginUserDto;
import com.app.lovemusic.dtos.RegisterUserDto;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.exceptions.UserAlreadyExistsException;
import com.app.lovemusic.repositories.MusicianRepository;
import com.app.lovemusic.repositories.OrganizerRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final MusicianRepository musicianRepository;
    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            MusicianRepository musicianRepository,
            OrganizerRepository organizerRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.musicianRepository = musicianRepository;
        this.organizerRepository = organizerRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
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

        if (input.getAccountType().equalsIgnoreCase("organizer")) {
            if (organizerRepository.findByEmail(input.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("Organizer with email " + input.getEmail() + " already exists");
            }
            return organizerRepository.save((Organizer) user);
        } else {
            if (musicianRepository.findByEmail(input.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("Musician with email " + input.getEmail() + " already exists");
            }
            return musicianRepository.save((Musician) user);
        }
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return musicianRepository.findByEmail(input.getEmail())
                .or(() -> organizerRepository.findByEmail(input.getEmail()))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}

