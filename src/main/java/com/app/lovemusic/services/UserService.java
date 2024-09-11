package com.app.lovemusic.services;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
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
}