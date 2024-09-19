package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.MusicianRatingReviews;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Table(name = "organizer_accounts")
@Entity
@Data
public class OrganizerAccountType extends AccountType {

    @Column
    private String companyName;

    @Column
    private String companyDescription;

    @Column
    private String companyImage;

    @Column
    @OneToMany(mappedBy = "organizer")
    private List<MusicianRatingReviews> reviews;

}
