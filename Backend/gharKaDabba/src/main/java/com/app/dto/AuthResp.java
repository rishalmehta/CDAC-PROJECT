package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthResp {
	
	private String role;
	
	private String email;
	
	private String firstName;
	
	private Long id;
	
	private String message;
	
	private String jwt;
}
