const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
espnID:{type: String},
espnName:{type: String},
espnIDFull:{type: String},
weight:{type: String},
jerseyNum:{type: String},
cbsShortName:{type: String},
team:{type: String},
yahooPlayerID:{type: String},
age:{type: String},
espnLink:{type: String},
yahooLink:{type: String},
bDay:{type: String},
espnHeadshot:{type: String},
rotoWirePlayerIDFull:{type: String},
cbsLongName: {type: String},
injury:{
    description:{type: String},
    injDate:{type: String},
    designation: { type: String }
},
teamID:{type: String},
pos:{type: String},
school:{type: String},
cbsPlayerID:{type: String},
longName:{type: String},
rotoWirePlayerID:{type: String},
height:{type: String},
cbsPlayerIDFull:{type: String},
lastGamePlayed:{type: String},
playerID:{type: String},
exp: {type: String},
stats:{
    Rushing:{
        rushYds:{type: String},
        carries:{type: String},
        rushTD: { type: String }
    },
    Passing:{
        passAttempts:{type: String},
        passTD:{type: String},
        passYds:{type: String},
        int:{type: String},
        passCompletions: { type: String }
    },
    Receiving:{
        receptions:{type: String},
        recTD:{type: String},
        targets:{type: String},
        recYds: { type: String }
    },
    gamesPlayed:{type: String},
    teamID:{type: String},
    team:{type: String},
    teamAbv:{type: String},
    Defense:{
        totalTackles:{type: String},
        defTD:{type: String},
        soloTackles:{type: String},
        defensiveInterceptions:{type: String},
        qbHits:{type: String},
        tfl:{type: String},
        passDeflections:{type: String},
        sacks: { type: String }
    }
}
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);