package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Customer;
import com.app.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	List<Order> findByCustomer(Customer customer);
	
	@Query("select o from Order o join fetch o.customer where o.id=:orderId")
	Order getOrderDetailsById(Long orderId);
}
