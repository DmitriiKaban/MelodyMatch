package com.app.lovemusic.controllers;

import com.app.lovemusic.controllers.response.LoginResponse;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.JwtService;
import com.app.lovemusic.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
    private final UserMapper userMapper;

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

//        System.out.println("New user: " + user);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime())
                .setUserDetails(userMapper.toDto(currentUser));

        // Return the token in the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));
    }
}
