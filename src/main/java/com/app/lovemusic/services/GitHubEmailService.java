package com.app.lovemusic.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GitHubEmailService {

    private static final String GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

    private final RestTemplate restTemplate;

    public String getGitHubEmail(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        String email = null;

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> responseGit = restTemplate.exchange(GITHUB_EMAILS_URL, HttpMethod.GET, entity, String.class);

        if (responseGit.getStatusCode() == HttpStatus.OK) {

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode;
            try {
                rootNode = objectMapper.readTree(responseGit.getBody());
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            for (JsonNode node : rootNode) {
                if (node.get("primary").asBoolean()) {
                    email = node.get("email").asText();
                    break;
                }
            }

        } else {
            System.out.println("Failed to fetch emails from GitHub");
        }

        return email;
    }
}

