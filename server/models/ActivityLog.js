const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, refPath: "actorModel" },
  actorModel: { type: String, enum: ["User", "Vendor", "Admin"] },
  action: { type: String },
  target: { type: String },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;

