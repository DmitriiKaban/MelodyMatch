package com.app.lovemusic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "reviews")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingReview {

    @EmbeddedId
    private RatingReviewKey ratingReviewKey;

    @ManyToOne
    @MapsId("authorId")
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @MapsId("targetId")
    @JoinColumn(name = "target_id")
    private User target;

    @Column(nullable = false)
    private Integer rating;

    @Column
    private String review;
}
