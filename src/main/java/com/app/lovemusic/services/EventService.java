package com.app.lovemusic.services;

import com.app.lovemusic.dtos.EventDto;
import com.app.lovemusic.dtos.mappers.AddressMapper;
import com.app.lovemusic.entity.Event;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final AddressMapper addressMapper;

    public List<Event> allEvents() {
        List<Event> events = new ArrayList<>();

        eventRepository.findAll().forEach(events::add);

        return events;
    }

    public Event createEvent(User organizer, EventDto eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        event.setOrganizer(organizer);
        event.setAddress(addressMapper.toAddress(eventDto.getAddress()));

        eventRepository.save(event);

        return event;
    }

}
