const mongoose =  require('../dao/MongooesConfig').mongoose;

const employeeRoleSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    required: true
  },
  rolmas_role_id: {
    type: Number,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  last_access_timestamp: {
    type: String,
    required: true
  },
  log_userid: {
    type: Number,
    required: true
  },
  log_timestamp: {
    type: String,
    required: true
  },
  log_ipaddress: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('employee_roles_assigns', employeeRoleSchema);
