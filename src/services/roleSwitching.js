const MenuAccessRoleDAO = require('../dao/menuAccessRolesDAO');
const MenuIdsDAO = require('../dao/menuIdsDAO');

class RoleSwitching {

    constructor() {
        this.menuAccessRolesDAO = new MenuAccessRoleDAO();
        this.menuIdsDAO = new MenuIdsDAO();
    }
    async menuStructure(userData) {
        try {
    
            const accessList = await this.menuAccessRolesDAO.menuAccessEntriesUserRole(userData.default_role_id);
    
            let menuStructure = [];
            let currentMainMenu = null;
    
            for (const accessItem of accessList) {
    
                const menuDetails = await this.menuIdsDAO.menuDetails(accessItem.menu_code);
                if (!menuDetails) {
                    continue;
                }
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
    
  
}

module.exports = RoleSwitching;