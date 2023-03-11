package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.CustDetailsDto;
import com.app.dto.CustSubPlanDto;
import com.app.dto.EditUserDetailsDto;
import com.app.dto.SubscriptionPlanDto;
import com.app.entities.Address;
import com.app.entities.Customer;
import com.app.entities.Login;
import com.app.repository.CustomerRepository;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private LoginService loginService;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<CustDetailsDto> getAllCustomers() {
		List<CustDetailsDto> details = customerRepo.findAll().stream()
				.map(cust -> mapper.map(cust, CustDetailsDto.class)).collect(Collectors.toList());
		return details;
	}

	@Override
	public CustDetailsDto getCustomerById(long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		return mapper.map(customer, CustDetailsDto.class);
	}

	@Override
	public String removeCustomer(long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		Login loginDetails = loginService.findByEmail(customer.getEmail());
		customerRepo.delete(customer);
		loginService.removeLogin(loginDetails);
		return "Customer Deleted Successfully";
	}

	@Override
	public String editCustomerDetails(EditUserDetailsDto userDetailsDto) {
		Customer customer = customerRepo.findById(userDetailsDto.getId()).orElseThrow();
		customer.setFirstName(userDetailsDto.getFirstName());
		customer.setLastName(userDetailsDto.getLastName());

		if (!customer.getEmail().equals(userDetailsDto.getEmail())) {
			Login loginDetails = loginService.findByEmail(customer.getEmail());
			customer.setEmail(userDetailsDto.getEmail());
			loginDetails.setEmail(userDetailsDto.getEmail());
		}
		customer.setMobile(userDetailsDto.getMobile());

		return "Customer Details Updated Successfully";
	}

	// customer want to upload his/her profile pic
	@Override
	public String uploadImage(Long id, MultipartFile imageFile) throws IOException {
		Customer customer = customerRepo.findById(id).orElseThrow();
		customer.setProfileImage(imageService.uploadImage(imageFile));
		return "Image Uploaded Successfully";
	}

	// get the image path from server side
	@Override
	public byte[] getImage(Long id) throws IOException {
		Customer customer = customerRepo.findById(id).orElseThrow();
		return imageService.getImage(customer.getProfileImage());
	}

	@Override
	public String addDeliveryAddress(AddressDto address, Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		customer.setDeliveryAddress(mapper.map(address, Address.class));
		return "Address Added Successfully";
	}

	@Override
	public AddressDto getDeliveryAddress(Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		return mapper.map(customer.getDeliveryAddress(), AddressDto.class);

	}

	@Override
	public String updateDeliveryAddress(AddressDto addressDto, Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		customer.setDeliveryAddress(mapper.map(addressDto, Address.class));
		return "Address Updated Successfully";
	}

	@Override
	public List<SubscriptionPlanDto> getSubscriptionPlans(Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		return customer.getPlans().stream().map(plan -> mapper.map(plan, SubscriptionPlanDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public CustDetailsDto getByEmail(String email) {
		Customer customer = customerRepo.findByEmail(email).orElseThrow();
		System.out.println(customer);
		return mapper.map(customer, CustDetailsDto.class);
	}

	@Override
	public List<CustSubPlanDto> getAllOngoingSubPlan(Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow();
		List<CustSubPlanDto> planDtos = new ArrayList<CustSubPlanDto>();
		customer.getPlans().forEach(p -> {
			CustSubPlanDto dto = new CustSubPlanDto();
			dto.setCustId(id);
			dto.setStartDate(p.getStartDate());
			dto.setEndDate(p.getEndDate());
			dto.setPlanId(p.getSubscriptionPlan().getId());
			dto.setPlanName(p.getSubscriptionPlan().getName());
			planDtos.add(dto);
		});
		LocalDate d = LocalDate.now();
		return planDtos
				.stream().filter(p -> p.getEndDate().isAfter(d) || p.getStartDate().isBefore(d))
				.collect(Collectors.toList());
	}

}
