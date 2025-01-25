package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.EventDto;
import com.app.lovemusic.entity.Event;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.EventService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/gigs")
    public ResponseEntity<List<Event>> allEvents() {
        List<Event> events = eventService.allEvents();

        return ResponseEntity.ok(events);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/gigs/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Integer id) {
        Event event = eventService.getEvent(id).orElse(null);

        if (event == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(event);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myGigs")
    public ResponseEntity<List<Event>> myEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        List<Event> events = eventService.getUserEvents(currentUser);

        return ResponseEntity.ok(events);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/add")
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventDto eventDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Event event = eventService.createEvent(currentUser, eventDto);

        return ResponseEntity.ok(event);
    }
}
