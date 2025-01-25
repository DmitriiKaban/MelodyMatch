package com.app.lovemusic.controllers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.dtos.mappers.RatingReviewMapper;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.RatingReviewService;
import com.app.lovemusic.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private static final Logger logger = LoggerFactory.getLogger(RatingReviewsController.class);

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/received/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserReceivedReviews(@PathVariable Long userId) {
        User user = userService.findById(userId).orElse(null);

        if (user == null) {
            logger.error("User not found with id: {}", userId);
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.getReviewsReceived();

        if (reviews == null) {
            logger.error("No reviews found for user with id: {}", userId);
            return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-reviews/authored/{userId}")
    public ResponseEntity<List<RatingReviewDto>> getUserAuthoredReviews(@PathVariable Long userId) {
        User user = userService.findById(userId).orElse(null);

        if (user == null) {
            logger.error("User not found with id: {}", userId);
            throw new IllegalArgumentException("User not found");
        }

        List<RatingReview> reviews = user.getReviewsAuthored();

        if (reviews == null) {
            logger.error("No reviews found for user with id: {}", userId);
            return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(ratingReviewMapper.toDtos(reviews));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add-review/{userId}")
    public ResponseEntity<RatingReviewDto> addReview(@PathVariable Long userId, @Valid @RequestBody RatingReviewDto reviewDto) {
        RatingReviewDto savedReviewDto = ratingReviewService.addReview(userId, reviewDto);


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (currentUser.getId().equals(userId)) {
            logger.error("User cannot review yourself");
            throw new IllegalArgumentException("User cannot review yourself");
        }

        return ResponseEntity.ok(savedReviewDto);
    }

}