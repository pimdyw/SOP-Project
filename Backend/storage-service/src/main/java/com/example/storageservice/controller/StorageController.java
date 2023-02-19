package com.example.storageservice.controller;


import com.example.storageservice.pojo.Storage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Language;
import org.springframework.web.bind.annotation.*;

import java.io.DataInput;
import java.lang.reflect.Array;
import java.util.*;

@RestController
@CrossOrigin("*")
public class StorageController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/storage", method = RequestMethod.GET)
    public ArrayList getStorage(){
        Object storage = rabbitTemplate.convertSendAndReceive("Direct", "storage", "");
        return (ArrayList) storage;
    }

    @RequestMapping(value = "/storage/save", method = RequestMethod.GET)
    public void saveStorage(@RequestParam("id") String Id,
                            @RequestParam("ingredient") String ingredient,
                            @RequestParam("main") int main, @RequestParam("quantity") int quantity) {
        Storage storage1 = new  Storage(Id, ingredient, quantity, main);
        Object s = rabbitTemplate.convertSendAndReceive("Direct", "updateStorage", storage1);
        System.out.println("Update Storage Success");
    }

    @RequestMapping(value = "/storage/discount", method = RequestMethod.GET)
    public String discountStorage(@RequestParam("main") String m, @RequestParam("ingredient") String i){
        Object main = rabbitTemplate.convertSendAndReceive("Direct", "getByName", m);
        Object ingredient = rabbitTemplate.convertSendAndReceive("Direct", "getByName", i);
        Storage mainData = (Storage) main;
        Storage ingredientData = (Storage) ingredient;
        mainData.setQuantity(mainData.getQuantity()-1);
        ingredientData.setQuantity(ingredientData.getQuantity()-1);
        rabbitTemplate.convertSendAndReceive("Direct", "updateStorage", mainData);
        rabbitTemplate.convertSendAndReceive("Direct", "updateStorage", ingredientData);
        return "Update Storage Success";
    }
    @RequestMapping(value = "/storage/increase", method = RequestMethod.GET)
    public String increaseIngreStorage(@RequestParam("name") String m){
        Object main = rabbitTemplate.convertSendAndReceive("Direct", "getByName", m);
        Storage ingredientData = (Storage) main;
        ingredientData.setQuantity(ingredientData.getQuantity()+1);
        rabbitTemplate.convertSendAndReceive("Direct", "updateStorage", ingredientData);
        System.out.println(ingredientData);
        return "Update Storage Success";
    }


}
