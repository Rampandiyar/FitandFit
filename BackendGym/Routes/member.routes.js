import express from 'express'; // Import express
import memberController from '../Controller/member.controller.js'; // Import your controller
import authenticateUser from '../Middleware/authenticate.js'; // Import your authentication middleware

const router = express.Router(); // Use express.Router() to create a router

// Define routes
router.put('/:id', authenticateUser, memberController.updateMember);
router.delete('/:id', authenticateUser, memberController.deleteMember);

export default router; // Use export default for ES module syntax
