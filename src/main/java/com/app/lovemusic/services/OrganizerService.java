package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.repositories.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizerService implements OrganizerRepository {

    private final UserService userService;

    public Organizer findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        return (Organizer) user.orElse(null);
    }
}
