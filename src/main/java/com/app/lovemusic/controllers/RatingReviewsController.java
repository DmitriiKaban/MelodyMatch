package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.dtos.mappers.RatingReviewMapper;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/rating-reviews")
@RestController
@RequiredArgsConstructor
public class RatingReviewsController {

    private final UserService userService;
    private final RatingReviewMapper ratingReviewMapper;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/received/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserReceivedReviews(@PathVariable Integer userId) {
        User user = userService.findById(userId);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(user.getReviewsReceived()));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/authored/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserAuthoredReviews(@PathVariable Integer userId) {
        User user = userService.findById(userId);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(user.getReviewsAuthored()));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add-review/{userId}")
    public ResponseEntity<RatingReviewDto> addReview(@PathVariable Integer userId, @Valid @RequestBody RatingReviewDto reviewDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        User reviewedUser = userService.findById(userId);

        if (reviewedUser == null) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = currentUser.getReviewsAuthored();
        reviews.add(ratingReviewMapper.toRatingReview(currentUser.getId(), reviewedUser.getId(), reviewDto));
        currentUser.setReviewsAuthored(reviews);

        return ResponseEntity.ok(reviewDto);
    }

}
