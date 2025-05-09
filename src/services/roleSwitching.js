const MenuAccessRoleDAO = require('../dao/menuAccessRolesDAO');
const MenuIdsDAO = require('../dao/menuIdsDAO');
const EmployeeRoleDAO = require('../dao/employeeRoleDAO');
const RoleMasterDAO = require('../dao/roleMasterDAO');

class RoleSwitching {

    constructor() {
        this.menuAccessRolesDAO = new MenuAccessRoleDAO();
        this.menuIdsDAO = new MenuIdsDAO();
        this.employeeRolesDAO = new EmployeeRoleDAO();
        this.roleMasterDAO = new RoleMasterDAO();  
    }
   
    async menuStructure(userData) {
        try {
            const accessList = await this.menuAccessRolesDAO.menuAccessEntriesUserRole(userData.default_role_id);
    
            let menuStructure = [];
            let currentMainMenu = null;
    
            for (const accessItem of accessList) {
                const menuDetails = await this.menuIdsDAO.menuDetails(accessItem.menu_code);
                if (!menuDetails) continue;
    
                const menuName = menuDetails.menu_name;
                let menuURL = menuDetails.controller_ref;
                if (menuName === "Admission Form" && userData.foreignUrl) {
                    menuURL = userData.foreignUrl;
                }
    
                if (accessItem.mposition === 1) {
                    if (currentMainMenu) {
                        menuStructure.push(currentMainMenu);
                    }
                    currentMainMenu = {
                        menuName: menuName,
                        url: menuURL,  
                        submenu: []
                    };
    
                } else if (accessItem.mposition === 2 && currentMainMenu) {
                    currentMainMenu.submenu.push({
                        menuName: menuName,
                        url: menuURL
                    });
                }
            }
            if (currentMainMenu) {
                menuStructure.push(currentMainMenu);
            }
    
            return menuStructure;
    
        } catch (error) {
            console.error('Error building menu structure:', error);
            throw error;
        }
    }
    
    async getRoles(userData) {
        try {   
            const roles = await this.employeeRolesDAO.getRoles(userData.userid);
            const rolesWithNames = [];
            for (const role of roles) {
                const roleDetails = await this.roleMasterDAO.getRoleDetails(role);
                if (roleDetails) {
                rolesWithNames.push(roleDetails);
                }
            }
            return rolesWithNames;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    }






  
}

module.exports = RoleSwitching;