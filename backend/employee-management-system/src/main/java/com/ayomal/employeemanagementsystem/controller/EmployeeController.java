package com.ayomal.employeemanagementsystem.controller;

import com.ayomal.employeemanagementsystem.payload.EmployeeDTO;
import com.ayomal.employeemanagementsystem.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private EmployeeService employeeService;
    private ModelMapper modelMapper;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService=employeeService;
    }

    @PostMapping("/employee")
    public EmployeeDTO createEmployee(@RequestBody EmployeeDTO employee){
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/employee")
    public List<EmployeeDTO> getEmployees(){
        return employeeService.getAllEmployees();
    }

    @GetMapping("/employee/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employee){
        return employeeService.updateEmployee(id,employee);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        Boolean isDeleted=false;
        isDeleted=employeeService.deleteEmployee(id);
        Map<String,Boolean> response=new HashMap<>();
        response.put("deleted",isDeleted);
        return ResponseEntity.ok(response);
    }


}
