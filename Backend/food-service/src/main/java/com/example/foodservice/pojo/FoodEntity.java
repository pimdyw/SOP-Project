package com.example.foodservice.pojo;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.io.Serializable;

@Data
@Document("Food")
public class FoodEntity implements Serializable {

    @Id
    private String _id;
    private String image;
    private String name;
    private String main;
    private int price;
    private String ingredient;

    public FoodEntity() {
    }

    public FoodEntity(String _id, String image, String name, String main, int price, String ingredient) {
        this._id = _id;
        this.image = image;
        this.name = name;
        this.main = main;
        this.price = price;
        this.ingredient = ingredient;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }
}
