const mongoose =  require('../dao/MongooesConfig').mongoose;


const menuAccessRoleSchema = new mongoose.Schema({
  menu_id: Number,
  menu_code: String,
  morder: Number,
  mposition: Number,
  role_id: Number,
  log_userid: Number,
  log_timestamp: String,
  log_ipaddress: String,
});

module.exports = mongoose.model('menu_access_roles', menuAccessRoleSchema);
