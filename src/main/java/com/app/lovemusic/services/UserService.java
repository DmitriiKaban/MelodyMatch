package com.app.lovemusic.services;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.repositories.UserRepository;
import com.app.lovemusic.util.UserRowMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public List<User> allUsers() {

        String sql = "SELECT * FROM users";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper());

        return users;
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new UserRowMapper(), email));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public User findById(Integer id) {

        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }

    public User createNewUserAfterOAuthLoginSuccess(String accountType, String email, String name, AuthenticationProviders provider) {
        User user = switch (accountType.toLowerCase()) {
            case "musician" -> new Musician();
            case "organizer" -> new Organizer();
            default -> throw new IllegalArgumentException("Invalid account type");
        };

        user.setEmail(email);
        user.setFullName(name);
        user.setAuthProvider(provider);
        user.setCreatedAt(new Date());

        // Set user role dynamically based on account type
        user.setUserRole("ROLE_" + accountType.toUpperCase());

        save(user);

        return user;
    }

    User save(User user) {

        String sql = "INSERT INTO users (email, full_name, user_role, created_at, updated_at, auth_provider) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getEmail(), user.getFullName(), user.getUserRole(), user.getCreatedAt(), user.getUpdatedAt(), user.getAuthProvider().toString());
        return user;
    }

    public void updateUserAfterOAuthLoginSuccess(User user, String name, AuthenticationProviders authenticationProviders) {
        user.setFullName(name);
        user.setAuthProvider(authenticationProviders);
        user.setUpdatedAt(new Date());

        if (user instanceof Musician) save(user);
    }

    public void updateUserRole(User currentUser, String role) {
        currentUser.setUserRole("ROLE_" + role.toUpperCase());
        save(currentUser);
    }

    public void uploadProfilePicture(User currentUser, String profilePicture) {
        currentUser.setProfilePicture(profilePicture);
        save(currentUser);
    }

    public void updateFullName(User currentUser, String name) {
        currentUser.setFullName(name);
        save(currentUser);
    }

    public void updatePaymentInformation(User currentUser, PaymentInfoDto paymentInfoDto) {
        PaymentInformation paymentInformation = new PaymentInformation();

        paymentInformation.setCardNumber(paymentInfoDto.getCardNumber());
        paymentInformation.setCardHolderName(paymentInfoDto.getCardHolderName());
        paymentInformation.setExpirationDate(paymentInfoDto.getExpirationDate());
        paymentInformation.setCvvCode(paymentInfoDto.getCvvCode());
        paymentInformation.setUser(currentUser);

        currentUser.setPaymentInformation(paymentInformation);

        save(currentUser);
    }

}