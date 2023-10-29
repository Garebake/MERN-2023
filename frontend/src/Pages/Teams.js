import { useEffect, useState } from "react";
import TeamDetails from "../Components/TeamDetails";
import { teamExists, updateTeam, convertToMongoSchema } from "../Utilities/mongoUtils";

const Teams = () => {
    //SportRadar.io NFL API Key: qa386ffpjzj6zyacvts8mknp

    const [teams, setTeams] = useState(null);
    const [myTeams, setMyTeams] = useState(null);
    const [tankTeamsDone, setTankTeamsDone] = useState(null);
    const [tankTeamsLoaded, setTankTeamsLoaded] = useState(null);

    //Set myTeams on load
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teams');
            const json = await response.json();

            if (response.ok) {
                setMyTeams(json);
            }
        }

        fetchTeams();
    }, []);

    //Tank01 API
    async function getTeams() {
        const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams?rosters=true&schedules=true&topPerformers=true&teamStats=true';
        const options = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': 'e93b868fdfmsh972ff6b442ca245p1a9df7jsn20e4f24276f8',
		        'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
	        }
        };

        try {
	        const response = await fetch(url, options);
            const result = await response.text();
            setTeams(JSON.parse(result).body);
            setTankTeamsDone(true);
        } catch (error) {
	        console.error(error);
        }
    }

    async function addToDB() {
        for (var i = 0; i < teams.length; i++) {
            let teamObj = {};
            const exists = await teamExists(teams[i].teamID);

            if (exists) {
                updateTeam(teams[i]);
                continue;
            } else {
                teamObj = convertToMongoSchema(teams[i]);
                if (teamObj == null) {
                    console.log("Issue with data for " + teams[i].teamCity);
                    continue;
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(teamObj)
                    }
                    const response = await fetch('/api/teams', requestOptions);
            
                    if (response.ok) {
                        console.log('Created record for ' + teamObj.teamCity);
                    }
                } 
            }
        } 
        setTankTeamsLoaded(true);
    }

    return (
        <div className="ml-2">
            <h1 className="text-4xl font-extrabold">Teams</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded" onClick={getTeams}>Get Team Data</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded" onClick={addToDB}>Add to DB</button>

            <p>{!tankTeamsLoaded && tankTeamsDone ? 'Teams data retieved.' : null}</p>
            <p>{tankTeamsLoaded ? 'Teams data loaded into Mongo.' : null}</p>
            <ul>
                {myTeams && myTeams.map((team) => (
                    <TeamDetails key={team.teamID} team={team} />
                ))}
            </ul>
            {teams ? console.log(teams) : null}
        </div>
    )
};

export default Teams;