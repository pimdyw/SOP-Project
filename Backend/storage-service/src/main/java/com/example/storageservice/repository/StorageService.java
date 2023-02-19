package com.example.storageservice.repository;

import com.example.storageservice.pojo.Storage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorageService {
    @Autowired
    private StorageRepository storageRepository;

    @RabbitListener(queues = "GetStorageQueue")
    public List GetStorage(){
        return storageRepository.findAll();
    }

    @RabbitListener(queues = "UpdateStorageQueue")
    public void updateStorage(Storage s) {
        storageRepository.save(s);
    }

    @RabbitListener(queues = "GetStorageByNameQueue")
    public Storage getStorageByName(String n){
        return storageRepository.findByName(n);
    }

}
