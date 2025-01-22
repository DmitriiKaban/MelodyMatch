package com.app.lovemusic.services;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.dtos.mappers.RatingReviewMapper;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.repositories.RatingReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingReviewService {

    private final RatingReviewRepository ratingReviewRepository;
    private final UserService userService;
    private final RatingReviewMapper ratingReviewMapper;

    @Transactional
    public RatingReviewDto addReview(Long userId, RatingReviewDto reviewDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        User reviewedUser = userService.findById(userId).orElse(null);

        if (reviewedUser == null) {
            throw new IllegalArgumentException("User not found");
        }

        System.out.println("Current user: " + currentUser.getId());
        System.out.println("Reviewed user: " + reviewedUser.getId());

        RatingReview ratingReview = ratingReviewMapper.toRatingReview(currentUser.getId(), reviewedUser.getId(), reviewDto, currentUser, reviewedUser);
        ratingReviewRepository.save(ratingReview);

        return reviewDto;
    }
}