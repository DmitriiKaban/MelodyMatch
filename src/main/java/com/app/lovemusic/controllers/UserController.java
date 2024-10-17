package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        System.out.println(userMapper.toDto(currentUser));

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/upload-pfp")
    public ResponseEntity<UserDto> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile profilePicture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.uploadProfilePicture(currentUser, profilePicture);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/update-name")
    public ResponseEntity<UserDto> updateName(@RequestBody String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updateFullName(currentUser, name);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/update-payment-info")
    public ResponseEntity<UserDto> updatePaymentInformation(@Valid @RequestBody PaymentInfoDto paymentInfoDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updatePaymentInformation(currentUser, paymentInfoDto);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-resume/{userId}")
    public ResponseEntity<String> getUserResume(@PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        Optional<User> user = userService.findById(userId);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        if(!(requestedUser instanceof Organizer)) {
            throw new IllegalArgumentException("You are not an organizer");
        }

        if(!(user.get() instanceof Musician musician)) {
            throw new IllegalArgumentException("User is not a musician");
        }

        return ResponseEntity.ok(musician.getResume());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-work-experience/{userId}")
    public ResponseEntity<String> getUserWorkExperience(@PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        Optional<User> user = userService.findById(userId);

        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        if(!(requestedUser instanceof Organizer)) {
            throw new IllegalArgumentException("You are not an organizer");
        }

        if(!(user.get() instanceof Musician musician)) {
            throw new IllegalArgumentException("User is not a musician");
        }

        return ResponseEntity.ok(musician.getWorkExperience());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-user/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        return ResponseEntity.ok(userMapper.toDto(user.get()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<List<UserDto>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(userMapper.toDtoList(users));
    }
}
