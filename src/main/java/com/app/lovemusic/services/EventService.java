package com.app.lovemusic.services;

import com.app.lovemusic.controllers.EventController;
import com.app.lovemusic.dtos.EventDto;
import com.app.lovemusic.dtos.mappers.AddressMapper;
import com.app.lovemusic.entity.Event;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final AddressMapper addressMapper;
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);

    public List<Event> allEvents() {
        List<Event> events = new ArrayList<>();

        eventRepository.findAll().forEach(events::add);

        return events;
    }

    public List<Event> getUserEvents(User user) {
        return eventRepository.findByOrganizer(user);
    }

    public Optional<Event> getEvent(Integer id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(User organizer, EventDto eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        event.setOrganizer(organizer);
        event.setAddress(addressMapper.toAddress(eventDto.getAddress()));

        eventRepository.save(event);

        logger.info("Event created: " + event.getTitle() + " by " + organizer.getEmail());

        return event;
    }

}
