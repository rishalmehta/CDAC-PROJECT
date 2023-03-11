package com.app.repository;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.app.entities.Address;
import com.app.entities.Login;
import com.app.entities.Vendor;
import com.app.enums.UserRole;

@SpringBootTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class VendorRepo {

	@Autowired
	private LoginRepository loginRepo;
	
	@Autowired
	private VendorRepository vendorRepo;

	@Autowired
	private PasswordEncoder encoder;
	
	@Test
	void testVendors() {
		List<Vendor> vendors = new ArrayList<Vendor>();
		List<Login> logins = new ArrayList<Login>();
		
		vendors.add(new Vendor("vendor1_fn","vendor1_ln","vendor1@gmail.com","0123456789",true,false,new Address("v1_addLine1","v1_addLine2","v1_city",123456,"v1_state")));
		vendors.add(new Vendor("vendor2_fn","vendor2_ln","vendor2@gmail.com","1234567890",true,false,new Address("v2_addLine1","v2_addLine2","v2_city",123456,"v2_state")));
		vendors.add(new Vendor("vendor3_fn","vendor3_ln","vendor3@gmail.com","2345678901",true,false,new Address("v3_addLine1","v3_addLine2","v3_city",123456,"v3_state")));
		vendors.add(new Vendor("vendor4_fn","vendor4_ln","vendor4@gmail.com","3456789012",true,false,new Address("v4_addLine1","v4_addLine2","v4_city",123456,"v4_state")));
		vendors.add(new Vendor("vendor5_fn","vendor5_ln","vendor5@gmail.com","4567890123",true,false,new Address("v5_addLine1","v5_addLine2","v5_city",123456,"v5_state")));
		
		
		logins.add(new Login("vendor1@gmail.com",encoder.encode("vendor1"),UserRole.ROLE_VENDOR));
		logins.add(new Login("vendor2@gmail.com",encoder.encode("vendor2"),UserRole.ROLE_VENDOR));
		logins.add(new Login("vendor3@gmail.com",encoder.encode("vendor3"),UserRole.ROLE_VENDOR));
		logins.add(new Login("vendor4@gmail.com",encoder.encode("vendor4"),UserRole.ROLE_VENDOR));
		logins.add(new Login("vendor5@gmail.com",encoder.encode("vendor5"),UserRole.ROLE_VENDOR));
		
		vendorRepo.saveAll(vendors);	
		loginRepo.saveAll(logins);

	}


	
}
