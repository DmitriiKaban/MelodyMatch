package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.RatingReviewKey;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RatingReviewMapper {

    public RatingReviewDto toDto(RatingReview ratingReview) {
        RatingReviewDto ratingReviewDto = new RatingReviewDto();
        ratingReviewDto.setRating(ratingReview.getRating());
        ratingReviewDto.setReview(ratingReview.getReview());

        return ratingReviewDto;
    }

    public RatingReview toRatingReview(Long authorId, Long targetId, RatingReviewDto ratingReviewDto) {
        RatingReview ratingReview = new RatingReview();
        ratingReview.setRatingReviewKey(new RatingReviewKey());
        ratingReview.getRatingReviewKey().setAuthorId(authorId);
        ratingReview.getRatingReviewKey().setTargetId(targetId);
        ratingReview.setRating(ratingReviewDto.getRating());
        ratingReview.setReview(ratingReviewDto.getReview());

        return ratingReview;
    }

    public List<RatingReviewDto> toDtos(List<RatingReview> ratingReviews) {
        return ratingReviews.stream().map(this::toDto).toList();
    }

}
