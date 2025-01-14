package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Organizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizerService {

    private final UserService userService;

    public Organizer findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent() && user.get() instanceof Organizer) {
            return (Organizer) user.get();
        }
        return null;
    }
}

