package com.app.lovemusic.services;

import com.app.lovemusic.entity.User;
import com.app.lovemusic.util.UserRowMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        String sql = "SELECT * FROM users WHERE email = ?";
        System.out.println("Loading user by email: " + email);
        try {
            User user = jdbcTemplate.queryForObject(sql, new UserRowMapper(), email);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with email: " + email);
            }
            return user;
        } catch (EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}
