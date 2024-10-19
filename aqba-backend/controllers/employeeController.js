const Employee = require('../models/employeeModel');

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new employee
exports.addEmployee = async (req, res) => {
    const { name, position, email, password } = req.body;
    try {
        const newEmployee = new Employee({ name, position, email, password });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
