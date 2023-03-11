package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.app.service.CustomerService;

@RestController
@CrossOrigin
@RequestMapping("/customers")
public class CustomerController {
	
	@Autowired
	private CustomerService custService;

	// REST end point to delete user
	// url : http://localhost:8080/customers/id
	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeUser(@PathVariable long id) {
		return new ResponseEntity<>(custService.removeCustomer(id), HttpStatus.OK);
	}

	//to update the customer
	// REST end point to update user details
	// url : http://localhost:8080/customers
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody EditUserDetailsDto custDetailsDto) {
		return new ResponseEntity<>(custService.editCustomerDetails(custDetailsDto), HttpStatus.OK);
	}

	//to add a customer profile image
	// REST end point to upload image
	// url : http://localhost:8080/customers/id/image
	@PostMapping(value = "/{id}/profileImage", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile profileImage, @PathVariable Long id)
			throws IOException {

		return new ResponseEntity<>(custService.uploadImage(id, profileImage), HttpStatus.CREATED);

	}

	// REST end point to download image
	// url : http://localhost:8080/customers/id/image
	// REST end point to download/serve image
	@GetMapping(value = "/{id}/profileImage", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> serveImageFromServerSideFolder(@PathVariable Long id) throws IOException {

		return new ResponseEntity<>(custService.getImage(id), HttpStatus.OK);
	}
	
	//to get list of all customers
	@GetMapping("/allcustomers")
	public ResponseEntity<?> getAllCustomers() {
		return new ResponseEntity<>(custService.getAllCustomers(), HttpStatus.OK);
	}
	
	//to retrive a customer using an id 
	@GetMapping("/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable long id) {
		return new ResponseEntity<>(custService.getCustomerById(id), HttpStatus.OK);
	}
	
	@PostMapping("/{id}/addaddress")
	public ResponseEntity<?> addDeliveryAddress(@RequestBody AddressDto address,@PathVariable Long id){
		return new ResponseEntity<>(custService.addDeliveryAddress(address,id),HttpStatus.OK);
	}
	
	@GetMapping("/{id}/addresses")
	public ResponseEntity<?> getDeliveryAddress(@PathVariable Long id){
		return new ResponseEntity<>(custService.getDeliveryAddress(id),HttpStatus.OK);
	}
	
	@PutMapping("/{id}/editaddresses")
	public ResponseEntity<?> editDeliveryAddress(@RequestBody AddressDto addressDto,@PathVariable Long id){
		return new ResponseEntity<>(custService.updateDeliveryAddress(addressDto,id),HttpStatus.OK);
	}
	
	@GetMapping("/{id}/getSubscriptionPlans")
	public ResponseEntity<?> getSubscriptionPlans(@PathVariable Long id){
		return new ResponseEntity<>(custService.getSubscriptionPlans(id),HttpStatus.OK);
	}
	
	@PostMapping("/findByEmail")
	public ResponseEntity<?> findByEmail(@RequestBody String email){
		return new ResponseEntity<>(custService.getByEmail(email),HttpStatus.OK);
	}
	
	@GetMapping("/ongoingPlans/{id}")
	public ResponseEntity<?> getOngoingPlansByCustId(@PathVariable Long id){
		return new ResponseEntity<>(custService.getAllOngoingSubPlan(id),HttpStatus.OK);
	}
}
