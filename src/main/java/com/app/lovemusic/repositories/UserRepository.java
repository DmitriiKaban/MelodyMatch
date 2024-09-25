package com.app.lovemusic.repositories;

import com.app.lovemusic.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository { //extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    List<User> findAll();
}
