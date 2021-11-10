package com.example.demo.controller;

import com.example.demo.model.Position;
import com.example.demo.repository.PositionRepository;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

@RestController
@CrossOrigin
public class PositionController {

    private final PositionRepository repository;

    public PositionController(PositionRepository repository) {this.repository = repository;}

    //CREATE
    @PostMapping("/position")
    public Position createPosition(@RequestBody Position newPosition){
        return this.repository.save(newPosition);
    }

    //READ ONE
    @GetMapping("/position/{id}")
    public Position getPosition(@PathVariable Long id){
        return this.repository.findById(id).get();
    }

    //UPDATE
    @PatchMapping("/position/{id}")
    public Position updatePosition(@PathVariable Long id, @RequestBody Map<String, Object> newPosition){
        Position oldPosition = this.repository.findById(id).get();
        newPosition.forEach((key,value)->{
                switch(key){
                    case "ticker": oldPosition.setTicker((String)value);break;
                    case "price": oldPosition.setPrice((String)value);break;
                    case "purchaseDate":
                        try {
                            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            oldPosition.setPurchaseDate(formatter.parse((String)value));
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        break;
                    case "shares": oldPosition.setShares((String)value);break;
                    }
                });

        return this.repository.save(oldPosition);
    }

    //DELETE
    @DeleteMapping("/position/{id}")
    public void deletePosition(@PathVariable Long id){
        this.repository.deleteById(id);
    }

    //LIST ALL
    @GetMapping("/position")
    public Iterable<Position> getPositions(){
        return this.repository.findAll();
    }

}

