package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.repositories.MusicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicianService implements MusicianRepository {

    private final UserService userService;

    @Override
    public Musician findByEmail(String username) {

        User user = userService.findByEmail(username);
        // check if user is a musician (join in DB)
        return null;
    }
}
