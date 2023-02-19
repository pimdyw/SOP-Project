package com.example.orderservice.repository;

import com.example.orderservice.pojo.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    @Query(value="{'_id':'?0'}")
    public Order findId(String id);
}
