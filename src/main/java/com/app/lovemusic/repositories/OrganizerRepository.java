package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.accountTypes.Organizers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizerRepository extends JpaRepository<Organizers, Long> {

}
