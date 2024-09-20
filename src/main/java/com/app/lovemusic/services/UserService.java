package com.app.lovemusic.services;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.Musician;
import com.app.lovemusic.entity.accountTypes.Organizer;
import com.app.lovemusic.repositories.MusicianRepository;
import com.app.lovemusic.repositories.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final MusicianRepository musicianRepository;
    private final OrganizerRepository organizerRepository;

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        musicianRepository.findAll().forEach(users::add);
        organizerRepository.findAll().forEach(users::add);

        return users;
    }

    public User findByEmail(String email) {
        User user = musicianRepository.findByEmail(email).orElse(null);
        if(user == null) user = organizerRepository.findByEmail(email).orElse(null);

        return user;
    }

    public User findById(Integer id) {
        User user = musicianRepository.findById(id).orElse(null);
        if(user == null) user = organizerRepository.findById(id).orElse(null);

        return user;
    }

    public void createNewUserAfterOAuthLoginSuccess(String accountType, String email, String name, AuthenticationProviders provider) {
        User user = switch (accountType.toLowerCase()) {
            case "musician" -> new Musician();
            case "organizer" -> new Organizer();
            default -> throw new IllegalArgumentException("Invalid account type");
        };

        user.setEmail(email);
        user.setFullName(name);
        user.setAuthProvider(provider);
        user.setCreatedAt(new Date());

        user.setUserRole("ROLE_USER");

        if(user instanceof Musician) musicianRepository.save(user);
        else organizerRepository.save(user);
    }

    public void updateUserAfterOAuthLoginSuccess(User user, String name, AuthenticationProviders authenticationProviders) {
        user.setFullName(name);
        user.setAuthProvider(authenticationProviders);
        user.setUpdatedAt(new Date());

        if (user instanceof Musician) musicianRepository.save(user);
        else organizerRepository.save(user);
    }

    public void updateUserRole(User currentUser, String role) {
        currentUser.setUserRole("ROLE_" + role.toUpperCase());
        if(currentUser instanceof Musician) musicianRepository.save((Musician) currentUser);
        else organizerRepository.save((Organizer) currentUser);
    }

    public void uploadProfilePicture(User currentUser, String profilePicture) {
        currentUser.setProfilePicture(profilePicture);
        if(currentUser instanceof Musician) musicianRepository.save((Musician) currentUser);
        else organizerRepository.save((Organizer) currentUser);
    }

    public void updateFullName(User currentUser, String name) {
        currentUser.setFullName(name);
        if(currentUser instanceof Musician) musicianRepository.save((Musician) currentUser);
        else organizerRepository.save((Organizer) currentUser);
    }

    public void updatePaymentInformation(User currentUser, PaymentInfoDto paymentInfoDto) {
        PaymentInformation paymentInformation = new PaymentInformation();

        paymentInformation.setCardNumber(paymentInfoDto.getCardNumber());
        paymentInformation.setCardHolderName(paymentInfoDto.getCardHolderName());
        paymentInformation.setExpirationDate(paymentInfoDto.getExpirationDate());
        paymentInformation.setCvvCode(paymentInfoDto.getCvvCode());
        paymentInformation.setUser(currentUser);

        currentUser.setPaymentInformation(paymentInformation);

        if(currentUser instanceof Musician) musicianRepository.save((Musician) currentUser);
        else organizerRepository.save((Organizer) currentUser);
    }

}