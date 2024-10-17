package com.app.lovemusic.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class RatingReviewKey implements Serializable {

    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "target_id")
    private Long targetId;

}