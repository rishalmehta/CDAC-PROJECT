package com.app.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustSubPlanDto {
	
	private long custId;
	
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	private String planName;
	
	private Long planId;
	
}
