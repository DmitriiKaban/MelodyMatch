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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/rating-reviews")
@RestController
@RequiredArgsConstructor
public class RatingReviewsController {

    private final UserService userService;
    private final RatingReviewService ratingReviewService;
    private final RatingReviewMapper ratingReviewMapper;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/received/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserReceivedReviews(@PathVariable Long userId) {
        User user = userService.findById(userId).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.getReviewsReceived();
        if (reviews == null) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/authored/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserAuthoredReviews(@PathVariable Long userId) {
        User user = userService.findById(userId).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.getReviewsAuthored();
        if (reviews == null) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add-review/{userId}")
    public ResponseEntity<RatingReviewDto> addReview(@PathVariable Long userId, @Valid @RequestBody RatingReviewDto reviewDto) {
        RatingReviewDto savedReviewDto = ratingReviewService.addReview(userId, reviewDto);
        return ResponseEntity.ok(savedReviewDto);
    }

}