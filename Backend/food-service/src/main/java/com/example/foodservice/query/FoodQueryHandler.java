package com.example.foodservice.query;

import com.example.foodservice.pojo.FoodEntity;
import com.example.foodservice.core.data.FoodRepository;
import com.example.foodservice.query.rest.FoodRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FoodQueryHandler {

    private final FoodRepository foodRepository;

    public FoodQueryHandler(FoodRepository foodRepository){
        this.foodRepository = foodRepository;
    }

    @QueryHandler
    public List<FoodRestModel> findFood(FindFoodQuery query){
        List<FoodRestModel> foodsRest = new ArrayList<>();
        List<FoodEntity> storedFoods = foodRepository.findAll();
        for (FoodEntity foodEntity : storedFoods){
            FoodRestModel productRestModel = new FoodRestModel();
            BeanUtils.copyProperties(foodEntity, productRestModel);
            foodsRest.add(productRestModel);
        }
        return foodsRest;
    }

    @QueryHandler
    public FoodRestModel findFoodsByName(FindFoodByNameQuery query){
        FoodRestModel foodRestModel = new FoodRestModel();
        FoodEntity foodEntity = foodRepository.findByName(query.getName());
        BeanUtils.copyProperties(foodEntity, foodRestModel);
        return foodRestModel;
    }
}
