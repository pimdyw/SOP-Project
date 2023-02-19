package com.example.foodservice.core.event;

import lombok.Data;

@Data
public class FoodCreateEvent {


    private String _id;
    private String image;
    private String name;
    private String main;
    private int price;
    private String ingredient;
}
