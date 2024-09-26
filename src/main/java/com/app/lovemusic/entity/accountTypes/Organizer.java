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
@DiscriminatorValue("ORGANIZER")  // Identifies this subclass in the single table
public class Organizer extends User {

    @Column
    private String companyName;

    @Column
    private String companyDescription;

    @Column
    private String companyImage;

    @OneToMany(mappedBy = "organizer")
    private List<MusicianRatingReview> reviews;
}

