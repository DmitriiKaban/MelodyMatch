package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.AuthenticationProviders;
import com.app.lovemusic.entity.MusicianRatingReview;
import com.app.lovemusic.entity.PaymentInformation;
import com.app.lovemusic.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@DiscriminatorValue("MUSICIAN")
public class Musician extends User {

    @Column
    private String resume;

    @Column
    private String workExperience;

    @OneToMany(mappedBy = "musician")
    private List<MusicianRatingReview> reviews;

    public Musician(String fullName, String email, String password, String profilePicture, PaymentInformation paymentInformation, String userRole, Date createdAt, Date updatedAt, AuthenticationProviders authProvider, String resume, String workExperience, List<MusicianRatingReview> reviews) {
        super(fullName, email, password, profilePicture, paymentInformation, userRole, createdAt, updatedAt, authProvider);
        this.resume = resume;
        this.workExperience = workExperience;
        this.reviews = reviews;
    }
}

