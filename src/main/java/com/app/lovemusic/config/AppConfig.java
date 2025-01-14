package com.app.lovemusic.config;

import com.app.lovemusic.services.MusicianService;
import com.app.lovemusic.services.OrganizerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AppConfig {

    private final MusicianService musicianService;
    private final OrganizerService organizerService;

    @Bean
    UserDetailsService userDetailsService() {
        return username -> musicianService.findByEmail(username) == null ? organizerService.findByEmail(username) : musicianService.findByEmail(username);
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public RestTemplate restTemplateBean() {
        return new RestTemplate();
    }
}
