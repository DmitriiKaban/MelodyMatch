package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.RatingReviewKey;
import com.app.lovemusic.entity.User;
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

    public RatingReview toRatingReview(Long authorId, Long targetId, RatingReviewDto ratingReviewDto, User author, User target) {
        RatingReview ratingReview = new RatingReview();
        RatingReviewKey key = new RatingReviewKey();

        key.setAuthorId(authorId);
        key.setTargetId(targetId);
        ratingReview.setRatingReviewKey(key);

        ratingReview.setRating(ratingReviewDto.getRating());
        ratingReview.setReview(ratingReviewDto.getReview());

        ratingReview.setAuthor(author);
        ratingReview.setTarget(target);

        return ratingReview;
    }

    public List<RatingReviewDto> toDtos(List<RatingReview> ratingReviews) {
        return ratingReviews.stream().map(this::toDto).toList();
    }

}