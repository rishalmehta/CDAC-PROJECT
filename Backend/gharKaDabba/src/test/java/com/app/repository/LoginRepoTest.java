package com.app.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.app.entities.Customer;
import com.app.entities.Login;
import com.app.enums.UserRole;

@SpringBootTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class LoginRepoTest {

	@Autowired
	private LoginRepository loginRepo;
	
	@Autowired
	private CustomerRepository custRepo;

	@Autowired
	private PasswordEncoder encoder;
	
	@Test
	void testAddCustomers() {
		List<Customer> customers = new ArrayList<Customer>();
		List<Login> logins = new ArrayList<Login>();
		customers.add(new Customer("cust1_fn","cust1_ln","cust1@gmail.com","0123456789"));
		logins.add(new Login("cust1@gmail.com",encoder.encode("cust1"),UserRole.ROLE_CUSTOMER) );
		customers.add(new Customer("cust2_fn","cust2_ln","cust2@gmail.com","1234567890"));
		logins.add(new Login("cust2@gmail.com",encoder.encode("cust2"),UserRole.ROLE_CUSTOMER) );
		customers.add(new Customer("cust3_fn","cust3_ln","cust3@gmail.com","2345678901"));
		logins.add(new Login("cust3@gmail.com",encoder.encode("cust3"),UserRole.ROLE_CUSTOMER) );
		
		custRepo.saveAll(customers);	
		loginRepo.saveAll(logins);

	}

	@Test
	void testAddLogins() {
	
		List<Login> users = new ArrayList<Login>();
		users.add(new Login("admin@gmail.com",encoder.encode("admin"),UserRole.ROLE_ADMIN));
		users.add(new Login("customer@gmail.com",encoder.encode("customer"),UserRole.ROLE_CUSTOMER));
		users.add(new Login("vendor@gmail.com",encoder.encode("vendor"),UserRole.ROLE_VENDOR));
		
		List<Login> savedUsers= loginRepo.saveAll(users);

		assertEquals(3, savedUsers.size());
	}
	
	
}
