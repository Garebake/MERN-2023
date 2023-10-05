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