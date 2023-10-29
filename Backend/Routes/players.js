const express = require('express');
const { createPlayer, getPlayers, getPlayer, getPlayerByPlayerID, updatePlayer, updatePlayerByPlayerID, deletePlayer, getTeamRoster } = require('../Controllers/playerController');
const router = express.Router();

// GET all Teams
router.get('/', getPlayers);

// GET specific Team
router.get('/:id', getPlayer);

// GET specific Player by playerID
router.get('/playerid/:id', getPlayerByPlayerID);

// GET roster of players by teamID
router.get('/team/:id', getTeamRoster);

// POST a new Team
router.post('/', createPlayer);

// DELETE an existing Player
router.delete('/:id', deletePlayer);

// UPDATE an existing Player
router.patch('/:id', updatePlayer);

// UPDATE an existing Team by teamID
router.patch('/playerid/:id', updatePlayerByPlayerID); 

module.exports = router;