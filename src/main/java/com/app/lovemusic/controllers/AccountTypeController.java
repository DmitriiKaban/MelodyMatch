package com.app.lovemusic.controllers;

import com.app.lovemusic.controllers.response.LoginResponse;
import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.JwtService;
import com.app.lovemusic.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class AccountTypeController {

    private final UserService userService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(AccountTypeController.class);

    @GetMapping("/account")
    public String selectAccountType(Model model, @RequestParam String email, @RequestParam String name, @RequestParam String provider) {
        model.addAttribute("email", email);
        model.addAttribute("name", name);
        model.addAttribute("provider", provider);

        return "accountTypeForm";
    }

    @PostMapping("/save-account-type")
    public void saveAccountType(
            HttpServletResponse response,
            @RequestParam String accountType,
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String provider) throws IOException {

        AuthenticationProviders authProvider = switch (provider) {
            case "GOOGLE" -> AuthenticationProviders.GOOGLE;
            case "GITHUB" -> AuthenticationProviders.GITHUB;
            case "FACEBOOK" -> AuthenticationProviders.FACEBOOK;
            default -> throw new IllegalArgumentException("Invalid provider");
        };

        User user = userService.createNewUserAfterOAuthLoginSuccess(accountType, email, name, authProvider);

        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());

        logger.info("User " + email + " created with account type " + accountType);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));
    }
}
