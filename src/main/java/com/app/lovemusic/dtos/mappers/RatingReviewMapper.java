package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.RatingReviewDto;
import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.RatingReviewKey;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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

        Optional<User> author = userService.findById(authorId);

        if (author.isEmpty()) {
            throw new IllegalArgumentException("Author not found");
        }

        Optional<User> target = userService.findById(targetId);

        if (target.isEmpty()) {
            throw new IllegalArgumentException("Target not found");
        }

        ratingReview.setAuthor(author.get());
        ratingReview.setTarget(target.get());
        ratingReview.setRating(ratingReviewDto.getRating());
        ratingReview.setReview(ratingReviewDto.getReview());

        return ratingReview;
    }

    public List<RatingReviewDto> toDtos(List<RatingReview> ratingReviews) {
        return ratingReviews.stream().map(this::toDto).toList();
    }

}
