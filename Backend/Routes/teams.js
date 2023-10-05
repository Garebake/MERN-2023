const express = require('express');
const { createTeam, getTeams, getTeam, deleteTeam, updateTeam, getTeamByTeamID, updateTeamByTeamID } = require('../Controllers/teamController');
const router = express.Router();

// GET all Teams
router.get('/', getTeams);

// GET specific Team
router.get('/:id', getTeam);

// GET specific Team by teamID
router.get('/teamid/:id', getTeamByTeamID);

// POST a new Team
router.post('/', createTeam);

// DELETE an existing Team
router.delete('/:id', deleteTeam);

// UPDATE an existing Team
router.patch('/:id', updateTeam);

// UPDATE an existing Team by teamID
router.patch('/teamid/:id', updateTeamByTeamID); 

module.exports = router;