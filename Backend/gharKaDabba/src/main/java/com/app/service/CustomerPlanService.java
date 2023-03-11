package com.app.service;

import java.util.List;

import com.app.dto.CustomerPlanDto;

public interface CustomerPlanService {


	List<CustomerPlanDto> getAllCustomerPlans();

	CustomerPlanDto getCustomerPlanById(long id);

	String removeCustomerPlanDto(long id);

	String editCustomerPlanDetails(CustomerPlanDto CustomerPlanDto);
	
	CustomerPlanDto getCustomerPlanBySubscriptionId(long id);

}
