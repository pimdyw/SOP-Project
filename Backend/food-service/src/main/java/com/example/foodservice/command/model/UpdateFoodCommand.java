package com.example.foodservice.command.model;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;


@Builder
@Data
public class UpdateFoodCommand {

    @TargetAggregateIdentifier
    private String _id;
    private String image;
    private String name;
    private String main;
    private int price;
    private String ingredient;


}
