package com.app.lovemusic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

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

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RatingReview> reviewsAuthored;

    @OneToMany(mappedBy = "target", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RatingReview> reviewsReceived;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false) // Enable insert/update
    private UserRoles userRole;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    private AuthenticationProviders authProvider;

    @Column(name = "account_type")
    private String accountType;

    public User(String fullName, String email, String password, String profilePicture, PaymentInformation paymentInformation, UserRoles userRole, Date createdAt, Date updatedAt, AuthenticationProviders authProvider) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.paymentInformation = paymentInformation;
        this.userRole = userRole;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.authProvider = authProvider;
    }

    public User(String fullName, String email, String password, String profilePicture, PaymentInformation paymentInformation, Date createdAt, Date updatedAt, AuthenticationProviders authProvider) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.paymentInformation = paymentInformation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.authProvider = authProvider;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        HashSet<String> roles = new HashSet<>();

        if (userRole != null) {
            roles.add(userRole.toString());
        }

        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return email;
    }

}
