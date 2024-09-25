package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.repositories.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizerService implements OrganizerRepository {

    private final UserService userService;
    @Override
    public Organizer findByEmail(String username) {

        User user = userService.findByEmail(username);
        // check if user is a organizer (join in DB)
        return null;
    }
}
