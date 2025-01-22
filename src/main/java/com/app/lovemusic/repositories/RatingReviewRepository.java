package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.entity.RatingReviewKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingReviewRepository extends JpaRepository<RatingReview, RatingReviewKey> {
}