const {LoginService}  = require('../services/loiginService');
const { getUserInfo, createToken } = require('../middleware/authorizationFilter');

class LoginHandler{

    constructor() {
        this.loginService = new LoginService();
    }

    loginHandler = async (req, res) => {
        try {
            const { userName, password } = req.body;

            if (!userName || !password) {
                return res.status(400).json({ status: "Failure", error: "Username and Password are required." });
            }
            const user = await this.loginService.loginUser(userName, password);
            const userInfo = await getUserInfo(user);
            const tokenDetails = await createToken(userInfo);
            let additionalData = null;
    
            if (user.default_role_id === 1) {
                additionalData = await this.loginService.studentRole(user);
            } else {
               additionalData = await this.loginService.employeeRole(user);
            }

            return res.status(200).json({
                status: "Success",
                message: "Login Successful",
                token: tokenDetails.token,   
                expiresIn: tokenDetails.expires,
                user: tokenDetails.user,
                rollBasedData: additionalData,
            });

        } catch (error) {
            console.error("Login Error :::", error.message);
            return res.status(error.statusCode || 500).json({ 
                status: "Failure", 
                error: error.message || "Internal Server Error" 
            });
        }
    };



}
module.exports = {LoginHandler};


