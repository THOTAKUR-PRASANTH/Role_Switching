const employeeRoleModel = require('../models/employeeRoleModel');

class EmployeeRoleDAO {
    async getRoles(employeeId) {
        try {
            const roles = await employeeRoleModel.find(
                { employee_id: employeeId },
                { rolmas_role_id: 1, _id: 0 } 
            );
            return roles.map(role => role.rolmas_role_id);
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    }

}
module.exports = EmployeeRoleDAO;