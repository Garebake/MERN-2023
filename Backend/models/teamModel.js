const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamAbv: {type: String},
    teamCity: {type: String},
    loss: {type: String}, 
    teamName: {type: String}, 
    nflComLogo1: {type: String}, 
    teamID: {type: String}, 
    tie: {type: String}, 
    ptsAgainst: {type: String}, 
    ptsFor: {type: String}, 
    espnLogo1: {type: String}, 
    wins: { type: String }, 
    currentStreak: {
        result: {type: String},
        length: {type: String}
    },
    teamStats: {
        Rushing: {
            rushYds: {type: String},
            carries: {type: String},
            rushTD: {type: String}
        }, 
        Passing: {
            passAttempts: {type: String},
            passTD: {type: String},
            passYds: {type: String},
            int: {type: String},
            passCompletions: {type: String}
        },
        Receiving: {
            receptions: {type: String},
            recTD: {type: String},
            targets: {type: String},
            recYds: {type: String}
        },
        Defense: {
            totalTackles: {type: String},
            defTD: {type: String},
            soloTackles: { type: String },
            defensiveInterceptions: { type: String },
            qbHits: { type: String },
            tfl: { type: String },
            passDeflections: { type: String },
            sacks: {type: String}
        }
    }, 
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);