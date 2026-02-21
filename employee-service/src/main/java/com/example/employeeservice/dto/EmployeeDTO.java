package com.example.employeeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String hireDate;
    private DepartmentDTO department;
    private OrganizationDTO organization;

    public EmployeeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeDTO(Long id, String firstName, String lastName, String email, String phoneNumber, String hireDate,
			DepartmentDTO department, OrganizationDTO organization) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.hireDate = hireDate;
		this.department = department;
		this.organization = organization;
	}

	@Override
	public String toString() {
		return "EmployeeDTO [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", phoneNumber=" + phoneNumber + ", hireDate=" + hireDate + ", department=" + department
				+ ", organization=" + organization + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getHireDate() {
		return hireDate;
	}

	public void setHireDate(String hireDate) {
		this.hireDate = hireDate;
	}

	public DepartmentDTO getDepartment() {
		return department;
	}

	public void setDepartment(DepartmentDTO department) {
		this.department = department;
	}

	public OrganizationDTO getOrganization() {
		return organization;
	}

	public void setOrganization(OrganizationDTO organization) {
		this.organization = organization;
	}

	@Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DepartmentDTO {
        private Long id;
        private String departmentName;
        private String departmentDescription;
        private String departmentCode;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getDepartmentName() {
			return departmentName;
		}
		public void setDepartmentName(String departmentName) {
			this.departmentName = departmentName;
		}
		public String getDepartmentDescription() {
			return departmentDescription;
		}
		public void setDepartmentDescription(String departmentDescription) {
			this.departmentDescription = departmentDescription;
		}
		public String getDepartmentCode() {
			return departmentCode;
		}
		public void setDepartmentCode(String departmentCode) {
			this.departmentCode = departmentCode;
		}
		@Override
		public String toString() {
			return "DepartmentDTO [id=" + id + ", departmentName=" + departmentName + ", departmentDescription="
					+ departmentDescription + ", departmentCode=" + departmentCode + "]";
		}
		public DepartmentDTO(Long id, String departmentName, String departmentDescription, String departmentCode) {
			super();
			this.id = id;
			this.departmentName = departmentName;
			this.departmentDescription = departmentDescription;
			this.departmentCode = departmentCode;
		}
		public DepartmentDTO() {
			super();
			// TODO Auto-generated constructor stub
		}
        
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrganizationDTO {
        private Long id;
        private String organizationName;
        private String organizationDescription;
        public OrganizationDTO() {
			super();
			// TODO Auto-generated constructor stub
		}
		public OrganizationDTO(Long id, String organizationName, String organizationDescription,
				String organizationCode) {
			super();
			this.id = id;
			this.organizationName = organizationName;
			this.organizationDescription = organizationDescription;
			this.organizationCode = organizationCode;
		}
		@Override
		public String toString() {
			return "OrganizationDTO [id=" + id + ", organizationName=" + organizationName + ", organizationDescription="
					+ organizationDescription + ", organizationCode=" + organizationCode + "]";
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getOrganizationName() {
			return organizationName;
		}
		public void setOrganizationName(String organizationName) {
			this.organizationName = organizationName;
		}
		public String getOrganizationDescription() {
			return organizationDescription;
		}
		public void setOrganizationDescription(String organizationDescription) {
			this.organizationDescription = organizationDescription;
		}
		public String getOrganizationCode() {
			return organizationCode;
		}
		public void setOrganizationCode(String organizationCode) {
			this.organizationCode = organizationCode;
		}
		private String organizationCode;
    }
}
