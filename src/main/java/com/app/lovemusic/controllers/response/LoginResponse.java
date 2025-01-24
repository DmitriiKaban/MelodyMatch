package com.app.lovemusic.controllers.response;

import com.app.lovemusic.dtos.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private long expiresIn;
    private UserDto userDetails;


    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public LoginResponse setUserDetails(UserDto userDetails) {
        this.userDetails = userDetails;
        return this;
    }
}
