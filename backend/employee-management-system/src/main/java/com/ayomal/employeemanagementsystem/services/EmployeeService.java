package com.ayomal.employeemanagementsystem.services;

import com.ayomal.employeemanagementsystem.entity.Employee;
import com.ayomal.employeemanagementsystem.payload.EmployeeDTO;
import com.ayomal.employeemanagementsystem.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository=employeeRepository;
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee =new Employee();
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employeeRepository.save(employee);
        return employeeDTO;
    }

    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employeeEntities= employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOS =employeeEntities
                .stream()
                .map(emp->new EmployeeDTO(
                emp.getId(),
                emp.getFirstName(),
                emp.getLastName(),
                emp.getEmail()))
                .collect(Collectors.toList());
        return employeeDTOS;
    }

    public Boolean deleteEmployee(Long id) {
        Employee employee=employeeRepository.findById(id).orElse(null);
        employeeRepository.delete(employee);
        return true;
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee=employeeRepository.findById(id).orElse(null);
        if(employee == null){
            System.out.println("No Employee present");
        }
        EmployeeDTO employeeDTO=new EmployeeDTO();
        BeanUtils.copyProperties(employee,employeeDTO);
        return employeeDTO;
    }

    public ResponseEntity<EmployeeDTO> updateEmployee(Long id, EmployeeDTO updatedEmployee) {
        Employee employee=employeeRepository.findById(id).orElse(null);
        if(employee == null){
            System.out.println("No Employee present");
        }
        BeanUtils.copyProperties(updatedEmployee,employee);
        employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }
}
