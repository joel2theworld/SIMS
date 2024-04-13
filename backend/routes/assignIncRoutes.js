const express = require("express");
const router = express.Router();
const {
  getAssignInc,
  setAssignInc,
  deleteAssignInc,
  allAssigned, getAssignRole, assignRolePost, getAssignStudRole, assignRoleStdPost
} = require("../controllers/assignIncController");
const {protect} = require('../middleware/authMiddleware')

router.route("/").post(protect,setAssignInc);

router.route("/assignrole").post(protect,assignRolePost);
router.route("/assignstudentrole").post(protect,assignRoleStdPost);

router.get('/allassigned', protect, allAssigned)
router.get('/assignrole', protect, getAssignRole)
router.get('/assignstudentrole', protect, getAssignStudRole)

router.route("/assignstaff/:id").get(protect,getAssignInc).delete(protect,deleteAssignInc).post(protect, setAssignInc)




module.exports = router;
