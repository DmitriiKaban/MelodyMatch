package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.UserDto;
import com.app.lovemusic.entity.User;
import com.app.lovemusic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final UserService userService;

    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setAuthProvider(user.getAuthProvider());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setUserRole(user.getUserRole());

        return userDto;
    }

    public List<UserDto> toDtoList(List<User> users) {
        return List.of(users.stream().map(this::toDto).toArray(UserDto[]::new));
    }

//    public User toUser(UserDto userDto) {
//        User user = new User();
//        user.setEmail(userDto.getEmail());
//        user.setFullName(userDto.getFullName());
//        user.setAuthProvider(userDto.getAuthProvider());
//        user.setCreatedAt(userDto.getCreatedAt());
//        user.setUpdatedAt(userDto.getUpdatedAt());
//        user.setUserRole(userDto.getUserRole());
//
//        return user;
//    }

//    public List<User> toUserList(List<UserDto> userDtos) {
//        return List.of(userDtos.stream().map(this::toUser).toArray(User[]::new));
//    }

}
