const  menuIdsModel = require('../models/menuIdsModel');

class MenuIdsDAO {
    async menuDetails(menucode) {
        try {
            return await menuIdsModel.findOne({ menu_code: menucode });
        } catch (error) {
            console.error("Error fetching menu details:", error);
            throw new Error("Database query failed");
        }
    }
    
}

module.exports = MenuIdsDAO;  