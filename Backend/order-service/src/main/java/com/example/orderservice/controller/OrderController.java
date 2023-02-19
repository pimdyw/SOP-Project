package com.example.orderservice.controller;

import com.example.orderservice.pojo.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String createOrder(@RequestParam("name") String cus, @RequestParam("phone") String phone, @RequestParam("food") String food,
                              @RequestParam("other") String other, @RequestParam("price") String price,@RequestParam("payment") String payment){
        Order order = new Order(null, cus, phone, food, other, price, payment, "wait");
        rabbitTemplate.convertSendAndReceive("Direct", "createOrder", order);
        System.out.println("Create Order Success");
        return "Create Order Success";
    }

    @RequestMapping(value = "/order", method = RequestMethod.GET)
    public ArrayList order(){
        Object o = rabbitTemplate.convertSendAndReceive("Direct", "order", "");
        return (ArrayList) o;
    }

    @RequestMapping(value = "/order/processing/{id}", method = RequestMethod.GET)
    public String proccessing(@PathVariable("id") String id){
        System.out.println(id);
        Object o = rabbitTemplate.convertSendAndReceive("Direct", "orderById", id);
        Order data = (Order) o;
        data.setStatus("processing");
        rabbitTemplate.convertSendAndReceive("Direct", "updateOrder", data);
        return "Update order to processing";
    }
    @RequestMapping(value = "/order/delete/{id}", method = RequestMethod.GET)
    public String deleteOrder(@PathVariable("id") String id){
        System.out.println(id);
        Object o = rabbitTemplate.convertSendAndReceive("Direct", "orderById", id);
        Order data = (Order) o;
        rabbitTemplate.convertSendAndReceive("Direct", "deleteOrder", data);
       return "Delete order success";
    }
    @RequestMapping(value = "/order/success/{id}", method = RequestMethod.GET)
    public String success(@PathVariable("id") String id){
        System.out.println(id);
        Object o = rabbitTemplate.convertSendAndReceive("Direct", "orderById", id);
        Order data = (Order) o;
        data.setStatus("success");
        rabbitTemplate.convertSendAndReceive("Direct", "updateOrder", data);
        return "Update order to success";
    }
    @RequestMapping(value = "/order/success/pay/{id}", method = RequestMethod.GET)
    public String paySuccess(@PathVariable("id") String id){
        System.out.println(id);
        Object o = rabbitTemplate.convertSendAndReceive("Direct", "orderById", id);
        Order data = (Order) o;
        data.setStatus("pay");
        System.out.println(data);
        rabbitTemplate.convertSendAndReceive("Direct", "updateOrder", data);
        return "Update order to pay";
    }

}
