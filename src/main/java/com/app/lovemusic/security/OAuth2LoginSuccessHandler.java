package com.app.lovemusic.security;

import com.app.lovemusic.controllers.response.LoginResponse;
import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.JwtService;
import com.app.lovemusic.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getEmail();

        System.out.println("email: " + email);

        User user = userService.findByEmail(email);
        String name = oAuth2User.getName();

        if (user == null) {
            userService.createNewUserAfterOAuthLoginSuccess(email, name, AuthenticationProviders.GOOGLE);
        } else {
            userService.updateUserAfterOAuthLoginSuccess(user, name, AuthenticationProviders.GOOGLE);
        }

        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));
    }
}
