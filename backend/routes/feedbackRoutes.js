const express = require("express");
const router = express.Router();
const {
  deleteFedback, postFeedback, setFeedback
} = require("../controllers/feedbackController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(setFeedback);
router.route("/:id").delete(protect,deleteFedback)

router.route('/incidentdetails/:id').post(protect,postFeedback)
//.patch(updateIncidentPost);


module.exports = router;
