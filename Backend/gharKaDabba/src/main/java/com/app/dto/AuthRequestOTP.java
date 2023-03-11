package com.app.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequestOTP {

	@NotBlank(message = "Email can't be blank or null")
	private String email;

	@NotBlank(message = "OTP can't be blank or null")
	private int OTP;
}
