package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.MusicianRatingReview;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.MusicianAccountType;
import com.app.lovemusic.entity.accountTypes.OrganizerAccountType;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/assign-account-type/{accountType}")
    public ResponseEntity<UserDto> assignAccountType(@PathVariable String accountType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        if (!List.of("musician", "organizer").contains(accountType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid account type");
        }
        userService.updateUserAccountType(currentUser, accountType);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/upload-pfp/{profilePicture}")
    public ResponseEntity<UserDto> uploadProfilePicture(@PathVariable String profilePicture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.uploadProfilePicture(currentUser, profilePicture);

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/update-name/{name}")
    public ResponseEntity<UserDto> updateName(@PathVariable String name) {
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
    public ResponseEntity<String> getUserResume(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        User user = userService.findById(userId);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if(!requestedUser.isOrganizer()) {
            throw new IllegalArgumentException("You are not an organizer");
        }

        if(!user.isMusician()) {
            throw new IllegalArgumentException("User is not a musician");
        }

        MusicianAccountType musician = (MusicianAccountType) user.getAccountType();

        return ResponseEntity.ok(musician.getResume());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-work-experience/{userId}")
    public ResponseEntity<String> getUserWorkExperience(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User requestedUser = (User) authentication.getPrincipal();

        User user = userService.findById(userId);

        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if(!requestedUser.isOrganizer()) {
            throw new IllegalArgumentException("You are not an organizer");
        }

        if(!user.isMusician()) {
            throw new IllegalArgumentException("User is not a musician");
        }

        MusicianAccountType musician = (MusicianAccountType) user.getAccountType();

        return ResponseEntity.ok(musician.getWorkExperience());
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-user/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer userId) {
        User user = userService.findById(userId);

        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }

        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<List<UserDto>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(userMapper.toDtoList(users));
    }
}
