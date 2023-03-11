package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

	@Query("select v from Vendor v where v.isBlocked=true")
	List<Vendor> getAllBlockedVendors();
	
	@Query("select v from Vendor v where v.isVerified=true")
	List<Vendor> getAllVerifiedVendors();
	
	@Query("select v from Vendor v where v.isVerified=false")
	List<Vendor> getAllUnVerifiedVendors();
	
	@Query("select v from Vendor v where v.isVerified=true and v.isBlocked=false")
	List<Vendor> getAllAvaliableVendors();
	
	Optional<Vendor> getByEmail(String email);
}
