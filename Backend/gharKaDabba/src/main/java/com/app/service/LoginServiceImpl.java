package com.app.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.ChangePasswordDto;
import com.app.dto.UserDTO;
import com.app.entities.Customer;
import com.app.entities.Login;
import com.app.entities.OTP;
import com.app.entities.UserEntity;
import com.app.entities.Vendor;
import com.app.enums.UserRole;
import com.app.repository.CustomerRepository;
import com.app.repository.LoginRepository;
import com.app.repository.OtpRepository;
import com.app.repository.VendorRepository;

@Transactional
@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginRepository loginRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private VendorRepository vendorRepo;

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private OtpRepository otpRepository;

	@Override
	public Login findByEmail(String email) {
		return loginRepo.findByEmail(email).orElseThrow();
	}

	@Override
	public void removeLogin(Login loginDetails) {
		loginRepo.delete(loginDetails);

	}

	@Override
	public UserEntity addLogin(UserDTO user) {
		// Extracting Role from request dto object
		UserRole role = user.getUserRole();

		// Creating an login object will be saved in database in login table if user
		// data is added
		Login login = new Login(user.getEmail(), encoder.encode(user.getPassword()), role);

		UserEntity entity = null;

		// Creating user object as per the type of role
		if (role == UserRole.ROLE_CUSTOMER) {
			// customer role
			Customer customer = new Customer(user.getFirstName(), user.getLastName(), user.getEmail(),
					user.getMobile());

			// saving in customers table
			entity = customerRepo.save(customer);
		}
		// vendor role
		else {
			Vendor vendor = new Vendor(user.getFirstName(), user.getLastName(), user.getEmail(), user.getMobile());
			// saving in vendors table
			entity = vendorRepo.save(vendor);
		}
			entity.setProfileImage("images\\2023-03-05blankProfile.jpg");
		// adding entry to login table
		loginRepo.save(login);
		return entity;
	}

	@Override
	public String changePassword(ChangePasswordDto changePasswordDto) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				changePasswordDto.getEmail(), changePasswordDto.getOldPassword());
		// authenticate the credentials
		manager.authenticate(authToken);

		Login login = loginRepo.findByEmail(changePasswordDto.getEmail()).orElseThrow();
		login.setPassword(encoder.encode(changePasswordDto.getNewPassword()));

		return "Password Updated Successfully";
	}

	@Override
	public String sendOTP(String email) {
		Random ramdom = new Random();
		Integer otp = ramdom.nextInt(999999);

		OTP otpTran = new OTP(email, otp);
		otpRepository.save(otpTran);
		
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(email);
		mesg.setSubject("OTP for verification");
		mesg.setText("Enter this OTP for verification : " + otp + "\nDo not share it with anyone !!!!!");
		sender.send(mesg);
		return "Otp sent to Your Email";
	}

	
	
	@Override
	public String validateEmail(String email) {
		Optional<Login> login = loginRepo.findByEmail(email);
		System.out.println(login);
		if(login.isPresent()) {
			throw new RuntimeException("Email Already Registered");
		}	
		return sendOTP(email);
	}

	@Override
	public boolean validateOTP(String email, int otp) {
		System.out.println(email + " " + otp);
		LocalDateTime now = LocalDateTime.now();
		OTP persistOTP = otpRepository.findByEmailAndOtp(email, otp);
		if (!now.isBefore(persistOTP.getDateCreated().plusMinutes(10)))
			throw new RuntimeException("OTP expired, genrate new OTP");
		otpRepository.delete(persistOTP);
		return true;
	}

	@Override
	public String forgotPassword(String email) {
		//Checking if email exist in database
		Login login=loginRepo.findByEmail(email).orElseThrow(()->new RuntimeException("Email-id not Found"));
		return sendOTP(login.getEmail());
	}

	@Override
	public String changeForgottenPassword(ChangePasswordDto changePasswordDto) {
		if(validateOTP(changePasswordDto.getEmail(),changePasswordDto.getOTP())) {
		Login login = loginRepo.findByEmail(changePasswordDto.getEmail()).orElseThrow();
		login.setPassword(encoder.encode(changePasswordDto.getNewPassword()));
		return "Password Updated Successfully";
		}
		return "Password Update Failed,Please Retry";	
	}

	
	
}
