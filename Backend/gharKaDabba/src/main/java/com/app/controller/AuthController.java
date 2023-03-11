package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.AuthRequestOTP;
import com.app.dto.AuthResp;
import com.app.dto.ChangePasswordDto;
import com.app.dto.CustDetailsDto;
import com.app.dto.UserDTO;
import com.app.dto.VendorDetailsDto;
import com.app.entities.Login;
import com.app.enums.UserRole;
import com.app.security.jwt_utils.JwtUtils;
import com.app.service.CustomerService;
import com.app.service.LoginService;
import com.app.service.VendorService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@Slf4j
public class AuthController {

	// Injecting Dependencies
	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private VendorService vendorService;

	// add a method to authenticate user . In case of success --send back token ,
	// in case of failure send back err message
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) {

		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		
		System.out.println(request);
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());

		log.info("auth token " + authToken);

		// authenticate the credentials
		Authentication authenticatedDetails = manager.authenticate(authToken);
		log.info("auth token again " + authenticatedDetails);
		// => auth succcess
		Login login = loginService.findByEmail(request.getEmail());
		if(login.getUserRole()==UserRole.ROLE_CUSTOMER) {
			 CustDetailsDto customer = customerService.getByEmail(request.getEmail());
			return ResponseEntity.ok(new AuthResp("ROLE_CUSTOMER",customer.getEmail(),customer.getFirstName(),customer.getId(),"Auth successful!", utils.generateJwtToken(authenticatedDetails)));
		}
		if(login.getUserRole()==UserRole.ROLE_VENDOR) {
			VendorDetailsDto vendor = vendorService.getByEmail(request.getEmail());
			return ResponseEntity.ok(new AuthResp("ROLE_VENDOR",vendor.getEmail(),vendor.getFirstName(),vendor.getId(),"Auth successful!", utils.generateJwtToken(authenticatedDetails)));
		}
		return ResponseEntity.ok(new AuthResp("ROLE_ADMIN",request.getEmail(),"admin",(long)0,"Auth successful!", utils.generateJwtToken(authenticatedDetails)));
	}

	// add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserDTO user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.addLogin(user));

	}

	// method to update password
	@PostMapping("/updatepassword")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.changePassword(changePasswordDto));
	}

	// method to generateOTP
	@PostMapping("/validateEmail")
	public ResponseEntity<?> validateEmail(@RequestBody ChangePasswordDto changePasswordDto) {
		System.out.println(changePasswordDto.getEmail());
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.validateEmail(changePasswordDto.getEmail()));
	}

	@PostMapping("/verifyOtp")
	public ResponseEntity<?> verifyOtp(@RequestBody AuthRequestOTP requestOTP) {
		String str;
		if (loginService.validateOTP(requestOTP.getEmail(), requestOTP.getOTP())) {
			str = "Email Validated Successfully";
		} else
			str = "Invalid OTP";
		return ResponseEntity.status(HttpStatus.CREATED).body(str);
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<?> forgotPassword(@RequestBody ChangePasswordDto changePasswordDto) {
		System.out.println("email "+changePasswordDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.forgotPassword(changePasswordDto.getEmail()));
	}
	
	@PostMapping("/changeForgottenPassword")
	public ResponseEntity<?> changeForgottenPassword(@RequestBody ChangePasswordDto changePasswordDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.changeForgottenPassword(changePasswordDto));
	}
}
