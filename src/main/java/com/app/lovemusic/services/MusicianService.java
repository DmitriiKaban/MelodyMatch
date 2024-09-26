package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.repositories.MusicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MusicianService implements MusicianRepository{
    private final UserService userService;
}
