package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {

	Optional<Login> findByEmail(String email);

}
