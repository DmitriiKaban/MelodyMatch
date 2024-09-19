package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.entity.MusicianRatingReviews;
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

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/assign-account-type/{accountType}")
    public ResponseEntity<User> assignAccountType(@PathVariable String accountType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        if (!List.of("musician", "organizer").contains(accountType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid account type");
        }
        userService.updateUserAccountType(currentUser, accountType);

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/upload-pfp/{profilePicture}")
    public ResponseEntity<User> uploadProfilePicture(@PathVariable String profilePicture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.uploadProfilePicture(currentUser, profilePicture);

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/update-name/{name}")
    public ResponseEntity<User> updateName(@PathVariable String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updateFullName(currentUser, name);

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/update-payment-info")
    public ResponseEntity<User> updatePaymentInformation(@Valid @RequestBody PaymentInfoDto paymentInfoDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        userService.updatePaymentInformation(currentUser, paymentInfoDto);

        return ResponseEntity.ok(currentUser);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/{userId}")
    public ResponseEntity<List<MusicianRatingReviews>> getUserReviews(@PathVariable Integer userId) {
        User user = userService.findById(userId);

        List<MusicianRatingReviews> reviews;

        if(user.isMusician()) reviews = ((MusicianAccountType) user.getAccountType()).getReviews();
        else reviews = ((OrganizerAccountType) user.getAccountType()).getReviews();

        return ResponseEntity.ok(reviews);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
