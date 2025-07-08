package com.project.demo.controller;

import com.example.demo.model.SUBLOBTEAM;
import com.example.demo.repository.SUBLOBTEAMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sublob")
@CrossOrigin("*")
public class SUBLOBTEAMController {

    @Autowired
    private SUBLOBTEAMRepository subLOBRepository;

    @PostMapping
    public SUBLOBTEAM save(@RequestBody SUBLOBTEAM sublob) {
        return subLOBRepository.save(sublob);
    }

    @GetMapping
    public List<SUBLOBTEAM> getAll() {
        return subLOBRepository.findAll();
    }
}

