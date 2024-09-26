package com.app.lovemusic.entity;

import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
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
    private Musician musician;

    @ManyToOne
    @MapsId("organizerId")
    @JoinColumn(name = "organizer_id")
    private Organizer organizer;

    @Column(nullable = false)
    private Integer rating;

    @Column
    private String review;
}
