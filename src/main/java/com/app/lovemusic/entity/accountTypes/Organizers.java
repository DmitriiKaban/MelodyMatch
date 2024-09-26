package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Organizers extends User {

    @Column
    private String companyName;

    @Column
    private String companyDescription;

    @Column
    private String companyImage;

    public Organizers(String fullName, String email, String password, String profilePicture,
                      PaymentInformation paymentInformation, Date createdAt, Date updatedAt,
                      AuthenticationProviders authProvider, String companyName,
                      String companyDescription, String companyImage) {
        super(fullName, email, password, profilePicture, paymentInformation, createdAt, updatedAt, authProvider);
        this.companyName = companyName;
        this.companyDescription = companyDescription;
        this.companyImage = companyImage;
    }
}


