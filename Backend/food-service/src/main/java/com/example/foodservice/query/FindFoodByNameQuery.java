package com.example.foodservice.query;

public class FindFoodByNameQuery {
    private String name;


    public FindFoodByNameQuery() {
    }

    public FindFoodByNameQuery(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
