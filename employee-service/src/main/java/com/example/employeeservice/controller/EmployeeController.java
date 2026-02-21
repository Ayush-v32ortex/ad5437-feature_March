package com.example.employeeservice.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeeservice.entity.Employee;
import com.example.employeeservice.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            Employee emp = employee.get();
            Map<String, Object> response = Map.of(
                    "employee", Map.of(
                            "id", emp.getId(),
                            "firstName", emp.getFirstName(),
                            "lastName", emp.getLastName(),
                            "email", emp.getEmail(),
                            "phoneNumber", emp.getPhoneNumber(),
                            "hireDate", emp.getHireDate()
                    ),
                    "department", Map.of(
                            "id", emp.getDepartment().getId(),
                            "departmentName", emp.getDepartment().getDepartmentName(),
                            "departmentDescription", emp.getDepartment().getDepartmentDescription(),
                            "departmentCode", emp.getDepartment().getDepartmentCode()
                    ),
                    "organization", Map.of(
                            "id", emp.getOrganization().getId(),
                            "organizationName", emp.getOrganization().getOrganizationName(),
                            "organizationDescription", emp.getOrganization().getOrganizationDescription(),
                            "organizationCode", emp.getOrganization().getOrganizationCode()
                    )
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getEmployeeByEmail(@PathVariable String email) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        if (employeeService.deleteEmployee(id)) {
            return ResponseEntity.ok("Employee deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }
}


