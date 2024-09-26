package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.accountTypes.Musician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicianRepository extends JpaRepository<Musician, Long> {

}

