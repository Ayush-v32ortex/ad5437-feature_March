# Employee Service API - Spring Boot

A Spring Boot REST API for managing employees, departments, and organizations with H2 in-memory database.

## Features

- ✅ RESTful API endpoints for Employee management
- ✅ H2 in-memory database (no setup required)
- ✅ Auto-initializes with sample data
- ✅ CORS enabled for React frontend on localhost:3000
- ✅ Complete CRUD operations
- ✅ Spring Data JPA with proper entity relationships

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Setup Instructions

### 1. Import into STS IDE

1. Open **Spring Tool Suite (STS)**
2. Go to **File** > **Import**
3. Select **Maven** > **Existing Maven Projects**
4. Browse to: `C:\Users\Admin\Documents\Spring_workspace\employee-service`
5. Click **Finish**

### 2. Build the Project

```bash
mvn clean install
```

Or in STS:
- Right-click project → **Run As** → **Maven build**
- Enter goals: `clean install`

### 3. Run the Application

```bash
mvn spring-boot:run
```

Or in STS:
- Right-click project → **Run As** → **Spring Boot App**

### 4. Access the Application

- **API Base URL**: `http://localhost:9191/api`
- **H2 Console**: `http://localhost:9191/h2-console`
  - JDBC URL: `jdbc:h2:mem:employeedb`
  - Username: `sa`
  - Password: (leave empty)

## API Endpoints

### Get Employee by ID
```
GET /api/employees/{id}
```
**Response Format** (matches React component):
```json
{
  "employee": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1-555-0123",
    "hireDate": "2022-01-15"
  },
  "department": {
    "id": 1,
    "departmentName": "Engineering",
    "departmentDescription": "Software development and infrastructure",
    "departmentCode": "ENG-001"
  },
  "organization": {
    "id": 1,
    "organizationName": "Tech Solutions Inc.",
    "organizationDescription": "Leading technology company",
    "organizationCode": "ORG-001"
  }
}
```

### Get All Employees
```
GET /api/employees
```

### Get Employee by Email
```
GET /api/employees/email/{email}
```

### Create Employee
```
POST /api/employees
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1-555-0124",
  "hireDate": "2023-01-15",
  "department": {"id": 1},
  "organization": {"id": 1}
}
```

### Update Employee
```
PUT /api/employees/{id}
Content-Type: application/json
```

### Delete Employee
```
DELETE /api/employees/{id}
```

## Sample Data

The application auto-initializes with:
- **Organization**: Tech Solutions Inc. (ORG-001)
- **Department**: Engineering (ENG-001)
- **Employee**: John Doe (john.doe@example.com)

## Integration with React Frontend

The API is configured to accept requests from `http://localhost:3000`. When the React app makes a request to `http://localhost:9191/api/employees/3`, it will receive the properly formatted response.

**Update React EmployeeService.js to use live API:**

```javascript
// In EmployeeService.js, uncomment this line:
return axios.get(EMPLOYEE_SERVICE_BASE_URL + '/' + EMPLOYEE_ID);

// And comment out the mock data return
```

## Database

- **Type**: H2 (in-memory)
- **Automatic Initialization**: Yes
- **Persistence**: Data is lost when application stops (use H2 file mode for persistence)

## Troubleshooting

- **Port 9191 already in use**: Change `server.port` in `application.properties`
- **CORS Errors**: Ensure React frontend is running on `localhost:3000`
- **H2 Console not accessible**: Check `spring.h2.console.enabled=true` in properties

## Project Structure

```
employee-service/
├── src/main/java/com/example/employeeservice/
│   ├── EmployeeServiceApplication.java    (Main class)
│   ├── config/
│   │   └── DataInitializer.java          (Sample data initialization)
│   ├── controller/
│   │   └── EmployeeController.java       (REST endpoints)
│   ├── service/
│   │   └── EmployeeService.java          (Business logic)
│   ├── repository/
│   │   ├── EmployeeRepository.java
│   │   ├── DepartmentRepository.java
│   │   └── OrganizationRepository.java
│   ├── entity/
│   │   ├── Employee.java
│   │   ├── Department.java
│   │   └── Organization.java
│   └── dto/
│       └── EmployeeResponse.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## License

MIT License
