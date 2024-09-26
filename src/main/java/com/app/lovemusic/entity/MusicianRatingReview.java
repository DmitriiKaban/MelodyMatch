package com.app.lovemusic.entity;

import com.app.lovemusic.entity.accountTypes.Musicians;
import com.app.lovemusic.entity.accountTypes.Organizers;
import jakarta.persistence.*;
import lombok.Data;

@Table(name = "reviews")
@Entity
@Data
public class MusicianRatingReview {

    @EmbeddedId
    private RatingReviewKey ratingReviewKey;

    @ManyToOne
    @MapsId("musicianId")
    @JoinColumn(name = "musician_id")
    private Musicians musicians;

    @ManyToOne
    @MapsId("organizerId")
    @JoinColumn(name = "organizer_id")
    private Organizers organizers;

    @Column(nullable = false)
    private Integer rating;

    @Column
    private String review;
}
