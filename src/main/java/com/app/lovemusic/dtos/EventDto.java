package com.app.lovemusic.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventDto {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotNull(message = "Date cannot be null")
    private LocalDateTime date;

    @NotBlank(message = "Address cannot be empty")
    private AddressDto address;

}
