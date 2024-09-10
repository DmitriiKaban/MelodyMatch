package com.app.lovemusic.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginUserDto {

    @NotBlank(message = "Email is required.")
    @Email(message = "The email address is invalid.", flags = { Pattern.Flag.CASE_INSENSITIVE })
    private String email;

    @NotBlank(message = "Password is required.")
    private String password;
}
