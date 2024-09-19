package com.app.lovemusic.entity;

import com.app.lovemusic.entity.accountTypes.AccountType;
import com.app.lovemusic.entity.accountTypes.MusicianAccountType;
import com.app.lovemusic.entity.accountTypes.OrganizerAccountType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

@Table(name = "users")
@Entity
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String fullName;

    @Setter
    @Column(unique = true, length = 50, nullable = false)
    private String email;

    @Column
    private String password;

    @Column
    private String profilePicture;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private PaymentInformation paymentInformation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AccountType accountType;

    @Column
    private String userRole;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    private AuthenticationProviders authProvider;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        HashSet<String> roles = new HashSet<>();

        if (userRole != null && !userRole.trim().isEmpty()) {
            roles.add(userRole);
        }

        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return email;
    }

    public boolean isMusician() {
        return accountType instanceof MusicianAccountType;
    }

    public boolean isOrganizer() {
        return accountType instanceof OrganizerAccountType;
    }
}
