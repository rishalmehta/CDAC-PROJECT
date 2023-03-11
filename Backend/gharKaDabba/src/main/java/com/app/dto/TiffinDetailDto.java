package com.app.dto;

import com.app.enums.FoodType;
import com.app.enums.WeekDayAndTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TiffinDetailDto {
	
	private String Name;

	private double price;
	
	private String description;
	
	private FoodType foodType;
	
	private WeekDayAndTime day;
	
	private String ImagePath;

}
