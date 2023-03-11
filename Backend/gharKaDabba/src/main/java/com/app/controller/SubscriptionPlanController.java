package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import com.app.dto.SubscriptionPlanDto;
import com.app.service.SubscriptionPlanService;

@RestController
@CrossOrigin
@RequestMapping("/subscription")
// http://localhost8080/subscription

public class SubscriptionPlanController {

	@Autowired
	private SubscriptionPlanService subscriptionPlanService;

	@GetMapping("/allplans")
	public ResponseEntity<?> getAllSubscriptionPlans() {
		return new ResponseEntity<>(subscriptionPlanService.getAllSubscriptionPlans(), HttpStatus.OK);
	}

	@GetMapping("/plan/{id}")
	public ResponseEntity<?> getSubscriptionPlanById(@PathVariable long id) {
		System.out.println(id);
		return new ResponseEntity<>(subscriptionPlanService.getSubscriptionPlanById(id), HttpStatus.OK);
	}

	@PostMapping("/newplan/{vendorId}")
	public ResponseEntity<?> addNewSubscriptionPlan(@RequestBody SubscriptionPlanDto SubscriptionPlanDto,
			@PathVariable Long vendorId) {
		return new ResponseEntity<>(subscriptionPlanService.addNewSubscriptionPlan(SubscriptionPlanDto, vendorId),
				HttpStatus.OK);

	}

	@PutMapping
	public ResponseEntity<?> updateSubscriptionPlan(@RequestBody SubscriptionPlanDto SubscriptionPlanDto) {
		return new ResponseEntity<>(subscriptionPlanService.editSubscriptionDetails(SubscriptionPlanDto),
				HttpStatus.OK);
	}

	@GetMapping("/{id}/deactivate")
	public ResponseEntity<?> deactivatePlanById(@PathVariable long id) {
		return new ResponseEntity<>(subscriptionPlanService.deactivatePlanById(id), HttpStatus.OK);
	}

	@GetMapping("/{id}/activate")
	public ResponseEntity<?> activatePlanById(@PathVariable long id) {
		return new ResponseEntity<>(subscriptionPlanService.activatePlanById(id), HttpStatus.OK);
	}

	@GetMapping("/getAllAvaliablePlans")
	public ResponseEntity<?> getAllAvaliablePlans() {
		return new ResponseEntity<>(subscriptionPlanService.getAllAvaliablePlans(), HttpStatus.OK);
	}

	@GetMapping("/getAllNotAvaliablePlans")
	public ResponseEntity<?> getAllNonAvaliablePlans() {
		return new ResponseEntity<>(subscriptionPlanService.getAllNotAvaliablePlans(), HttpStatus.OK);
	}

	@PostMapping(value = "/{id}/subPlanImage", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile subPlanImage, @PathVariable Long id)
			throws IOException {

		return new ResponseEntity<>(subscriptionPlanService.uploadImage(id, subPlanImage), HttpStatus.CREATED);

	}

	@GetMapping(value = "/{id}/dp", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> serveImageFromServerSideFolder(@PathVariable Long id) throws IOException {

		return new ResponseEntity<>(subscriptionPlanService.getImage(id), HttpStatus.OK);
	}
	
	@GetMapping("/getTiffinsBySubPlanId/{id}")
	public ResponseEntity<?> getTiffinsBySubcriptionPlanId(@PathVariable Long id){
		return new ResponseEntity<>(subscriptionPlanService.getTiffinsBySubcriptionPlanId(id),HttpStatus.OK);
	}

	@GetMapping("/getAllCustomerSubscribedToSubPlanId/{id}")
	public ResponseEntity<?> getAllCustomerSubscribedToSubPlanId(@PathVariable Long id){
		return new ResponseEntity<>(subscriptionPlanService.getAllCustomerSubscribedToSubPlanId(id),HttpStatus.OK);
	}
}
