package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.RatingReviewKey;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RatingReviewMapper {

    private final UserService userService;

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
        ratingReview.setAuthor(userService.findById(authorId));
        ratingReview.setTarget(userService.findById(targetId));
        ratingReview.setRating(ratingReviewDto.getRating());
        ratingReview.setReview(ratingReviewDto.getReview());

        return ratingReview;
    }

    public List<RatingReviewDto> toDtos(List<RatingReview> ratingReviews) {
        return ratingReviews.stream().map(this::toDto).toList();
    }

}
