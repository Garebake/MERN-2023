const Player = require('../models/playerModel');
const mongoose = require('mongoose');

//GET all players
const getPlayers = async (req, res) => {
    const players = await Player.find({}).sort({ espnName: 1 });

    res.status(200).json(players);
}

//GET single player
const getPlayer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID.' });
    }
    const player = await Player.findById(id);

    if (!player) {
        return res.status(404).json({ error: 'Player not found.' });
    }

    res.status(200).json(player);
}

//GET single player by playerID
const getPlayerByPlayerID = async (req, res) => {
    const { id } = req.params;
    const player = await Player.findOne({playerID: id});

    if (!player) {
        return res.status(404).json({ error: 'Player not found.' });
    }

    res.status(200).json(player);
}

//GET all players for specific teamID
const getTeamRoster = async (req, res) => {
    const { id } = req.params;
    const players = await Player.find({teamID: id}).sort({ pos: 1, espnName: 1 });

    if (!players) {
        return res.status(404).json({ error: 'Roster not found.' });
    }

    res.status(200).json(players);
}

//POST new player
const createPlayer = async (req, res) => {
    const {espnID, espnName, espnIDFull, weight, jerseyNum, cbsShortName, team, yahooPlayerID, age, espnLink, yahooLink, bDay, espnHeadshot, rotoWirePlayerIDFull, cbsLongName, injury, teamID, pos, school, cbsPlayerID, longName, rotoWirePlayerID, height, cbsPlayerIDFull, lastGamePlayed, playerID, exp, stats} = req.body;    //add doc to db
    try {
        const player = await Player.create({espnID, espnName, espnIDFull, weight, jerseyNum, cbsShortName, team, yahooPlayerID, age, espnLink, yahooLink, bDay, espnHeadshot, rotoWirePlayerIDFull, cbsLongName, injury, teamID, pos, school, cbsPlayerID, longName, rotoWirePlayerID, height, cbsPlayerIDFull, lastGamePlayed, playerID, exp, stats});
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//DELETE specific player
const deletePlayer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json('Invalid ID.');
    }

    const player = await Player.findOneAndDelete({ _id: id });

    if (!player) {
        return res.status(400).json({ error: 'Player not found.' });
    }

    res.status(200).json(player);
}

//PATCH specific player
const updatePlayer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID.' });
    }

    const player = await Player.findOneAndUpdate({ _id: id }, {...req.body});

    if (!player) {
        return res.status(400).json({error: 'Player not found.'});
    }

    res.status(200).json(player);
}

//PATCH specific player by playerID
const updatePlayerByPlayerID = async (req, res) => {
    const { id } = req.params;
    const player = await Player.findOneAndUpdate({ playerID: id }, {...req.body});

    if (!player) {
        return res.status(400).json({error: 'Player not found.'});
    }

    res.status(200).json(player);
}



module.exports = {
    createPlayer,
    getPlayers, 
    getPlayer,
    getPlayerByPlayerID,
    getTeamRoster,
    deletePlayer,
    updatePlayer,
    updatePlayerByPlayerID
}