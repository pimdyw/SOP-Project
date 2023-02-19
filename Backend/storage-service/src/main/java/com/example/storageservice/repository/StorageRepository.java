package com.example.storageservice.repository;

import com.example.storageservice.pojo.Storage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends MongoRepository<Storage, String> {
    @Query(value="{'ingredient':'?0'}")
    public Storage findByName(String name);

}
