package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.Event;
import com.app.lovemusic.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    List<Event> findByOrganizer(User user);
}
