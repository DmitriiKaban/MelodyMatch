package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.MusicianRatingReview;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Musicians extends User {

    @Column
    private String resume;

    @Column
    private String workExperience;


    @OneToMany(mappedBy = "musicians")
    private List<MusicianRatingReview> reviews;

    public Musicians(String fullName, String email, String password, String profilePicture,
                     PaymentInformation paymentInformation, Date createdAt, Date updatedAt,
                     AuthenticationProviders authProvider, String resume, String workExperience) {
        super(fullName, email, password, profilePicture, paymentInformation, createdAt, updatedAt, authProvider);
        this.resume = resume;
        this.workExperience = workExperience;
    }
}


