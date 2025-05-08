const mongoose =  require('../dao/MongooesConfig').mongoose;


const menuIdsSchema = new mongoose.Schema({
  menu_id: Number,
  menu_code: String,
  module_id: Number,
  menu_name: String,
  controller_ref: String,
  icon_name: String,
  lock_status: Number,
  is_collapsible: String,
  project_id: Number,
  campus_id: Number,
  log_userid: Number,
  log_timestamp: String,
  log_ipaddress: String,
});

module.exports = mongoose.model('menu_ids', menuIdsSchema);
