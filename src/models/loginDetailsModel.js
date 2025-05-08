const mongoose =  require('../dao/MongooesConfig').mongoose;

const loginDetailsModel = mongoose.Schema({
    userid: Number,
    account_status: Number,
    adm_no: String,
    alumni_email_id: Number,
    default_role_id: Number,
    last_login_ipaddress: Number,
    last_login_timestamp: String, 
    log_timestamp: String,        
    log_userid: Number,
    login_fail_lock_timestamp: String, 
    mobileno: String,
    nick_name: Number,
    num_fail_attempt: Number,
    ofcmail: String,
    ofcmailid_pwd: Number,
    otp_email: Number,
    otp_login_timestamp: String, 
    otp_mobile: Number,
    otp_parent_mobile: Number,
    otp_reset_timestamp: String, 
    passwd: String,
    passwd_reset_fg: Number,
    passwd_status: Number,
    passwd_update_timestamp: String,
    roleid: Number,
    thumbnail_photo: Number,
    web_parent_fail_attempt: Number,
    web_parent_fail_attempt_time: String,
    web_parent_otp: Number
});


module.exports = mongoose.model('login_details', loginDetailsModel); 