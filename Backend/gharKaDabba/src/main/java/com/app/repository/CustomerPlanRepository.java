package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CustomerPlanSubscription;

public interface CustomerPlanRepository extends JpaRepository<CustomerPlanSubscription,Long> {

}
