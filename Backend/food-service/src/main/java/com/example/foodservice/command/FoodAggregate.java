package com.example.foodservice.command;

import com.example.foodservice.command.model.CreateFoodCommand;
import com.example.foodservice.command.model.DeleteFoodCommand;
import com.example.foodservice.command.model.UpdateFoodCommand;
import com.example.foodservice.core.event.FoodCreateEvent;
import com.example.foodservice.core.event.FoodDeleteEvent;
import com.example.foodservice.core.event.FoodUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Aggregate
public class FoodAggregate {
    @AggregateIdentifier
    private String _id;
    private String image;
    private String name;
    private String main;
    private int price;
    private String ingredient;

    public FoodAggregate(){}

    @CommandHandler
    public FoodAggregate(CreateFoodCommand createFoodCommand){
        System.out.println(createFoodCommand+" Command");
        FoodCreateEvent foodCreateEvent = new FoodCreateEvent();
        BeanUtils.copyProperties(createFoodCommand, foodCreateEvent);
        AggregateLifecycle.apply(foodCreateEvent);
    }

    @CommandHandler
    public FoodAggregate(UpdateFoodCommand updateFoodCommand){
        FoodUpdateEvent foodUpdateEvent = new FoodUpdateEvent();
        BeanUtils.copyProperties(updateFoodCommand, foodUpdateEvent);
        AggregateLifecycle.apply(foodUpdateEvent);
    }
    @CommandHandler
    public FoodAggregate(DeleteFoodCommand deleteFoodCommand){
        FoodDeleteEvent foodDeleteEvent = new FoodDeleteEvent();
        BeanUtils.copyProperties(deleteFoodCommand, foodDeleteEvent);
        AggregateLifecycle.apply(foodDeleteEvent);
    }
    @EventSourcingHandler
    public void on(FoodUpdateEvent model){
        this._id = model.get_id()+UUID.randomUUID();
        this.image = model.getImage();
        this.name = model.getName();
        this.main = model.getMain();
        this.price = model.getPrice();;
        this.ingredient = model.getIngredient();
    }
    @EventSourcingHandler
    public void on(FoodCreateEvent model){
        this._id = UUID.randomUUID().toString();
        this.image = model.getImage();
        this.name = model.getName();
        this.main = model.getMain();
        this.price = model.getPrice();;
        this.ingredient = model.getIngredient();
    }
    @EventSourcingHandler
    public void on(FoodDeleteEvent model){
        this._id = model.get_id()+UUID.randomUUID();
        this.image = model.getImage();
        this.name = model.getName();
        this.main = model.getMain();
        this.price = model.getPrice();;
        this.ingredient = model.getIngredient();
    }
}
