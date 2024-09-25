package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.accountTypes.Organizer;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizerRepository { //extends JpaRepository<Organizer, Long> {
    Organizer findByEmail(String username);
}
