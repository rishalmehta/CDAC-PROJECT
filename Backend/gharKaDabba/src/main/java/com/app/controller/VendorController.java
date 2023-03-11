package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.EditUserDetailsDto;
import com.app.service.VendorService;

@RestController
@CrossOrigin
@RequestMapping("/vendors")
public class VendorController {

	@Autowired
	private VendorService vendorService;

	// REST end point to delete user
	// url : http://localhost:8080/vendors/id
//	@DeleteMapping("/{id}")
//	public ResponseEntity<?> removeUser(@PathVariable long id) {
//		return new ResponseEntity<>(vendorService.removeVendor(id), HttpStatus.OK);
//	}

	// REST end point to update user details
	// url : http://localhost:8080/vendors
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody EditUserDetailsDto userDetailsDto) {
		return new ResponseEntity<>(vendorService.editVendorDetails(userDetailsDto), HttpStatus.OK);
	}

	// REST end point to upload image
	// url : http://localhost:8080/vendors/id/image
	@CrossOrigin
	@PostMapping(value = "/{id}/profileImage", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile profileImage, @PathVariable Long id)
			throws IOException {
		return new ResponseEntity<>(vendorService.uploadImage(id, profileImage), HttpStatus.CREATED);

	}

	// REST end point to download image
	// url : http://localhost:8080/vendors/id/image
	// REST end point to download/serve image
	@GetMapping(value = "/{id}/profileImage", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> serveImageFromServerSideFolder(@PathVariable Long id) throws IOException {

		return new ResponseEntity<>(vendorService.getImage(id), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{id}/approve")
	public ResponseEntity<?> approveVendor(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.approveVendor(id), HttpStatus.OK);

	}

	
	@GetMapping("/allvendors")
	public ResponseEntity<?> getAllVendors() {
		return new ResponseEntity<>(vendorService.getAllVendors(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getVendorById(@PathVariable long id) {
		return new ResponseEntity<>(vendorService.getVendorById(id), HttpStatus.OK);
	}

	@PostMapping("/{id}/addaddress")
	public ResponseEntity<?> addAddress(@RequestBody AddressDto address, @PathVariable Long id) {
		return new ResponseEntity<>(vendorService.addAddress(address, id), HttpStatus.OK);
	}

	@GetMapping("/{id}/addresses")
	public ResponseEntity<?> getVendorAddress(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.getVendorAddress(id), HttpStatus.OK);
	}

	@PutMapping("/{id}/editaddress")
	public ResponseEntity<?> editAddress(@RequestBody AddressDto addressDto, @PathVariable Long id) {
		return new ResponseEntity<>(vendorService.updateAddress(addressDto, id), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{id}/block")
	public ResponseEntity<?> blockVendor(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.blockVendor(id), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{id}/unblock")
	public ResponseEntity<?> unblockVendor(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.unblockVendor(id), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllBlockedVendors")
	public ResponseEntity<?> getAllBlockedVendors() {
		return new ResponseEntity<>(vendorService.getAllBlockedVendors(), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllVerifiedVendors")
	public ResponseEntity<?> getAllVerifiedVendors() {
		return new ResponseEntity<>(vendorService.getAllVerifiedVendors(), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllUnVerifiedVendors")
	public ResponseEntity<?> getAllUnVerifiedVendors() {
		return new ResponseEntity<>(vendorService.getUnAllVerifiedVendors(), HttpStatus.OK);
	}
	
	@GetMapping("getAllAvaliablePlanByVendorId/{id}")
	public ResponseEntity<?> getAllAvaliablePlansByVId(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.getAllAvaliablePlansByVId(id), HttpStatus.OK);
	}
	
	@GetMapping("getAllPlanByVendorId/{id}")
	public ResponseEntity<?> getAllPlansByVId(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.getAllPlansByVId(id), HttpStatus.OK);
	}
	
	@GetMapping("getAllDisabledPlanByVendorId/{id}")
	public ResponseEntity<?> getAllDisabledPlansByVId(@PathVariable Long id) {
		return new ResponseEntity<>(vendorService.getAllDisabledPlansByVId(id), HttpStatus.OK);
	}
	
}
