package com.example.foodservice.command;

import com.example.foodservice.pojo.FoodEntity;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
public class FoodCommandController {


    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public String updateFood(@RequestParam("id") String id, @RequestParam("image") String image, @RequestParam("name") String n, @RequestParam("main") String m,
                             @RequestParam("ingredient") String i, @RequestParam("price") int p){
        FoodEntity f = new FoodEntity(id, image, n, m, p, i);
        Object result = rabbitTemplate.convertSendAndReceive("Direct", "updatefood", f);
        return (String) result;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public String deleteFood(@RequestParam("name") String name){
        Object f = rabbitTemplate.convertSendAndReceive("Direct", "foodbyname", name);
        FoodEntity foodEntity = new FoodEntity();
        BeanUtils.copyProperties(f, foodEntity);
        rabbitTemplate.convertSendAndReceive("Direct", "delete", foodEntity);
        return "Delete Food success";

    }
    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addFood(@RequestParam("image") String image, @RequestParam("name") String n, @RequestParam("main") String m,
                          @RequestParam("ingredient") String i, @RequestParam("price") int p){
        String url = null;
        if(image.isEmpty()){
            System.out.println("It's empty!");
            url = "https://cdn.discordapp.com/attachments/921293798884134923/1054750817443393556/cute-corgi-dog-waiting-for-food-cartoon-illustration-vector.jpg";
        }else{
            url = image;
        }
        FoodEntity f = new FoodEntity(null, url, n, m, p, i);
        rabbitTemplate.convertSendAndReceive("Direct", "addfood", f);
        return "Add food success";
    }
}
