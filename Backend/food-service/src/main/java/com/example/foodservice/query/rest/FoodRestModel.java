package com.example.foodservice.query.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class FoodRestModel implements Serializable{


        private String _id;
        private String image;
        private String name;
        private String main;
        private int price;
        private String ingredient;

}
