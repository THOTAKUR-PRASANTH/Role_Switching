const menuAccessRolesModel = require('../models/menuAccessRolesModel');

class MenuAccessRolesDAO {  

    async menuAccessEntriesUserRole(roleId) {
        try {
            return await menuAccessRolesModel.find({ role_id: roleId }).sort({ morder: 1 });
        }
        catch (error) {
            console.error("Error fetching menu access entries:", error);
            throw new Error("Database query failed");
        }
    }
}

module.exports = MenuAccessRolesDAO ;  
