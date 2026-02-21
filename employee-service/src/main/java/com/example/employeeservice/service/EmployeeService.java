package com.example.employeeservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeeservice.entity.Employee;
import com.example.employeeservice.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            Employee existingEmployee = employee.get();
            if (employeeDetails.getFirstName() != null) {
                existingEmployee.setFirstName(employeeDetails.getFirstName());
            }
            if (employeeDetails.getLastName() != null) {
                existingEmployee.setLastName(employeeDetails.getLastName());
            }
            if (employeeDetails.getEmail() != null) {
                existingEmployee.setEmail(employeeDetails.getEmail());
            }
            if (employeeDetails.getPhoneNumber() != null) {
                existingEmployee.setPhoneNumber(employeeDetails.getPhoneNumber());
            }
            if (employeeDetails.getHireDate() != null) {
                existingEmployee.setHireDate(employeeDetails.getHireDate());
            }
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }

    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


