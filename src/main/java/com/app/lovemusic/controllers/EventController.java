package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.EventDto;
import com.app.lovemusic.entity.Event;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/events")
@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all-events")
    public ResponseEntity<List<Event>> allEvents() {
        List<Event> events = eventService.allEvents();

        return ResponseEntity.ok(events);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/create-event")
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventDto eventDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Event event = eventService.createEvent(currentUser, eventDto);

        return ResponseEntity.ok(event);
    }



}
