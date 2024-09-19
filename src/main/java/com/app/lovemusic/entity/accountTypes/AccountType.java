package com.app.lovemusic.entity.accountTypes;

import com.app.lovemusic.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class AccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @OneToOne(mappedBy = "accountType")
    private User user;

}
