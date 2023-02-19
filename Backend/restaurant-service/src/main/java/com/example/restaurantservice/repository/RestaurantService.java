package com.example.restaurantservice.repository;

import com.example.restaurantservice.pojo.Restaurant;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @RabbitListener(queues = "GetRestaurantQueue")
    public List GetRes(){
        System.out.println("getRestaurant");
        return restaurantRepository.findAll();
    }

    @RabbitListener(queues = "UpdateRestaurantQueue")
    public void update(Restaurant r){
        restaurantRepository.save(r);
    }
}
