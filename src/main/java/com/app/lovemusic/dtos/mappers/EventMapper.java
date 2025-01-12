package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.EventDto;
import com.app.lovemusic.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventMapper {

    private final AddressMapper addressMapper;

    public EventDto toDto(Event event) {
        EventDto eventDto = new EventDto();
        eventDto.setTitle(event.getTitle());
        eventDto.setDescription(event.getDescription());
        eventDto.setDate(event.getDate());
        eventDto.setAddress(addressMapper.toDto(event.getAddress()));

        return eventDto;
    }

    public Event toEvent(EventDto eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        event.setAddress(addressMapper.toAddress(eventDto.getAddress()));

        return event;
    }

}
