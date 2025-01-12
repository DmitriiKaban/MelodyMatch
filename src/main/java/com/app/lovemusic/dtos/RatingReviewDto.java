package com.app.lovemusic.dtos;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RatingReviewDto {

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1", message = "Rating must be at least 1")
    @DecimalMax(value = "5", message = "Rating must be at most 5")
    private Integer rating;

    private String review;

}
