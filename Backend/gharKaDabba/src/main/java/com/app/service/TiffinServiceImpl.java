package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.TiffinDto;
import com.app.entities.SubscriptionPlan;
import com.app.entities.Tiffin;
import com.app.repository.SubscriptionPlanRepository;
import com.app.repository.TiffinRepository;

@Transactional
@Service
public class TiffinServiceImpl implements TiffinService {

	@Autowired
	private TiffinRepository tiffinRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ImageHandlingService imageService;
	
	@Autowired
	private SubscriptionPlanRepository subscriptionPlanRepo;
	
	@Override
	public TiffinDto addTiffin(TiffinDto tiffinDto,long spId) {
		SubscriptionPlan plan = subscriptionPlanRepo.findById(spId).orElseThrow();
		Tiffin tiffin = tiffinRepo.save(mapper.map(tiffinDto,Tiffin.class));
		tiffin.setImagePath("images\\2023-03-05blankProfile.jpg");
		tiffin.setSubscriptionPlan(plan);
		return mapper.map(tiffin,TiffinDto.class);	
	}

	@Override
	public String uploadImage(Long id, MultipartFile tiffinImage) throws IOException {
		Tiffin tiffin = tiffinRepo.findById(id).orElseThrow();
		tiffin.setImagePath(imageService.uploadImage(tiffinImage));
		return "Image Uploaded Successfully";
	}

	@Override
	public String editTiffin(TiffinDto tiffinDto) {
		Tiffin tiffin = tiffinRepo.findById(tiffinDto.getId()).orElseThrow();
		tiffin.setName(tiffinDto.getName());
		tiffin.setDescription(tiffinDto.getDescription());
		tiffin.setPrice(tiffinDto.getPrice());
		tiffin.setFoodType(tiffinDto.getFoodType());
		tiffinRepo.save(tiffin);
		return "Tiffin Edited Successfully";
	}

	@Override
	public TiffinDto getTiffinById(long id) {
		return mapper.map(tiffinRepo.findById(id).orElseThrow(),TiffinDto.class);
	}

	@Override
	public List<TiffinDto> getTiffinBySubscriptionId(long id) {
		SubscriptionPlan plan = subscriptionPlanRepo.findById(id).orElseThrow();
		return plan.getTiffins().stream().map(tiffin->mapper.map(tiffin, TiffinDto.class)).collect(Collectors.toList());
	}
	
	@Override
	public byte[] getImage(Long id) throws IOException {
		Tiffin tiffin= tiffinRepo.findById(id).orElseThrow();
		return imageService.getImage(tiffin.getImagePath());
	}

	
}
