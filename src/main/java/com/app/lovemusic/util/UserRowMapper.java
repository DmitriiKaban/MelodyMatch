package com.app.lovemusic.util;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.UserRoles;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setFullName(rs.getString("full_name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setCreatedAt(rs.getTimestamp("created_at"));
        user.setUpdatedAt(rs.getTimestamp("updated_at"));
        user.setUserRole(UserRoles.valueOf(rs.getString("user_role")));
        user.setAuthProvider(AuthenticationProviders.valueOf(rs.getString("auth_provider")));
        user.setAccountType(rs.getString("account_type"));
        user.setSecret(rs.getString("mfa_secret"));

        return user;
    }
}
