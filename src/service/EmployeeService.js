import axios from "axios";

const EMPLOYEE_SERVICE_BASE_URL = "http://localhost:9191/api/employees";
const EMPLOYEE_ID = 1;

// Mock data for development/testing
const MOCK_DATA = {
    data: {
        employee: {
            id: 3,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phoneNumber: "+1-555-0123",
            hireDate: "2022-01-15"
        },
        department: {
            id: 1,
            departmentName: "Engineering",
            departmentDescription: "Software development and infrastructure",
            departmentCode: "ENG-001"
        },
        organization: {
            id: 1,
            organizationName: "Tech Solutions Inc.",
            organizationDescription: "Leading technology company",
            organizationCode: "ORG-001"
        }
    }
};

class EmployeeService {

    getEmployee() {
        // Comment out the axios call and uncomment to use live API
         return axios.get(EMPLOYEE_SERVICE_BASE_URL + '/' + EMPLOYEE_ID);

        // Return mock data for development
     //   return Promise.resolve(MOCK_DATA);

        // Alternative: Simulate network delay
        // return new Promise((resolve) => {
        //     setTimeout(() => resolve(MOCK_DATA), 1000);
        // });
    }
}

export default new EmployeeService()
