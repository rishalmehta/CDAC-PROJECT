package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
