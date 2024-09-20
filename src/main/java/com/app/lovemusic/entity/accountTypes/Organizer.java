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

@EqualsAndHashCode(callSuper = true)
@Table(name = "organizer_accounts")
@Entity
@Data
@NoArgsConstructor
public class Organizer extends User {

    @Column
    private String companyName;

    @Column
    private String companyDescription;

    @Column
    private String companyImage;

    @Column
    @OneToMany(mappedBy = "organizer")
    private List<MusicianRatingReview> reviews;

    public Organizer(String fullName, String email, String password, String profilePicture, PaymentInformation paymentInformation, String userRole, Date createdAt, Date updatedAt, AuthenticationProviders authProvider, String companyName, String companyDescription, String companyImage, List<MusicianRatingReview> reviews) {
        super(fullName, email, password, profilePicture, paymentInformation, userRole, createdAt, updatedAt, authProvider);
        this.companyName = companyName;
        this.companyDescription = companyDescription;
        this.companyImage = companyImage;
        this.reviews = reviews;
    }
}
