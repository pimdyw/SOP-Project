package com.example.grpcservice.controller;

import com.example.grpcservice.pojo.Restaurant;
import com.example.grpcservice.repository.RestaurantService;
import com.proto.greet.*;
import io.grpc.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class DummyGatewayService {

    @Autowired
    RestaurantService restaurantService;



    @RequestMapping(value = "/dummy.gateway", method = RequestMethod.GET)
    public String getRestaurantName() {
    ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost",50055)
                .usePlaintext().build();
        DummyServiceGrpc.DummyServiceBlockingStub syncClient
                = DummyServiceGrpc.newBlockingStub(channel);

        DummyServiceGrpc.DummyServiceBlockingStub dummyClient
                = DummyServiceGrpc.newBlockingStub(channel);
        List<Restaurant> arr = restaurantService.GetRes();
        String name = null;
        for (Restaurant data: arr){
            name = data.getName();
        }
// created a protocol buffer greeting message
        DummyMessage requestMessage = DummyMessage.newBuilder().setTxt(name).build();
// call the RPC and get back a GreetResponse (Protocol Buffers)
        DummyMessage responseMessage = dummyClient.sayHi(requestMessage);
        channel.shutdown();
        return responseMessage.getTxt();
}}
