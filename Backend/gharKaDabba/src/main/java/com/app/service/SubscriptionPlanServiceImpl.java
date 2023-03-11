package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CustomerPlanDto;
import com.app.dto.SubscriptionPlanDto;
import com.app.entities.Address;
import com.app.entities.SubscriptionPlan;
import com.app.entities.Tiffin;
import com.app.entities.Vendor;
import com.app.repository.SubscriptionPlanRepository;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

	@Autowired
	private VendorRepository vendorRepo;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private SubscriptionPlanRepository subscriptionRepo;

	// add new subscription plan
	@Override
	public SubscriptionPlanDto addNewSubscriptionPlan(SubscriptionPlanDto SubscriptionPlanDto, Long vednorId) {
		Vendor vendor = vendorRepo.findById(vednorId).orElseThrow();
		SubscriptionPlan newSubscriptionPlan = mapper.map(SubscriptionPlanDto, SubscriptionPlan.class);
		newSubscriptionPlan.setAvaliable(true);
		newSubscriptionPlan.setVendor(vendor);
		newSubscriptionPlan = subscriptionRepo.save(newSubscriptionPlan);
		return mapper.map(newSubscriptionPlan,SubscriptionPlanDto.class);
	}

	// get all subscription plans
	@Override
	public List<SubscriptionPlanDto> getAllSubscriptionPlans() {
		return subscriptionRepo.findAll().stream().map(subsc -> mapper.map(subsc, SubscriptionPlanDto.class))
				.collect(Collectors.toList());
	}

	// get individual subscription plan
	@Override
	public SubscriptionPlanDto getSubscriptionPlanById(long id) {
		SubscriptionPlan subscriptionplan = subscriptionRepo.findById(id).orElseThrow();
		return mapper.map(subscriptionplan, SubscriptionPlanDto.class);
	}

	// edit an subscription plan
	@Override
	public String editSubscriptionDetails(SubscriptionPlanDto SubscriptionPlanDto) {
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(SubscriptionPlanDto.getId()).orElseThrow();
		subscriptionPlan.setDescription(SubscriptionPlanDto.getDescription());
		subscriptionPlan.setName(SubscriptionPlanDto.getName());
		subscriptionPlan.setPlanType(SubscriptionPlanDto.getPlanType());
//		subscriptionPlan.setTiffins(SubscriptionPlanDto.getTiffins());
		subscriptionPlan.setPrice(SubscriptionPlanDto.getPrice());
		return "Subscription Plan Updated Successfully!";
	}

	@Override
	public String deactivatePlanById(long id) {
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(id).orElseThrow();
		subscriptionPlan.setAvaliable(false);
		return "Subscription Plan with id " + subscriptionPlan.getId() + " is not avaliable anymore";
	}

	@Override
	public String activatePlanById(long id) {
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(id).orElseThrow();
		subscriptionPlan.setAvaliable(true);
		return "Subscription Plan with id " + subscriptionPlan.getId() + " is now avaliable";
	}

	@Override
	public List<SubscriptionPlanDto> getAllAvaliablePlans() {
		return subscriptionRepo.getAllAvaliablePlans().stream().map(sp -> mapper.map(sp, SubscriptionPlanDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<SubscriptionPlanDto> getAllNotAvaliablePlans() {
		return subscriptionRepo.getAllNotAvaliablePlans().stream().map(sp -> mapper.map(sp, SubscriptionPlanDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public String uploadImage(Long id, MultipartFile image) throws IOException {
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(id).orElseThrow();
		subscriptionPlan.setImage(imageService.uploadImage(image));
		return "Image Uploaded Successfully";
	}

	@Override
	public byte[] getImage(Long id) throws IOException {
		SubscriptionPlan subscriptionPlan= subscriptionRepo.findById(id).orElseThrow();
		return imageService.getImage(subscriptionPlan.getImage());
	}

	@Override
	public List<Tiffin> getTiffinsBySubcriptionPlanId(Long id) {
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(id).orElseThrow();
		return subscriptionPlan.getTiffins().stream().collect(Collectors.toList());
	}
	
	@Override
	public List<CustomerPlanDto> getAllCustomerSubscribedToSubPlanId(Long id){
		SubscriptionPlan subscriptionPlan = subscriptionRepo.findById(id).orElseThrow();
		List<CustomerPlanDto> customerDetails = new ArrayList<CustomerPlanDto>(); 
		subscriptionPlan.getPlans().stream().forEach(cp->{
			CustomerPlanDto customerPlanDto=new CustomerPlanDto();
			customerPlanDto=mapper.map(cp,CustomerPlanDto.class);
			customerPlanDto.setCustFirstName(cp.getCustomer().getFirstName());
			customerPlanDto.setCustLastName(cp.getCustomer().getLastName());
			customerPlanDto.setCustId(cp.getCustomer().getId());
			Address address = cp.getCustomer().getDeliveryAddress();
			customerPlanDto.setCity(address.getCity());
			customerPlanDto.setLine1(address.getLine1());
			customerPlanDto.setLine2(address.getLine2());
			customerPlanDto.setPincode(address.getPincode());
			customerPlanDto.setState(address.getState());
			customerDetails.add(customerPlanDto);
		});
		
		return customerDetails;
	}
	
	



	
}
