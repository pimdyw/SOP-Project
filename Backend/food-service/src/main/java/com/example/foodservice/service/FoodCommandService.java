package com.example.foodservice.service;

import com.example.foodservice.command.model.CreateFoodCommand;
import com.example.foodservice.command.model.DeleteFoodCommand;
import com.example.foodservice.command.model.UpdateFoodCommand;
import com.example.foodservice.pojo.FoodEntity;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

@Service
public class FoodCommandService {

    @Autowired
    CommandGateway commandGateway;

    @RabbitListener(queues = "AddFoodQueue")
    public void addFood(FoodEntity model){
        CreateFoodCommand command = CreateFoodCommand.builder()
                ._id(null)
                .image(model.getImage())
                .name(model.getName())
                .main(model.getMain())
                .price(model.getPrice())
                .ingredient(model.getIngredient())
                .build();
        String result;
        System.out.println(command+ " Add");
        try{
            result = commandGateway.sendAndWait(command);
        }catch (Exception e){
            result = e.getLocalizedMessage();
        }
    }
//
    @RabbitListener(queues = "UpdateFoodQueue")
    public String updateFood(@RequestBody FoodEntity model){

        UpdateFoodCommand command = UpdateFoodCommand.builder()
                ._id(model.get_id())
                .image(model.getImage())
                .name(model.getName())
                .main(model.getMain())
                .price(model.getPrice())
                .ingredient(model.getIngredient())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return result;
    }

    @RabbitListener(queues = "DeleteFoodQueue")
    public void deleteFood(FoodEntity model){
        DeleteFoodCommand command = DeleteFoodCommand.builder()
                ._id(model.get_id())
                .image(model.getImage())
                .name(model.getName())
                .main(model.getMain())
                .price(model.getPrice())
                .ingredient(model.getIngredient())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }catch (Exception e){
            result = e.getLocalizedMessage();
        }
    }
}
