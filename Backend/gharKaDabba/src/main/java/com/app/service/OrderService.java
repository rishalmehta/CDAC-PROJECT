package com.app.service;

import java.util.List;

import com.app.dto.OrderDto;
import com.app.dto.OrderResponseDto;

public interface OrderService {

	List<OrderResponseDto> getAllOrderDetails();

	OrderResponseDto getOrderDetailsById(Long id);

	List<OrderResponseDto> getAllOrdersByCustomerId(Long id);

	String addNewOrder(OrderDto ordersDto);
	
}
