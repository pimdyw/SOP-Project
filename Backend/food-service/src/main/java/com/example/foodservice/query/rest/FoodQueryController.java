package com.example.foodservice.query.rest;

import com.example.foodservice.pojo.FoodEntity;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
public class FoodQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;


    @RequestMapping(value = "/food", method = RequestMethod.GET)
    public ArrayList getFood(){
        Object food = rabbitTemplate.convertSendAndReceive("Direct", "food", "");
        return (ArrayList) food;
    }
    @RequestMapping(value = "/food/{name}", method = RequestMethod.GET)
    public FoodRestModel getFoodByName(@PathVariable("name") String name){
        System.out.println("ติด");
        Object food = rabbitTemplate.convertSendAndReceive("Direct", "foodbyname", name);
        return (FoodRestModel) food;
    }
}
