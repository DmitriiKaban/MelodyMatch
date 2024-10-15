package com.app.lovemusic.services;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.dtos.mappers.RatingReviewMapper;
import com.app.lovemusic.repositories.RatingReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingReviewService {

    private final RatingReviewRepository ratingReviewRepository;
    private final RatingReviewMapper ratingReviewMapper;

    public void saveReview(Long authorId, Long targetId, RatingReviewDto reviewDto) {
        ratingReviewRepository.save(ratingReviewMapper.toRatingReview(authorId, targetId, reviewDto));
    }

}
