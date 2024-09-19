package com.app.lovemusic.entity;

import com.app.lovemusic.entity.accountTypes.MusicianAccountType;
import com.app.lovemusic.entity.accountTypes.OrganizerAccountType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "reviews")
@Entity
@Getter
@Setter
public class MusicianRatingReviews {

    @EmbeddedId
    private RatingReviewKey ratingReviewKey;

    @ManyToOne
    @MapsId("musicianId")
    @JoinColumn(name = "musician_id")
    private MusicianAccountType musician;

    @ManyToOne
    @MapsId("organizerId")
    @JoinColumn(name = "organizer_id")
    private OrganizerAccountType organizer;

    @Column(nullable = false)
    private Integer rating;

    @Column
    private String review;

}
