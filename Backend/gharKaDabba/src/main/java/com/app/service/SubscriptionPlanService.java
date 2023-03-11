package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CustomerPlanDto;
import com.app.dto.SubscriptionPlanDto;
import com.app.entities.Tiffin;

public interface SubscriptionPlanService {

	SubscriptionPlanDto addNewSubscriptionPlan(SubscriptionPlanDto SubscriptionPlanDto, Long vendorId);

	List<SubscriptionPlanDto> getAllSubscriptionPlans();

	SubscriptionPlanDto getSubscriptionPlanById(long id);

	String editSubscriptionDetails(SubscriptionPlanDto SubscriptionPlanDto);

	String deactivatePlanById(long id);

	String activatePlanById(long id);

	List<SubscriptionPlanDto> getAllAvaliablePlans();
	
	List<SubscriptionPlanDto> getAllNotAvaliablePlans();

	String uploadImage(Long id, MultipartFile image) throws IOException;

	byte[] getImage(Long id) throws IOException;

	List<Tiffin> getTiffinsBySubcriptionPlanId(Long id);

	List<CustomerPlanDto> getAllCustomerSubscribedToSubPlanId(Long id);

}
