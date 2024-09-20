package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.MusicianRatingReviewDto;
import com.app.lovemusic.entity.MusicianRatingReview;
import org.springframework.stereotype.Component;

@Component
public class MusicianRatingReviewMapper {

    public MusicianRatingReviewDto toDto(MusicianRatingReview musicianRatingReview) {
        MusicianRatingReviewDto musicianRatingReviewDto = new MusicianRatingReviewDto();
        musicianRatingReviewDto.setRating(musicianRatingReview.getRating());
        musicianRatingReviewDto.setReview(musicianRatingReview.getReview());

        return musicianRatingReviewDto;
    }

    public MusicianRatingReview toMusicianRatingReview(int musicianId, int organizerId, MusicianRatingReviewDto musicianRatingReviewDto) {
        MusicianRatingReview musicianRatingReview = new MusicianRatingReview();
        musicianRatingReview.getRatingReviewKey().setMusicianId(musicianId);
        musicianRatingReview.getRatingReviewKey().setOrganizerId(organizerId);
        musicianRatingReview.setRating(musicianRatingReviewDto.getRating());
        musicianRatingReview.setReview(musicianRatingReviewDto.getReview());

        return musicianRatingReview;
    }

}
