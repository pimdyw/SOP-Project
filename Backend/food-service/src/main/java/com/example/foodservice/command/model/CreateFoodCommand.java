package com.example.foodservice.command.model;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class CreateFoodCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String image;
    private final String name;
    private final String main;
    private final int price;
    private final String ingredient;
}
