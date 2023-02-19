package com.example.foodservice.core.event;

import com.example.foodservice.command.model.UpdateFoodCommand;
import lombok.Data;

@Data
public class FoodUpdateEvent {

    private String _id;
    private String image;
    private String name;
    private String main;
    private int price;
    private String ingredient;
}
