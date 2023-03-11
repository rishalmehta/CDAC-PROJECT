package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CustomerPlanDto {
	
	private Long id;

	private LocalDate startDate;
	
	private LocalDate endDate;

	private long custId;
	
	private String custFirstName;
	
	private String custLastName;
	
	private String Line1;

	private String Line2;

	private String city;

	private int pincode;

	private String state;

}
