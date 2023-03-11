package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.TiffinDto;

public interface TiffinService {

	TiffinDto addTiffin(TiffinDto tiffin,long spId);

	String uploadImage(Long id, MultipartFile tiffinImage) throws IOException;

	String editTiffin(TiffinDto tiffin);

	TiffinDto getTiffinById(long id);

	List<TiffinDto> getTiffinBySubscriptionId(long id);

	byte[] getImage(Long id) throws IOException;

}
