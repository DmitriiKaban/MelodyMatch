package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.MusicianRatingReview;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Table(name = "musician_accounts")
@Entity
@Data
public class MusicianAccountType extends AccountType {

    @Column
    private String resume;

    @Column
    private String workExperience;

    @Column
    @OneToMany(mappedBy = "musician")
    private List<MusicianRatingReview> reviews;

}
