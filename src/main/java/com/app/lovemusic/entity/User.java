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

    @Column(name = "user_role", insertable = false, updatable = false)
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

    public User(String fullName, String email, String password, String profilePicture, PaymentInformation paymentInformation, String userRole, Date createdAt, Date updatedAt, AuthenticationProviders authProvider) {
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

}
