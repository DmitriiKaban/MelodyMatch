package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Organizers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizerService {

    private final UserService userService;

    public Organizers findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        return (Organizers) user.orElse(null);
    }
}
