package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;

@Service
public class ImageHandlingServiceImpl implements ImageHandlingService {

	//Extracting folder name from Application Properties
	@Value("${content.upload.folder}")
	private String folderName;

	//Creating folder to store image if not exit
	@PostConstruct
	public void myInit() {
		File path = new File(folderName);
		if (!path.exists()) {
			path.mkdirs();
		}
	}

	
	//Method to Upload image to server side folder
	@Override
	public String uploadImage(MultipartFile imageFile) throws IOException {
		// Creating image file path
		String targetPath = folderName + File.separator + LocalDate.now() + imageFile.getOriginalFilename();
		// copy image file contents to the specified path
		Files.copy(imageFile.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
		return targetPath;
	}

	//Method to download image from server side folder
	@Override
	public byte[] getImage(String filePath) throws IOException {
		if (filePath == null)
			throw new ResourceNotFoundException("Image does not exist !!!!!");
		// reading file from the image folder and converting it to byte
		return Files.readAllBytes(Paths.get(filePath));
	}

}
