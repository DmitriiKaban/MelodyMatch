package com.app.lovemusic.security;

import com.app.lovemusic.controllers.response.LoginResponse;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.GitHubEmailService;
import com.app.lovemusic.services.JwtService;
import com.app.lovemusic.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;
    private final GitHubEmailService gitHubEmailService;

    @Value("${github.access-token}")
    private String accessToken;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getEmail();
        String name = oAuth2User.getName();

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String registrationId = oauthToken.getAuthorizedClientRegistrationId();

        String provider = "GOOGLE";
        if ("github".equals(registrationId)) {
            email = gitHubEmailService.getGitHubEmail(accessToken);
            if (email == null) {
                throw new RuntimeException("Failed to fetch emails from GitHub");
            }
            provider = "GITHUB";
        } else if ("facebook".equals(registrationId)) {
            provider = "FACEBOOK";
        }

        // Check if the user already exists
        Optional<User> user = userService.findByEmail(email);
        System.out.println("User: " + user);

        if (user.isEmpty()) {
            String redirectUrl = encodeUrl(email, name, provider);
            response.sendRedirect(redirectUrl);

        } else {
            String jwtToken = jwtService.generateToken(user.get());
            LoginResponse loginResponse = new LoginResponse()
                    .setToken(jwtToken)
                    .setExpiresIn(jwtService.getExpirationTime());

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));
        }
    }

    private String encodeUrl(String email, String name, String provider) throws UnsupportedEncodingException {
        String baseUrl = "/select-account-type";
        String encodedEmail = URLEncoder.encode(email, "UTF-8");
        String encodedName = URLEncoder.encode(name, "UTF-8");  // This encodes non-ASCII characters
        String encodedProvider = URLEncoder.encode(provider, "UTF-8");

        return String.format("%s?email=%s&name=%s&provider=%s", baseUrl, encodedEmail, encodedName, encodedProvider);
    }
}


