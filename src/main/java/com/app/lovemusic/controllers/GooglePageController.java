package com.app.lovemusic.controllers;

import com.app.lovemusic.services.GoogleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
public class GooglePageController {

    private final GoogleService googleService;

    @Value("${google.clientId}")
    private String clientId;


    @GetMapping("/google/login")
    public ResponseEntity<String> authenticatedUser() {
        String redirectUri = "http://localhost:8081/grantcode";
        String googleLoginUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirectUri
                + "&response_type=code&client_id=" + clientId
                + "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline";
        return ResponseEntity.ok(googleLoginUrl);
    }


    @RestController
    public class LoginController {
        @GetMapping("/grantcode")
        public String grantCode(@RequestParam("code") String code, @RequestParam("scope") String scope, @RequestParam("authuser") String authUser, @RequestParam("prompt") String prompt) {
            return googleService.processGrantCode(code);
        }
    }


}
