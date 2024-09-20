package com.app.lovemusic.dtos;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.accountTypes.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class UserDto {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Profile picture is required")
    private String profilePicture;

    @NotNull(message = "Account type is required")
    private AccountType accountType;

    @NotBlank(message = "User role is required")
    private String userRole;

    @NotNull(message = "Created at date is required")
    private Date createdAt;

    @NotNull(message = "Updated at date is required")
    private Date updatedAt;

    @NotNull(message = "Authentication provider is required")
    private AuthenticationProviders authProvider;

    public String getUsername() {
        return email;
    }

}
