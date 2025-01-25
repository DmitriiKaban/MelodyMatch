package com.app.lovemusic.util;

import com.app.lovemusic.entity.RatingReview;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@RequiredArgsConstructor
public class RatingReviewDBMapper implements RowMapper<RatingReview>  {

    private final UserService userService;

    @Override
    public RatingReview mapRow(ResultSet rs, int rowNum) throws SQLException {
        RatingReview user = new RatingReview();

        Long authorId = rs.getLong("author_id");
        Long targetId = rs.getLong("target_id");
        user.setAuthor(userService.findById(authorId).orElse(null));
        user.setTarget(userService.findById(targetId).orElse(null));
        user.setRating(rs.getInt("rating"));
        user.setReview(rs.getString("review"));

        return user;
    }
}
