package com.example.grpcservice.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.io.Serializable;

@Document("Restaurant")
public class Restaurant implements Serializable {
    @Id
    private String _id;
    private String name;
    private String phone;
    private int status;

    public Restaurant(){}

    public Restaurant(String _id, String name, String phone, int status) {
        this._id = _id;
        this.name = name;
        this.phone = phone;
        this.status = status;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
