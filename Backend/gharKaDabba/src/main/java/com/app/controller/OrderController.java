package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

	@Autowired
	private OrderService orderService;


	@GetMapping("/getAllOrderDetails")
	public ResponseEntity<?> getAllOrderDetails() {
		return new ResponseEntity<>(orderService.getAllOrderDetails(), HttpStatus.OK);
	}

	@GetMapping("/getOrderDetailsById/{id}")
	public ResponseEntity<?> getOrderById(@PathVariable Long id) {
		return new ResponseEntity<>(orderService.getOrderDetailsById(id), HttpStatus.OK);
	}

	@GetMapping("/getAllOrderByCustomerId/{id}")
	public ResponseEntity<?> getOrderDetailsByCustomerId(@PathVariable Long id) {
		return new ResponseEntity<>(orderService.getAllOrdersByCustomerId(id), HttpStatus.OK);
	}

	@PostMapping("/newOrder")
	public ResponseEntity<?> addNewOrder(@RequestBody OrderDto ordersDto) {
		return new ResponseEntity<>(orderService.addNewOrder(ordersDto), HttpStatus.OK);
	}

}
