package com.app.lovemusic.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentInfoDto {

    @NotNull(message = "Card number is required.")
    private Long cardNumber;

    @NotBlank(message = "Card holder name is required.")
    private String cardHolderName;

    @NotBlank(message = "Expiration date is required.")
    private String expirationDate;

    @NotNull(message = "CVV code is required.")
    private Integer cvvCode;

}
