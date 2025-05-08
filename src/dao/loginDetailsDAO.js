const LoginDetailsModel = require('../models/loginDetailsModel'); 

class LoginDetailsDAO {

    async findOneByuserId(userName) {
        try {
            const user = await LoginDetailsModel.findOne({userid: userName});
            return user;
        } catch (error) {
            console.error("Error in findOneByuserId :::", error);
            throw new Error("Database error while fetching user.");
        }
    }

}
module.exports = LoginDetailsDAO;
