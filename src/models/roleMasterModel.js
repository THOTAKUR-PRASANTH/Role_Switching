const mongoose =  require('../dao/MongooesConfig').mongoose;

const roleMasterSchema = new mongoose.Schema({
  role_id: {
    type: Number,
    required: true
  },
  role_name: {
    type: String,
    required: true
  },
  role_status: {
    type: Number,
    default: 0
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
  },
  campus_id: {
    type: Number,
    required: true
  },
  project_id: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('role_ms', roleMasterSchema);
