package com.app.lovemusic.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class RatingReviewKey implements Serializable {

    private Long organizerId;
    private Long musicianId;

}
