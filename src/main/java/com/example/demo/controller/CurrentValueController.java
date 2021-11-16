package com.example.demo.controller;

import com.example.demo.model.CurrentValue;
import com.example.demo.repository.CurrentValueRepository;
import com.example.demo.repository.CustomCurrentValueRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class CurrentValueController {

    private final CustomCurrentValueRepository customRepository;

    private final CurrentValueRepository repository;

    public CurrentValueController(CustomCurrentValueRepository customRepository, CurrentValueRepository repository) {
        this.customRepository = customRepository;
        this.repository = repository;}

    //CREATE
    @PostMapping("/currentValue")
    public CurrentValue createCurrentValue(@RequestBody CurrentValue newCurrentValue){
        return this.repository.save(newCurrentValue);
    }

    //READ
    @GetMapping("/currentValue/{id}")
    public CurrentValue getCurrentValue(@PathVariable Long id){
        return this.repository.findById(id).get();
    }

    //UPDATE
    @PatchMapping("/currentValue/{id}")
    public CurrentValue updateCurrentValue(@PathVariable Long id, @RequestBody Map<String, Object> newCurrentValue){
        CurrentValue oldCurrentValue = this.repository.findById(id).get();
        newCurrentValue.forEach((key, value)->{
            switch (key){
                case "positionId":oldCurrentValue.setPositionId((Integer)value);break;
                case "ticker":oldCurrentValue.setTicker((String)value);break;
                case "currentValue":oldCurrentValue.setCurrentValue((String)value);break;

                }});

        return this.repository.save(oldCurrentValue);
    }

    //DELETE
    @DeleteMapping("./currentValue/{id}")
    public void deleteCurrentValue(@PathVariable Long id){
        this.repository.deleteById(id);
    }

    //LIST
    @GetMapping("/currentValue")
    public Iterable<CurrentValue> listCurrentValue(){
        return this.repository.findAll();
    }

    //GET FOR PositionId
    @GetMapping("/getPositionValues/{id}")
    public List<CurrentValue> getCurrentValueByPositionId(@PathVariable Integer id){
        //return this.customRepository.getDistinctByPositionId(id);
        return this.customRepository.findDistinctByPositionId(id);
    }

}
