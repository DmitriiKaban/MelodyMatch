package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MusicianService {
    private final UserService userService;

    public Musician findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        return (Musician) user.orElse(null);
    }
}
