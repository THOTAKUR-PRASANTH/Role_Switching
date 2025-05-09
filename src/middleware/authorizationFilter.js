var jwt = require('jsonwebtoken');
var loginDetailsModel = require("../models/loginDetailsModel");


const getUserInfo = async (user) => {
    const userInfo = {
        userid: user.userid,
        account_status: user.account_status,
        adm_no: user.adm_no,
        alumni_email_id: user.alumni_email_id,
        default_role_id: user.default_role_id,
        last_login_ipaddress: user.last_login_ipaddress,
        last_login_timestamp: user.last_login_timestamp,
        log_timestamp: user.log_timestamp,
        log_userid: user.log_userid,
        login_fail_lock_timestamp: user.login_fail_lock_timestamp,
        mobileno: user.mobileno,
        nick_name: user.nick_name,
        num_fail_attempt: user.num_fail_attempt,
        ofcmail: user.ofcmail,
        ofcmailid_pwd: user.ofcmailid_pwd,
        otp_email: user.otp_email,
        otp_login_timestamp: user.otp_login_timestamp,
        otp_mobile: user.otp_mobile,
        otp_parent_mobile: user.otp_parent_mobile,
        otp_reset_timestamp: user.otp_reset_timestamp,
        passwd_reset_fg: user.passwd_reset_fg,
        passwd_status: user.passwd_status,
        passwd_update_timestamp: user.passwd_update_timestamp,
        roleid: user.roleid,
        thumbnail_photo: user.thumbnail_photo,
        web_parent_fail_attempt: user.web_parent_fail_attempt,
        web_parent_fail_attempt_time: user.web_parent_fail_attempt_time,
        web_parent_otp: user.web_parent_otp
    };
    return userInfo;
};


const createToken =async (user) => {
	let jwtSecretKey = process.env.JWT_SECRET;
	const expiresIn =process.env.JWT_EXP_IN;
	const token = jwt.sign(user,jwtSecretKey,{ expiresIn: expiresIn });
	return{
        token,
        expires: expiresIn,
        user,
    };
}


const verifyjwt = async function (req, res, next) {
	try {
		let tokenHeader = req.headers['authorization'];
		if (tokenHeader) {
			let token = await tokenHeader.split(" ");
            let decoded;
            try {
                decoded = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
                let userObject = await loginDetailsModel.findOne({userid: decoded. userid});
                if(userObject==null)
                    return res.status(401).send({ status: "Failure", error: 'Unauthorized Access.' });
            } catch (error) {
                console.log("Message :::: ", error.message);
            }
			if (decoded) {
				req.user = decoded;
				let currentTime = (new Date().getTime())/1000;
				if(decoded.exp < currentTime)
					return res.status(401).send({ status: "Failure", error: 'Token Validity Expired.' });
				else    
					return next();
			}else{
				return res.status(401).send({ status: "Failure", error: 'Unauthorized Token. User Token required.' });
			}      
		}else{
			return res.status(401).send({ status: "Failure", error: "Unauthorized Token. User Token required." })
		}
	} catch (error) {
		console.log("error ::::: ", error);
		return res.status(401).send({ status: "Failure", error: 'JWT Token is expired.' })
	}
}



module.exports ={getUserInfo,createToken,verifyjwt}