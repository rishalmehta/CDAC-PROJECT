package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderResponseDto {

	private Long id;
	
	private LocalDateTime dateTime;
	
	private long customerId;
	
//	rivate double paymentAmount;
	
	private Long planIds;
	
	private String name;
	
	private double price;
}
