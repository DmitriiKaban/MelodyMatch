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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final MusicianRepository musicianRepository;
    private final OrganizerRepository organizerRepository;
    private final Logger logger = Logger.getLogger(UserService.class.getName());

    @Transactional(readOnly = true)
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User createNewUserAfterOAuthLoginSuccess(String accountType, String email, String name, AuthenticationProviders provider) {
        switch (accountType.toLowerCase()) {
            case "musician":
                Musician musician = new Musician();
                musician.setEmail(email);
                musician.setFullName(name);
                musician.setAuthProvider(provider);
                musician.setCreatedAt(new Date());
                musician.setUserRole(UserRoles.USER);
                musician.setAccountType("musician");
                musician.setSecret(null);
                return saveMusician(musician);

            case "organizer":
                Organizer organizer = new Organizer();
                organizer.setEmail(email);
                organizer.setFullName(name);
                organizer.setAuthProvider(provider);
                organizer.setCreatedAt(new Date());
                organizer.setUserRole(UserRoles.USER);
                organizer.setAccountType("organizer");
                organizer.setSecret(null);
                return saveOrganizer(organizer);

            default: {
                logger.severe("Invalid account type");
                throw new IllegalArgumentException("Invalid account type");
            }
        }
    }

    private User saveOrganizer(Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    private User saveMusician(Musician musician) {
        return musicianRepository.save(musician);
    }

    public void updateUserAfterOAuthLoginSuccess(User user, String name, AuthenticationProviders authenticationProviders) {
        user.setFullName(name);
        user.setAuthProvider(authenticationProviders);
        user.setUpdatedAt(new Date());
        save(user);
    }

    public void updateUserRole(User currentUser, String role) {
        if (role == null) return;

        switch (role.toLowerCase()) {
            case "admin":
                currentUser.setUserRole(UserRoles.ADMIN);
                break;
            case "musician":
            case "organizer":
                currentUser.setUserRole(UserRoles.USER);
                break;
            default:
                throw new IllegalArgumentException("Invalid role");
        }
        save(currentUser);
    }

    public void uploadProfilePicture(User currentUser, MultipartFile profilePicture) {
        try {
            String base64EncodedImage = Base64.getEncoder().encodeToString(profilePicture.getBytes());
            currentUser.setProfilePicture(base64EncodedImage);
            save(currentUser);
        } catch (IOException e) {
            logger.severe("Failed to upload profile picture");
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

    public User save(User user) {
        return userRepository.save(user);
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public void updateUserMfaSecret(String username, String secret) {
        User user = findByEmail(username).get();
        user.setSecret(secret);
        user.setUsing2FA(true);
        update(user);
    }

    @Transactional(readOnly = true)
    public String getUserMfaSecret(String username) {
        Optional<User> userOptional = findByEmail(username);
        if (userOptional.isEmpty()) {
            logger.severe("User not found");
            throw new IllegalArgumentException("User not found");
        }
        return userOptional.get().getSecret();
    }
}
