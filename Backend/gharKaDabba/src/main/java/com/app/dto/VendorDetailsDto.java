package com.app.dto;

import com.app.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorDetailsDto {

	private Long id;

	private String firstName;

	private String lastName;

	private String email;

	private String mobile;

	private Address address;

}
