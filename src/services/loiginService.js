const crypto = require('crypto');
const LoginDetailsDAO = require('../dao/LoginDetailsDAO');
const MenuAccessRoleDAO = require('../dao/menuAccessRolesDAO');
const MenuIdsDAO = require('../dao/menuIdsDAO');
const RoleSwitching = require('../services/roleSwitching');

class LoginService{

    constructor() {
        this.loginDetailsDao = new LoginDetailsDAO(); 
        this.menuAccessRolesDAO = new MenuAccessRoleDAO();
        this.menuIdsDAO = new MenuIdsDAO();
        this.roleSwitching = new RoleSwitching();
    }

    async loginUser(userName, password) {
        const user = await this.loginDetailsDao.findOneByuserId(userName);
        if (!user) {
            const error = new Error("Invalid username or password.");
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = this.hashPassword(password);
        if (user.passwd !== hashedPassword) {
            const error = new Error("Invalid username or password.");
            error.statusCode = 401;
            throw error;
        }
        return user;
    }

    hashPassword(password) {
        const hash = crypto.createHash('sha512');
        hash.update(password);
        return hash.digest('base64');
    }

    async studentRole(userData) {
        return this.roleSwitching.menuStructure(userData);
    }

    async employeeRole() {
        return this.roleSwitching.menuStructure(userData);
    }


}

module.exports = {LoginService};

