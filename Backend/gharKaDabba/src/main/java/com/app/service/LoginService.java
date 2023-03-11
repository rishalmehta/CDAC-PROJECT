package com.app.service;

import com.app.dto.ChangePasswordDto;
import com.app.dto.UserDTO;
import com.app.entities.Login;
import com.app.entities.UserEntity;

public interface LoginService {
	
	Login findByEmail(String email);

	void removeLogin(Login loginDetails);

	UserEntity addLogin(UserDTO user);

	String changePassword(ChangePasswordDto changePasswordDto);
	
	String sendOTP(String email);
	
	boolean validateOTP(String email,int otp);

	String forgotPassword(String email);

	String changeForgottenPassword(ChangePasswordDto changePasswordDto);

	String validateEmail(String email);

	
}
