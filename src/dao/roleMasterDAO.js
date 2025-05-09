const roleMasterModel = require('../models/roleMasterModel'); 

class RoleMasterDAO {
    async getRoleDetails(roleId) {
        try {
            const roleDetails = await roleMasterModel.findOne({ role_id: roleId });      
            return {
                roleId: roleDetails.role_id,
                roleName: roleDetails.role_name,
            };
        } catch (error) {
            console.error('Error fetching role details:', error);
            throw error;
        }
}
}
module.exports = RoleMasterDAO; 