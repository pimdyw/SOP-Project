package com.example.restaurantservice.controller;

import com.example.restaurantservice.pojo.Restaurant;
import jakarta.ws.rs.Path;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin("*")
public class RestaurantController {
    @Autowired
    private RabbitTemplate rabbitTemplate;


    @RequestMapping(value = "/restaurant", method = RequestMethod.GET)
    public ArrayList getRestaurant(){
        Object restaurant = rabbitTemplate.convertSendAndReceive("Direct", "restaurant", "");
        return (ArrayList) restaurant;
    }

    @RequestMapping(value = "/restaurant/update/", method = RequestMethod.GET)
    public String updateRestaurant(@RequestParam("id") String id, @RequestParam("name") String name,
                                   @RequestParam("phone") String phone, @RequestParam("status") int status){
        Restaurant r = new Restaurant(id, name, phone, status);
        rabbitTemplate.convertSendAndReceive("Direct", "update", r);
        return "Update Success";
    }
}
