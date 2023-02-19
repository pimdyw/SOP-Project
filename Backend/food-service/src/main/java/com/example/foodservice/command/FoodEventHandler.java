package com.example.foodservice.command;

import com.example.foodservice.core.data.FoodRepository;
import com.example.foodservice.core.event.FoodCreateEvent;
import com.example.foodservice.core.event.FoodDeleteEvent;
import com.example.foodservice.core.event.FoodUpdateEvent;
import com.example.foodservice.pojo.FoodEntity;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class FoodEventHandler {
    private final FoodRepository foodRepository;

    public FoodEventHandler(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @EventHandler
    public void on(FoodUpdateEvent event){
        FoodEntity foodEntity = new FoodEntity();
        BeanUtils.copyProperties(event, foodEntity);
        foodRepository.save(foodEntity);
    }
    @EventHandler
    public void on(FoodCreateEvent event){
        FoodEntity foodEntity = new FoodEntity();
        BeanUtils.copyProperties(event, foodEntity);
        foodRepository.insert(foodEntity);
    }

    @EventHandler
    public void on(FoodDeleteEvent event){
        FoodEntity foodEntity = new FoodEntity();
        BeanUtils.copyProperties(event, foodEntity);
        foodRepository.delete(foodEntity);
    }
}
