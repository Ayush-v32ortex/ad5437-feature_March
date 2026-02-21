package com.example.employeeservice.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.employeeservice.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    
    Page<Employee> findAll(Pageable pageable);
    
    @Query("SELECT e FROM Employee e WHERE e.firstName LIKE %:search% " +
           "OR e.lastName LIKE %:search% OR e.email LIKE %:search%")
    Page<Employee> searchEmployees(@Param("search") String search, Pageable pageable);
    
    Page<Employee> findByDepartmentId(Long departmentId, Pageable pageable);
    
    Page<Employee> findByOrganizationId(Long organizationId, Pageable pageable);
}
