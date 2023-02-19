package com.example.orderservice.repository;

import com.example.orderservice.pojo.Order;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @RabbitListener(queues = "CreateOrderQueue")
    public void create(ArrayList s){
         orderRepository.insert(s);
    }

    @RabbitListener(queues = "GetOrderQueue")
    public List get(){
        return orderRepository.findAll();
    }

    @RabbitListener(queues = "GetOrderByIdQueue")
    public Order OrderById(String id){
        return orderRepository.findId(id);
    }

    @RabbitListener(queues = "UpdateOrderQueue")
    public void update(Order o){
        orderRepository.save(o);
    }
    @RabbitListener(queues = "DeleteOrderQueue")
    public void delete(Order o){
        orderRepository.delete(o);
    }
}
