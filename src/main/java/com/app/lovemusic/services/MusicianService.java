package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musicians;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MusicianService {
    private final UserService userService;

    public Musicians findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        return (Musicians) user.orElse(null);
    }
}
