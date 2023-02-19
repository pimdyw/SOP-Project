package com.example.foodservice.service;

import com.example.foodservice.query.FindFoodByNameQuery;
import com.example.foodservice.query.FindFoodQuery;
import com.example.foodservice.query.rest.FoodRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodQueryService {
    @Autowired
    QueryGateway queryGateway;

    @RabbitListener(queues = "GetFoodQueue")
    public List<FoodRestModel>  foods(){
        FindFoodQuery findFoodQuery = new FindFoodQuery();
        List<FoodRestModel> foods = queryGateway
                .query(findFoodQuery, ResponseTypes.multipleInstancesOf(FoodRestModel.class)).join();
        return foods;
    }


    @RabbitListener(queues = "GetFoodByNameQueue")
    public FoodRestModel foodByName(String s){
        FindFoodByNameQuery findFoodByNameQuery= new FindFoodByNameQuery(s);
        FoodRestModel food = queryGateway
                .query(findFoodByNameQuery, FoodRestModel.class).join();
        return food;
    }

}
