package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
