package com.example.orderservice.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document("Order")
public class Order implements Serializable {
    @Id
    private String _id;
    private String name;
    private String phone;
    private String food;
    private String other;
    private String price;
    private String payment;
    private String status;

    public Order(String _id, String name, String phone, String food, String other, String price, String payment, String status) {
        this._id = _id;
        this.name = name;
        this.phone = phone;
        this.food = food;
        this.other = other;
        this.price = price;
        this.payment = payment;
        this.status = status;
    }

    public Order(Object o) {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Order(){}

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }
}
