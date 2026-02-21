import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EmployeeService from "../service/EmployeeService";

// Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange }) => {
    return (
        <ul className='nav nav-tabs mt-5' role='tablist'>
            <li className='nav-item'>
                <a 
                    className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                    href='#view' 
                    onClick={() => onTabChange('view')}
                    role='tab'
                >
                    📋 View Employee
                </a>
            </li>
            <li className='nav-item'>
                <a 
                    className={`nav-link ${activeTab === 'edit' ? 'active' : ''}`}
                    href='#edit' 
                    onClick={() => onTabChange('edit')}
                    role='tab'
                >
                    ✏️ Edit Employee
                </a>
            </li>
            <li className='nav-item'>
                <a 
                    className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
                    href='#create' 
                    onClick={() => onTabChange('create')}
                    role='tab'
                >
                    ➕ Create Employee
                </a>
            </li>
            <li className='nav-item'>
                <a 
                    className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                    href='#list' 
                    onClick={() => onTabChange('list')}
                    role='tab'
                >
                    📑 Employee List
                </a>
            </li>
        </ul>
    );
};

TabNavigation.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};

// View Details Component
const ViewDetails = ({ data, onEdit, onDelete, onRefresh }) => {
    if (!data.employee || Object.keys(data.employee).length === 0) {
        return (
            <div className='alert alert-info col-md-8 offset-md-2 mt-3'>
                <p>No employee data available.</p>
                <button className='btn btn-sm btn-primary' onClick={onRefresh}>
                    🔄 Load Employee
                </button>
            </div>
        );
    }

    return (
        <div className='col-md-8 offset-md-2 mt-3'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    <h4 className='mb-0'>Employee Information</h4>
                </div>
                <div className='card-body'>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <p><strong>First Name:</strong><br/> {data.employee.firstName}</p>
                        </div>
                        <div className='col-md-6'>
                            <p><strong>Last Name:</strong><br/> {data.employee.lastName}</p>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <p><strong>Email:</strong><br/> <a href={`mailto:${data.employee.email}`}>{data.employee.email}</a></p>
                        </div>
                        <div className='col-md-6'>
                            <p><strong>Phone:</strong><br/> {data.employee.phoneNumber || 'N/A'}</p>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <p><strong>Hire Date:</strong><br/> {data.employee.hireDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card mt-3'>
                <div className='card-header bg-info text-white'>
                    <h5 className='mb-0'>Department</h5>
                </div>
                <div className='card-body'>
                    <p><strong>Name:</strong><br/> {data.department?.departmentName}</p>
                    <p><strong>Code:</strong><br/> {data.department?.departmentCode}</p>
                    <p><strong>Description:</strong><br/> {data.department?.departmentDescription}</p>
                </div>
            </div>

            <div className='card mt-3'>
                <div className='card-header bg-success text-white'>
                    <h5 className='mb-0'>Organization</h5>
                </div>
                <div className='card-body'>
                    <p><strong>Name:</strong><br/> {data.organization?.organizationName}</p>
                    <p><strong>Code:</strong><br/> {data.organization?.organizationCode}</p>
                    <p><strong>Description:</strong><br/> {data.organization?.organizationDescription}</p>
                </div>
            </div>

            <div className='mt-3'>
                <button className='btn btn-primary me-2' onClick={onEdit}>
                    ✏️ Edit
                </button>
                <button className='btn btn-danger me-2' onClick={onDelete}>
                    🗑️ Delete
                </button>
                <button className='btn btn-secondary' onClick={onRefresh}>
                    🔄 Refresh
                </button>
            </div>
        </div>
    );
};

ViewDetails.propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};

// Edit Form Component
const EditEmployeeForm = ({ employee, onSave, onCancel, isSaving }) => {
    const [formData, setFormData] = useState({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        hireDate: employee.hireDate || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className='col-md-8 offset-md-2 mt-3'>
            <form onSubmit={handleSubmit} className='card'>
                <div className='card-header bg-warning text-dark'>
                    <h4 className='mb-0'>Edit Employee Details</h4>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>First Name</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Last Name</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Email</strong></label>
                            <input 
                                type='email' 
                                className='form-control' 
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Phone</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Hire Date</strong></label>
                            <input 
                                type='date' 
                                className='form-control' 
                                name='hireDate'
                                value={formData.hireDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <button type='submit' className='btn btn-success me-2' disabled={isSaving}>
                        {isSaving ? 'Saving...' : '✅ Save Changes'}
                    </button>
                    <button type='button' className='btn btn-secondary' onClick={onCancel} disabled={isSaving}>
                        ❌ Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

EditEmployeeForm.propTypes = {
    employee: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
};

// Create Employee Form Component
const CreateEmployeeForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('✅ Employee created successfully!');
            setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', hireDate: '' });
            setTimeout(() => setMessage(''), 3000);
            if (onSuccess) onSuccess();
        } catch (err) {
            setMessage('❌ Failed to create employee');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='col-md-8 offset-md-2 mt-3'>
            {message && (
                <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className='card'>
                <div className='card-header bg-success text-white'>
                    <h4 className='mb-0'>Create New Employee</h4>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>First Name</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder='Enter first name'
                            />
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Last Name</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder='Enter last name'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Email</strong></label>
                            <input 
                                type='email' 
                                className='form-control' 
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Enter email'
                            />
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Phone</strong></label>
                            <input 
                                type='text' 
                                className='form-control' 
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder='Enter phone number'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'><strong>Hire Date</strong></label>
                            <input 
                                type='date' 
                                className='form-control' 
                                name='hireDate'
                                value={formData.hireDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <button type='submit' className='btn btn-success' disabled={isSaving}>
                        {isSaving ? 'Creating...' : '✅ Create Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

CreateEmployeeForm.propTypes = {
    onSuccess: PropTypes.func,
};

// Employee List Component
const EmployeeList = ({ employees }) => {
    return (
        <div className='col-md-10 offset-md-1 mt-3'>
            <div className='card'>
                <div className='card-header bg-dark text-white'>
                    <h4 className='mb-0'>Employee List</h4>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Hire Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map(emp => (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.firstName} {emp.lastName}</td>
                                            <td><a href={`mailto:${emp.email}`}>{emp.email}</a></td>
                                            <td>{emp.phoneNumber || 'N/A'}</td>
                                            <td>{emp.hireDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='5' className='text-center text-muted'>No employees available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

EmployeeList.propTypes = {
    employees: PropTypes.array.isRequired,
};

// Main Component
const EmployeeComponent = () => {
    const [activeTab, setActiveTab] = useState('view');
    const [data, setData] = useState({
        employee: {},
        department: {},
        organization: {}
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await EmployeeService.getEmployee();
                
                if (response && response.data) {
                    setData({
                        employee: response.data.employee || {},
                        department: response.data.department || {},
                        organization: response.data.organization || {}
                    });
                }
            } catch (err) {
                setError(err.message || 'Failed to load employee data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [retryCount]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleEdit = () => {
        setActiveTab('edit');
    };

    const handleSaveEdit = async (formData) => {
        try {
            setIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(prev => ({
                ...prev,
                employee: { ...prev.employee, ...formData }
            }));
            setSuccessMessage('✅ Employee updated successfully!');
            setActiveTab('view');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            setData({ employee: {}, department: {}, organization: {} });
            setSuccessMessage('✅ Employee deleted!');
            setActiveTab('create');
        }
    };

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className='mt-5 text-center'>
                <div className='spinner-border text-primary'></div>
                <p className='mt-3'>Loading...</p>
            </div>
        );
    }

    if (error && activeTab === 'view') {
        return (
            <div className='mt-5'>
                <div className='alert alert-danger col-md-6 offset-md-3'>
                    <strong>Error:</strong> {error}
                    <button className='btn btn-sm btn-primary ms-2' onClick={handleRetry}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='container-fluid'>
            {successMessage && (
                <div className='alert alert-success alert-dismissible fade show mt-3' role='alert'>
                    {successMessage}
                </div>
            )}
            
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <div className='tab-content'>
                {activeTab === 'view' && (
                    <ViewDetails 
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onRefresh={handleRetry}
                    />
                )}

                {activeTab === 'edit' && (
                    <EditEmployeeForm 
                        employee={data.employee}
                        onSave={handleSaveEdit}
                        onCancel={() => setActiveTab('view')}
                        isSaving={isSaving}
                    />
                )}

                {activeTab === 'create' && (
                    <CreateEmployeeForm 
                        onSuccess={() => setActiveTab('view')}
                    />
                )}

                {activeTab === 'list' && (
                    <EmployeeList employees={employees.length > 0 ? employees : [data.employee]} />
                )}
            </div>
        </div>
    );
};

export default EmployeeComponent;
