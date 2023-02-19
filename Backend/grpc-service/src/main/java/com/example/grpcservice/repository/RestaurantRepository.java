package com.example.grpcservice.repository;

import com.example.grpcservice.pojo.Restaurant;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

}
