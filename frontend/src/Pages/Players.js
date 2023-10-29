import { useEffect, useState } from "react";
import {getTeamsFromDB, convertPlayerToMongoSchema, playerExists, updatePlayer, getPlayersFromDB, getTeamRoster} from "../Utilities/mongoUtils";
import TeamRoster from "../Components/TeamRoster";


const Players = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState(null);
    const [myPlayers, setMyPlayers] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamRoster, setTeamRoster] = useState(null);

    useEffect(() => { // Gets teams from mongoDB on load
        const fetchTeams = async () => {
            const response = await getTeamsFromDB();

            if (response) {
                setTeams(response);
            }
        }

        fetchTeams();
    }, []);

    useEffect(() => { // Update myPlayers state when players state changes
        const fetchPlayers = async () => {
            const response = await getPlayersFromDB();

            if (response) {
                setMyPlayers(response);
            }
        }

        fetchPlayers();
    }, [players]);

    useEffect(() => { // Update teamRoster state when selectedTeam state changes
        if (selectedTeam > -1) {
            const fetchTeam = async () => {
                const response = await getTeamRoster(selectedTeam);

                if (response) {
                    setTeamRoster(response);
                }
            }
            fetchTeam();
        }
    }, [selectedTeam]);

    async function getPlayers() { // Get rosters from tank01 API for each team in mongoDB
        for (let i = 0; i < teams.length; i++) {
            const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeamRoster?teamID=' + teams[i].teamID + '&getStats=true';
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
                setPlayers((players) => [...players, JSON.parse(result).body]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    async function addToDB() { // Update mongoDB with new data from tank01 roster data
        if (!players) {
            alert('No player data retrieved.');
            return;
        }

        for (var j = 0; j < players.length; j++) { // Loop through each team
            console.log(players[j].team + ": " + players[j].roster.length);
            for (var i = 0; i < players[j].roster.length; i++) { // Loop through current team's roster 
                let playerObj = {};
                const exists = await playerExists(players[j].roster[i].playerID);

                if (exists) {
                    updatePlayer(players[j].roster[i]);
                    continue;
                } else {
                    playerObj = convertPlayerToMongoSchema(players[j].roster[i]);
                    if (playerObj == null) {
                        console.log("Issue with data for " + players[i].espnName);
                        continue;
                    } else {
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(playerObj)
                        }
                        const response = await fetch('/api/players', requestOptions);
            
                        if (response.ok) {
                            console.log('Created record for ' + playerObj.espnName);
                        }
                    }
                }
            }
        }
    };
        
    function handleChange(e) { // Set selectedTeam state when selection is made on the teams dropdown
        let value = e.target.value;
        setSelectedTeam(value);
    };

    return (
        <div className="ml-2">
            <h1 className="text-4xl font-extrabold">Players</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded" onClick={getPlayers}>Get Player Data</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded" onClick={addToDB}>Add to DB</button>
            {players ? <p>Team rosters retrieved: {players.length}/32</p> : null}
            
            <select onChange={(e) => handleChange(e)} className="bg-red-600 text-yellow-300 font-bold m-1 py-1 px-2 rounded" name="selectList" id="selectList">
                <option className="bg-red-600 hover:bg-red-800 text-yellow-300 font-bold m-1 py-1 px-2 rounded" value="0">--None--</option>
                {teams && teams.map((team, index) =>
                    <option key={index} value={team.teamID}>{team.teamCity} {team.teamName}</option>
                )}
            </select>

            {selectedTeam && selectedTeam !== -1 ? <TeamRoster team={teams[selectedTeam-1]} roster={JSON.stringify(teamRoster)} /> : null}
        </div>
    )
}

export default Players;