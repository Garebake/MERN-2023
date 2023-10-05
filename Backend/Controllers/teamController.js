const Team = require('../models/teamModel');
const mongoose = require('mongoose');

//GET all teams
const getTeams = async (req, res) => {
    const teams = await Team.find({}).sort({ teamAbv: 1 });

    res.status(200).json(teams);
}

//GET single team
const getTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID.' });
    }
    const team = await Team.findById(id);

    if (!team) {
        return res.status(404).json({ error: 'Team not found.' });
    }

    res.status(200).json(team);
}

//GET single team by teamID
const getTeamByTeamID = async (req, res) => {
    const { id } = req.params;
    const team = await Team.findOne({teamID: id});

    if (!team) {
        return res.status(404).json({ error: 'Team not found.' });
    }

    res.status(200).json(team);
}

//POST new team
const createTeam = async (req, res) => {
    const { teamAbv, teamCity, loss, teamName, nflLogo, teamID, tie, ptsAgainst, ptsFor, espnLogo, wins, teamStats } = req.body;

    //add doc to db
    try {
        const team = await Team.create({ teamAbv, teamCity, loss, teamName, nflLogo, teamID, tie, ptsAgainst, ptsFor, espnLogo, wins, teamStats });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//DELETE specific team
const deleteTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json('Invalid ID.');
    }

    const team = await Team.findOneAndDelete({ _id: id });

    if (!team) {
        return res.status(400).json({ error: 'Team not found.' });
    }

    res.status(200).json(team);
}

//PATCH specific team
const updateTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID.' });
    }

    const team = await Team.findOneAndUpdate({ _id: id }, {...req.body});

    if (!team) {
        return res.status(400).json({error: 'Team not found.'});
    }

    res.status(200).json(team);
}

//PATCH specific team
const updateTeamByTeamID = async (req, res) => {
    const { id } = req.params;
    const team = await Team.findOneAndUpdate({ teamID: id }, {...req.body});

    if (!team) {
        return res.status(400).json({error: 'Team not found.'});
    }

    res.status(200).json(team);
}



module.exports = {
    createTeam,
    getTeams, 
    getTeam,
    getTeamByTeamID,
    deleteTeam,
    updateTeam,
    updateTeamByTeamID
}