export async function teamExists(teamID) {
    const requestOptions = {
        method: 'GET'
    }
    
    const response = await fetch('/api/teams/teamid/' + teamID, requestOptions);
    
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function playerExists(playerID) {
    const requestOptions = {
        method: 'GET'
    }
    
    const response = await fetch('/api/players/playerid/' + playerID, requestOptions);
    
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function updateTeam(team) {
    const apiBody = convertToMongoSchema(team);

    const requestOptions = {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiBody)
    }
    const response = await fetch('/api/teams/teamid/' + team.teamID, requestOptions);

    if (response.ok) {
        console.log('Updated record for ' + apiBody.teamCity);
    }
}

export async function updatePlayer(player) {
    const apiBody = convertPlayerToMongoSchema(player);

    const requestOptions = {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiBody)
    }
    const response = await fetch('/api/players/playerid/' + player.playerID, requestOptions);

    if (response.ok) {
        console.log('Updated record for ' + apiBody.espnName);
    }
}

export async function getTeamsFromDB() {
    const requestOptions = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('/api/teams', requestOptions);
    const json = await response.json();

    if (response.ok) {
        return (json);
    }
}

export async function getPlayersFromDB() {
    const requestOptions = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('/api/players', requestOptions);
    const json = await response.json();

    if (response.ok) {
        return (json);
    }
}

export async function getTeamRoster(teamID) {
    const requestOptions = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('/api/players/team/' + teamID, requestOptions);
    const json = await response.json();

    if (response.ok) {
        return (json);
    }
}

export function convertToMongoSchema(team) {
    let teamObj = null;
    try {
        teamObj = {
            teamAbv: team.teamAbv,
            teamCity: team.teamCity,
            loss: team.loss,
            teamName: team.teamName,
            nflComLogo1: team.nflComLogo1,
            teamID: team.teamID,
            tie: team.tie,
            ptsAgainst: team.pa,
            ptsFor: team.pf,
            espnLogo1: team.espnLogo1,
            wins: team.wins,
            currentStreak: {
                result: team.currentStreak.result,
                length: team.currentStreak.length
            },
            teamStats: {
                Rushing: {
                    rushYds: team.teamStats.Rushing.rushYds,
                    carries: team.teamStats.Rushing.carries,
                    rushTD: team.teamStats.Rushing.rushTD
                },
                Passing: {
                    passAttempts: team.teamStats.Passing.passAttempts,
                    passTD: team.teamStats.Passing.passTD,
                    passYds: team.teamStats.Passing.passYds,
                    int: team.teamStats.Passing.int,
                    passCompletions: team.teamStats.Passing.passCompletions
                },
                Receiving: {
                    receptions: team.teamStats.Receiving.receptions,
                    recTD: team.teamStats.Receiving.recTD,
                    targets: team.teamStats.Receiving.targets,
                    recYds: team.teamStats.Receiving.recYds
                },
                Defense: {
                    totalTackles: team.teamStats.Defense.totalTackles,
                    defTD: team.teamStats.Defense.defTD,
                    soloTackles: team.teamStats.Defense.soloTackles,
                    defensiveInterceptions: team.teamStats.Defense.defensiveInterceptions,
                    qbHits: team.teamStats.Defense.qbHits,
                    tfl: team.teamStats.Defense.tfl,
                    passDeflections: team.teamStats.Defense.passDeflections,
                    sacks: team.teamStats.Defense.sacks
                }
            }
        }
    } catch (ex) {
        console.log(ex);
    }

    return teamObj;
}

export function convertPlayerToMongoSchema(player) {
    let playerObj = null;
    try {
        playerObj = {
            jerseyNum: player.jerseyNum,
            espnName: player.espnName,
            cbsLongName: player.cbsLongName,
            yahooLink: player.yahooLink,
            lastGamePlayed: player.lastGamePlayed,
            espnLink: player.espnLink,
            yahooPlayerID: player.yahooPlayerID,
            pos: player.pos,
            school: player.school,
            teamID: player.teamID,
            injury: player.injury,
            rotoWirePlayerIDFull: player.rotoWirePlayerIDFull,
            rotoWirePlayerID: player.rotoWirePlayerID,
            exp: player.exp,
            height: player.height,
            espnHeadshot: player.espnHeadshot,
            espnID: player.espnID,
            cbsPlayerIDFull: player.cbsPlayerIDFull,
            weight: player.weight,
            team: player.team,
            espnIDFull: player.espnIDFull,
            bDay: player.bDay,
            age: player.age,
            longName: player.longName,
            playerID: player.playerID,
            stats: player.stats
        }
    } catch (ex) {
        console.log(ex);
    }
    
    // try {
    //     playerObj = {
    //         jerseyNum: player.jerseyNum,
    //         espnName: player.espnName,
    //         cbsLongName: player.cbsLongName,
    //         yahooLink: player.yahooLink,
    //         lastGamePlayed: player.lastGamePlayed,
    //         espnLink: player.espnLink,
    //         yahooPlayerID: player.yahooPlayerID,
    //         pos: player.pos,
    //         school: player.school,
    //         teamID: player.teamID,
    //         injury: {
    //             description: player.injury.description,
    //             injDate: player.injury.injDate,
    //             designation: player.injury.designation
    //         },
    //         rotoWirePlayerIDFull: player.rotoWirePlayerIDFull,
    //         rotoWirePlayerID: player.rotoWirePlayerID,
    //         exp: player.exp,
    //         height: player.height,
    //         espnHeadshot: player.espnHeadshot,
    //         espnID: player.espnID,
    //         cbsPlayerIDFull: player.cbsPlayerIDFull,
    //         weight: player.weight,
    //         team: player.team,
    //         espnIDFull: player.espnIDFull,
    //         bDay: player.bDay,
    //         age: player.age,
    //         longName: player.longName,
    //         playerID: player.playerID,
    //         stats: {
    //             Rushing: {
    //                 rushYds: player.stats.Rushing.rushYds,
    //                 carries: player.stats.Rushing.carries,
    //                 rushTD: player.stats.Rushing.rushTD
    //             },
    //             Passing: {
    //                 passAttempts: player.stats.Passing.passAttempts,
    //                 passTD: player.stats.Passing.passTD,
    //                 passYds: player.stats.Passing.passYds,
    //                 int: player.stats.Passing.int,
    //                 passCompletions: player.stats.Passing.passCompletions
    //             },
    //             Receiving: {
    //                 receptions: player.stats.Receiving.receptions,
    //                 recTD: player.stats.Receiving.recTD,
    //                 targets: player.stats.Receiving.targets,
    //                 recYds: player.stats.Receiving.recYds
    //             },
    //             gamesPlayed: player.stats.gamesPlayed,
    //             teamID: player.stats.teamID,
    //             team: player.stats.team,
    //             teamAbv: player.stats.teamAbv,
    //             Defense: {
    //                 totalTackles: player.stats.Defense.totalTackles,
    //                 defTD: player.stats.Defense.defTD,
    //                 soloTackles: player.stats.Defense.soloTackles,
    //                 defensiveInterceptions: player.stats.Defense.defensiveInterceptions,
    //                 qbHits: player.stats.Defense.qbHits,
    //                 tfl: player.stats.Defense.tfl,
    //                 passDeflections: player.stats.Defense.passDeflections,
    //                 sacks: player.stats.Defense.sacks
    //             }
    //         }
    //     }
    // } catch (ex) {
    //     console.log(ex);
    // }

    return playerObj;
}