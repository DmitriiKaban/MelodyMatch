package com.app.lovemusic.controllers;

import com.app.lovemusic.controllers.response.LoginResponse;
import com.app.lovemusic.dtos.LoginUserDto;
import com.app.lovemusic.dtos.RegisterUserDto;
import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.dtos.mappers.UserMapper;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.AuthenticationService;
import com.app.lovemusic.services.GAService;
import com.app.lovemusic.services.JwtService;
import com.app.lovemusic.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.validation.Valid;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;
    private final UserService userService;
    private final GAService gaService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/signup")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) {

        User registeredUser = authenticationService.signup(registerUserDto);
        logger.info("User registered: " + registeredUser.getEmail());

        return ResponseEntity.ok(userMapper.toDto(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {

        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        if (authenticatedUser.isUsing2FA()) {
            logger.info("User requires 2FA: {}", authenticatedUser.getEmail());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"username\": \"" + authenticatedUser.getEmail() + "\", \"2fa_required\": true}");
        }

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());
        logger.info("User logged in: {}", authenticatedUser.getEmail());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/mfa/validate")
    public ResponseEntity<?> validateMfaCode(@RequestParam String username, @RequestParam int code) {

        User user = userService.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String secret = userService.getUserMfaSecret(username);
        String jwtToken = jwtService.generateToken(user);


        if (gaService.isValid(secret, code)) {
            LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

            logger.info("User logged in: {}", user.getEmail());

            return ResponseEntity.ok(loginResponse);
        } else {
            logger.info("Invalid 2FA code for user: {}", user.getEmail());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        }
    }


    @GetMapping("/qr/generate")
    public void generateQR(@RequestParam String username, HttpServletResponse response) {
        // Step 1: Generate a secret key for the user
        String secret = gaService.generateKey();

        // Step 2: Save the secret to the user's account in your database
        userService.updateUserMfaSecret(username, secret);

        // Step 3: Generate a QR code using the secret
        BufferedImage qrImage = gaService.generateQRImage(secret, username);

        if (qrImage != null) {
            try {
                response.setContentType(MediaType.IMAGE_PNG_VALUE);
                OutputStream outputStream = response.getOutputStream();
                ImageIO.write(qrImage, "png", outputStream);
                outputStream.flush();
                outputStream.close();

                logger.info("QR code generated for user: {}", username);

                return;
            } catch (IOException e) {
                logger.error("Error generating QR code", e);
            }
        }
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
}
