package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.exceptions.UserNotFoundException;
import com.app.lovemusic.exceptions.YouAreNotAMusicianException;
import com.app.lovemusic.exceptions.YouAreNotAnOrganizerException;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/account/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/account/upload-pfp")
    public ResponseEntity<UserDto> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile profilePicture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.uploadProfilePicture(currentUser, profilePicture);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/account/update-name")
    public ResponseEntity<UserDto> updateName(@RequestBody String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updateFullName(currentUser, name);

        logger.info("User " + currentUser.getEmail() + " updated their name to " + name);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/account/update-payment-info")
    public ResponseEntity<UserDto> updatePaymentInformation(@Valid @RequestBody PaymentInfoDto paymentInfoDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updatePaymentInformation(currentUser, paymentInfoDto);

        logger.info("User " + currentUser.getEmail() + " updated their payment information");

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/account/get-resume/{userId}")
    public ResponseEntity<String> getUserResume(@PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        Optional<User> user = userService.findById(userId);

        if (user.isEmpty()) {
            logger.error("User " + requestedUser.getEmail() + " tried to access resume of non-existing user");
            throw new UserNotFoundException("User not found");
        }

        if(!(requestedUser instanceof Organizer)) {
            logger.error("User " + requestedUser.getEmail() + " tried to access resume of user " + user.get().getEmail());
            throw new YouAreNotAnOrganizerException("You are not an organizer");
        }

        if(!(user.get() instanceof Musician musician)) {
            logger.error("User " + requestedUser.getEmail() + " tried to access resume of non-musician user " + user.get().getEmail());
            throw new YouAreNotAMusicianException("User is not a musician");
        }

        return ResponseEntity.ok(musician.getResume());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/account/get-work-experience/{userId}")
    public ResponseEntity<String> getUserWorkExperience(@PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        Optional<User> user = userService.findById(userId);

        if(user.isEmpty()) {
            logger.error("User " + requestedUser.getEmail() + " tried to access work experience of non-existing user");
            throw new UserNotFoundException("User not found");
        }

        if(!(requestedUser instanceof Organizer)) {
            logger.error("User " + requestedUser.getEmail() + " tried to access work experience of user " + user.get().getEmail());
            throw new YouAreNotAnOrganizerException("You are not an organizer");
        }

        if(!(user.get() instanceof Musician musician)) {
            logger.error("User " + requestedUser.getEmail() + " tried to access work experience of non-musician user " + user.get().getEmail());
            throw new YouAreNotAMusicianException("User is not a musician");
        }

        return ResponseEntity.ok(musician.getWorkExperience());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/account/user/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        if(user.isEmpty()) {
            logger.error("User " + userId + " not found");
            throw new UserNotFoundException("User not found");
        }

        return ResponseEntity.ok(userMapper.toDto(user.get()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/account/all-users")
    public ResponseEntity<List<UserDto>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(userMapper.toDtoList(users));
    }
}
