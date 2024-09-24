package com.app.lovemusic.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddressDto {

    @NotBlank(message = "Street cannot be empty")
    private String street;

    @NotBlank(message = "City cannot be empty")
    private String city;

    @NotBlank(message = "State cannot be empty")
    private String state;

    @NotBlank(message = "Postal code cannot be empty")
    private String postalCode;

    @NotBlank(message = "Country cannot be empty")
    private String country;

}
