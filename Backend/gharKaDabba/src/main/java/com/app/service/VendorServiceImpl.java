package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.EditUserDetailsDto;
import com.app.dto.SubscriptionPlanDto;
import com.app.dto.VendorDetailsDto;
import com.app.entities.Address;
import com.app.entities.Login;
import com.app.entities.Vendor;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class VendorServiceImpl implements VendorService {

	@Autowired
	private VendorRepository vendorRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private LoginService loginService;

	@Override
	public String approveVendor(long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setVerified(true);
		return "Vendor Approved Successfully";
	}

	@Override
	public List<VendorDetailsDto> getAllVendors() {
		return vendorRepo.getAllAvaliableVendors().stream().map(ven -> mapper.map(ven, VendorDetailsDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public VendorDetailsDto getVendorById(long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return mapper.map(vendor, VendorDetailsDto.class);
	}

	@Override
	public String removeVendor(long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		Login loginDetails = loginService.findByEmail(vendor.getEmail());
		vendorRepo.delete(vendor);
		loginService.removeLogin(loginDetails);
		return "Vendor Deleted Successfully";
	}

	@Override
	public String editVendorDetails(EditUserDetailsDto userDetailsDto) {
		Vendor vendor = vendorRepo.findById(userDetailsDto.getId()).orElseThrow();
		vendor.setFirstName(userDetailsDto.getFirstName());
		vendor.setLastName(userDetailsDto.getLastName());

		if (!vendor.getEmail().equals(userDetailsDto.getEmail())) {
			Login loginDetails = loginService.findByEmail(vendor.getEmail());
			vendor.setEmail(userDetailsDto.getEmail());
			loginDetails.setEmail(userDetailsDto.getEmail());
		}

		vendor.setMobile(userDetailsDto.getMobile());
		return "Customer Details Updated Successfully";
	}

	@Override
	public String uploadImage(Long id, MultipartFile imageFile) throws IOException {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setProfileImage(imageService.uploadImage(imageFile));
		return "Image Uploaded Successfully";
	}

	@Override
	public byte[] getImage(Long id) throws IOException {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return imageService.getImage(vendor.getProfileImage());
	}

	@Override
	public String addAddress(AddressDto addressDto, Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setAddress(mapper.map(addressDto, Address.class));
		return "Address Added Successfully";
	}

	@Override
	public AddressDto getVendorAddress(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return mapper.map(vendor.getAddress(), AddressDto.class);
	}

	@Override
	public String updateAddress(AddressDto addressDto, Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setAddress(mapper.map(addressDto, Address.class));
		return "Address Updated Successfully";
	}

	@Override
	public String blockVendor(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setBlocked(true);
		return "Vendor Blocked Successfully";
	}

	@Override
	public String unblockVendor(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		vendor.setBlocked(false);
		return "Vendor Unblocked Successfully";
	}

	@Override
	public List<VendorDetailsDto> getAllBlockedVendors() {
		return vendorRepo.getAllBlockedVendors().stream().map(v -> mapper.map(v, VendorDetailsDto.class))
				.collect(Collectors.toList());

	}

	@Override
	public List<VendorDetailsDto> getAllVerifiedVendors() {
		return vendorRepo.getAllVerifiedVendors().stream().map(v -> mapper.map(v, VendorDetailsDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<VendorDetailsDto> getUnAllVerifiedVendors() {
		return vendorRepo.getAllUnVerifiedVendors().stream().map(v -> mapper.map(v, VendorDetailsDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public VendorDetailsDto getByEmail(String email) {
		Vendor vendor = vendorRepo.getByEmail(email).orElseThrow();
		return mapper.map(vendor, VendorDetailsDto.class);
	}

	@Override
	public List<SubscriptionPlanDto> getAllAvaliablePlansByVId(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return vendor.getPlans().stream().filter(p -> p.isAvaliable() == true)
				.map(plan -> mapper.map(plan, SubscriptionPlanDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<SubscriptionPlanDto> getAllPlansByVId(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return vendor.getPlans().stream().map(plan -> mapper.map(plan, SubscriptionPlanDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<SubscriptionPlanDto> getAllDisabledPlansByVId(Long id) {
		Vendor vendor = vendorRepo.findById(id).orElseThrow();
		return vendor.getPlans().stream().filter(p -> p.isAvaliable() == false)
				.map(plan -> mapper.map(plan, SubscriptionPlanDto.class)).collect(Collectors.toList());
	}

}
