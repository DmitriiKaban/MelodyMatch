//package com.app.lovemusic.controllers;
//
//import com.app.lovemusic.dtos.MusicianRatingReviewDto;
//import com.app.lovemusic.dtos.mappers.MusicianRatingReviewMapper;
//import com.app.lovemusic.entity.MusicianRatingReview;
//import com.app.lovemusic.entity.User;
//import com.app.lovemusic.entity.accountTypes.Musician;
//import com.app.lovemusic.entity.accountTypes.Organizer;
//import com.app.lovemusic.services.UserService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequestMapping("/rating-reviews")
//@RestController
//@RequiredArgsConstructor
//public class RatingReviewsController {
//
//    private final UserService userService;
//    private final MusicianRatingReviewMapper musicianRatingReviewMapper;
//
//    @PreAuthorize("hasRole('USER')")
//    @GetMapping("/get-reviews/{userId}")
//    public ResponseEntity<List<MusicianRatingReview>> getUserReviews(@PathVariable Integer userId) {
//        User user = userService.findById(userId);
//
//        if (user == null) {
//            throw new IllegalArgumentException("User not found");
//        }
//
//        List<MusicianRatingReview> reviews;
//
//        if(user instanceof Musician) reviews = ((Musician) user).getReviews();
//        else reviews = ((Organizer) user).getReviews();
//
//        return ResponseEntity.ok(reviews);
//    }
//
//    @PreAuthorize("hasRole('USER')")
//    @PostMapping("/add-review/{userId}")
//    public ResponseEntity<MusicianRatingReviewDto> addReview(@PathVariable Integer userId, @Valid @RequestBody MusicianRatingReviewDto reviewDto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        User currentUser = (User) authentication.getPrincipal();
//
//        if(!(currentUser instanceof Organizer organizer)) {
//            throw new IllegalArgumentException("You are not an organizer");
//        }
//
//        User reviewedUser = userService.findById(userId);
//
//        if (reviewedUser == null) {
//            throw new IllegalArgumentException("User not found");
//        }
//
//        if (!(reviewedUser instanceof Musician musician)) {
//            throw new IllegalArgumentException("User is not a musician");
//        }
//
//        List<MusicianRatingReview> reviews = musician.getReviews();
//
//        reviews.add(musicianRatingReviewMapper.toMusicianRatingReview(musician.getId(), organizer.getId(), reviewDto));
//        musician.setReviews(reviews);
//
//        return ResponseEntity.ok(reviewDto);
//    }
//
//}
