package com.app.lovemusic.services;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.UserRoles;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.repositories.MusicianRepository;
import com.app.lovemusic.repositories.OrganizerRepository;
import com.app.lovemusic.repositories.UserRepository;
import com.app.lovemusic.util.UserRowMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserRepository {

    private final JdbcTemplate jdbcTemplate;
    private final MusicianRepository musicianRepository;
    private final OrganizerRepository organizerRepository;

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
        switch (accountType.toLowerCase()) {
            case "musician" -> {

                Musician musician = new Musician();
                musician.setEmail(email);
                musician.setFullName(name);
                musician.setAuthProvider(provider);
                musician.setCreatedAt(new Date());
                musician.setUserRole(UserRoles.USER);
                musician.setAccountType("musician");
                saveMusician(musician);
                System.out.println("New musician: " + musician);
                return musician;
            }
            case "organizer" -> {

                Organizer organizer = new Organizer();
                organizer.setEmail(email);
                organizer.setFullName(name);
                organizer.setAuthProvider(provider);
                organizer.setCreatedAt(new Date());
                organizer.setUserRole(UserRoles.USER);
                organizer.setAccountType("organizer");
                saveOrganizer(organizer);
                return organizer;
            }
            default -> throw new IllegalArgumentException("Invalid account type");
        }
    }

    private void saveOrganizer(Organizer organizer) {
        organizerRepository.save(organizer);
    }

    private void saveMusician(Musician musician) {
        musicianRepository.save(musician);
    }

    User save(User user) {

        String sql = "INSERT INTO users (email, full_name, created_at, updated_at, auth_provider) VALUES (?, ?, ?, ?, ?)";
        String authProvider = user.getAuthProvider() != null ? user.getAuthProvider().toString() : null;
        jdbcTemplate.update(sql, user.getEmail(), user.getFullName(), user.getCreatedAt(), user.getUpdatedAt(), authProvider);

        return user;
    }

    public void updateUserAfterOAuthLoginSuccess(User user, String name, AuthenticationProviders authenticationProviders) {
        user.setFullName(name);
        user.setAuthProvider(authenticationProviders);
        user.setUpdatedAt(new Date());

        if (user instanceof Musician) save(user);
    }

    public void updateUserRole(User currentUser, String role) {
        if (role == null) return;
        else if (role.equalsIgnoreCase("admin")) currentUser.setUserRole(UserRoles.ADMIN);
        else if (role.equalsIgnoreCase("musician")) currentUser.setUserRole(UserRoles.USER);
        else if (role.equalsIgnoreCase("organizer")) currentUser.setUserRole(UserRoles.USER);

        save(currentUser);
    }

    public void uploadProfilePicture(User currentUser, MultipartFile profilePicture) {
        try {
            String base64EncodedImage = Base64.getEncoder().encodeToString(profilePicture.getBytes());
            currentUser.setProfilePicture(base64EncodedImage);
            save(currentUser);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture", e);
        }
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