package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.dtos.mappers.RatingReviewMapper;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.RatingReviewService;
import com.app.lovemusic.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/rating-reviews")
@RestController
@RequiredArgsConstructor
public class RatingReviewsController {

    private final UserService userService;
    private final RatingReviewMapper ratingReviewMapper;
    private final RatingReviewService ratingReviewService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/received/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserReceivedReviews(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.get().getReviewsReceived();

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/authored/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserAuthoredReviews(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.get().getReviewsAuthored();

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add-review/{userId}")
    public ResponseEntity<RatingReviewDto> addReview(@PathVariable Long userId, @Valid @RequestBody RatingReviewDto reviewDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Optional<User> reviewedUser = userService.findById(userId);

        if (reviewedUser.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = currentUser.getReviewsAuthored();
        reviews.add(ratingReviewMapper.toRatingReview(currentUser.getId(), reviewedUser.get().getId(), reviewDto));
        currentUser.setReviewsAuthored(reviews);

        ratingReviewService.saveReview(currentUser.getId(), reviewedUser.get().getId(), reviewDto);

        return ResponseEntity.ok(reviewDto);
    }

}
