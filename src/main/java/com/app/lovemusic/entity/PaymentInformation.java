package com.app.lovemusic.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "payment_information")
@Entity
@Data
public class PaymentInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @OneToOne(mappedBy = "paymentInformation")
    private User user;

    @Column(nullable = false)
    private Long cardNumber;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private Integer cvvCode;

}
