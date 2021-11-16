package com.example.demo.repository;

import com.example.demo.model.CurrentValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomCurrentValueRepository extends JpaRepository<CurrentValue, Long> {
    //custom methods here
    List<CurrentValue> getDistinctByPositionId(Integer positionId);
    List<CurrentValue> getFirstByPositionId(Integer positionId);
    List<CurrentValue> findDistinctByPositionId(Integer positionId);
}
