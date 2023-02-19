package com.example.storageservice.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document("Storage")
public class Storage implements Serializable {
    @Id
    private String _id;
    private String ingredient;
    private int quantity;
    private int main;

    public Storage(String _id, String ingredient, int quantity, int main) {

        this._id = _id;
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.main = main;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getMain() {
        return main;
    }

    public void setMain(int main) {
        this.main = main;
    }

    public Storage(){}


}
