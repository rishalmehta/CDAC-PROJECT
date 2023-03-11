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

import com.app.dto.TiffinDto;
import com.app.service.TiffinService;

@CrossOrigin
@RestController
@RequestMapping("/tiffins")
public class TiffinController {

	@Autowired
	private TiffinService tiffinService;

	@PostMapping("/addTiffin/{spId}")
	public ResponseEntity<?> addTiffinBySubcriptionPlanId(@RequestBody TiffinDto tiffin, @PathVariable Long spId) {

		return new ResponseEntity<>(tiffinService.addTiffin(tiffin,spId), HttpStatus.OK);
	}

	@PostMapping(value = "/{id}/tiffinImage", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile tiffinImage, @PathVariable Long id)
			throws IOException {

		return new ResponseEntity<>(tiffinService.uploadImage(id, tiffinImage), HttpStatus.CREATED);

	}

	@PutMapping("/editTiffin")
	public ResponseEntity<?> editTiffin(@RequestBody TiffinDto tiffin) {

		return new ResponseEntity<>(tiffinService.editTiffin(tiffin), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getTiffinById(@PathVariable long id) {
		return new ResponseEntity<>(tiffinService.getTiffinById(id), HttpStatus.OK);
	}

	@GetMapping("getTiffinsBySubscriptionId/{id}")
	public ResponseEntity<?> getTiffinsBySubscriptionId(@PathVariable long id) {
		return new ResponseEntity<>(tiffinService.getTiffinBySubscriptionId(id), HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}/tiffinImage", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> serveImageFromServerSideFolder(@PathVariable Long id) throws IOException {

		return new ResponseEntity<>(tiffinService.getImage(id), HttpStatus.OK);
	}
}
