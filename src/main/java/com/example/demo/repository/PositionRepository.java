package com.example.demo.repository;

import com.example.demo.model.Position;
import org.springframework.data.repository.CrudRepository;

public interface PositionRepository extends CrudRepository<Position, Long> {
    //
}
