package com.app.lovemusic.services;

import com.app.lovemusic.dtos.PaymentInfoDto;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.entity.accountTypes.MusicianAccountType;
import com.app.lovemusic.entity.accountTypes.OrganizerAccountType;
import com.app.lovemusic.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void createNewUserAfterOAuthLoginSuccess(String email, String name, AuthenticationProviders provider) {

        User user = new User();
        user.setEmail(email);
        user.setFullName(name);
        user.setAuthProvider(provider);
        user.setCreatedAt(new Date());

        user.setUserRole("ROLE_USER");

        userRepository.save(user);
    }

    public void updateUserAfterOAuthLoginSuccess(User user, String name, AuthenticationProviders authenticationProviders) {

        user.setFullName(name);
        user.setAuthProvider(authenticationProviders);
        user.setUpdatedAt(new Date());

        userRepository.save(user);

    }

    public void updateUserRole(User currentUser, String role) {
        currentUser.setUserRole("ROLE_" + role.toUpperCase());
        userRepository.save(currentUser);
    }

    public void updateUserAccountType(User currentUser, String accountType) {
        switch (accountType.toLowerCase()) {
            case "organizer":
                currentUser.setAccountType(new OrganizerAccountType());
                break;
            case "musician":
                currentUser.setAccountType(new MusicianAccountType());
                break;
            default:
                throw new IllegalArgumentException("Invalid account type");
        }
        userRepository.save(currentUser);
    }

    public void uploadProfilePicture(User currentUser, String profilePicture) {
        currentUser.setProfilePicture(profilePicture);
        userRepository.save(currentUser);
    }

    public void updateFullName(User currentUser, String name) {
        currentUser.setFullName(name);
        userRepository.save(currentUser);
    }

    public void updatePaymentInformation(User currentUser, PaymentInfoDto paymentInfoDto) {
        PaymentInformation paymentInformation = new PaymentInformation();

        paymentInformation.setCardNumber(paymentInfoDto.getCardNumber());
        paymentInformation.setCardHolderName(paymentInfoDto.getCardHolderName());
        paymentInformation.setExpirationDate(paymentInfoDto.getExpirationDate());
        paymentInformation.setCvvCode(paymentInfoDto.getCvvCode());
        paymentInformation.setUser(currentUser);

        currentUser.setPaymentInformation(paymentInformation);
        userRepository.save(currentUser);
    }

}