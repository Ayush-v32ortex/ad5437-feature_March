package com.example.employeeservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.employeeservice.entity.Department;
import com.example.employeeservice.entity.Employee;
import com.example.employeeservice.entity.Organization;
import com.example.employeeservice.repository.DepartmentRepository;
import com.example.employeeservice.repository.EmployeeRepository;
import com.example.employeeservice.repository.OrganizationRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            OrganizationRepository organizationRepository,
            DepartmentRepository departmentRepository,
            EmployeeRepository employeeRepository) {
        return args -> {
            // Create Organization
            Organization org = new Organization();
            org.setOrganizationName("Tech Solutions Inc.");
            org.setOrganizationDescription("Leading technology company");
            org.setOrganizationCode("ORG-001");
            organizationRepository.save(org);

            // Create Department
            Department dept = new Department();
            dept.setDepartmentName("Engineering");
            dept.setDepartmentDescription("Software development and infrastructure");
            dept.setDepartmentCode("ENG-001");
            dept.setOrganization(org);
            departmentRepository.save(dept);

            // Create Employee
            Employee emp = new Employee();
            emp.setFirstName("John");
            emp.setLastName("Doe");
            emp.setEmail("john.doe@example.com");
            emp.setPhoneNumber("+1-555-0123");
            emp.setHireDate("2022-01-15");
            emp.setDepartment(dept);
            emp.setOrganization(org);
            employeeRepository.save(emp);

            System.out.println("Database initialized with sample data!");
        };
    }
}
