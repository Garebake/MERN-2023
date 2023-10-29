const TeamRoster = ({team, roster}) => {
    return (
        <div>
            <div className="p-5 ml-5 my-3 w-2/3 bg-slate-300 rounded-md">
                <div className="flex flex-row">
                    <img className="mr-1  w-12 h-12" src={team.espnLogo1} alt="Logo" />
                    <h2 className="self-center font-extrabold">{team.teamCity + " " + team.teamName}</h2>
                </div>
                <ul>
                    <li><strong>Record: </strong>({team.wins + "-" + team.loss})</li>
                    <li><strong>Passing Yards: </strong>{team.teamStats.Passing.passYds} yds</li>
                    <li><strong>Rushing Yards: </strong>{team.teamStats.Rushing.rushYds} yds</li>
                    <li><strong>Receiving Yards: </strong>{team.teamStats.Receiving.recYds} yds</li>
                    <li><strong>Defensive Sacks: </strong>{team.teamStats.Defense.sacks}</li>
                </ul>
            </div>
            <table className="p-5 ml-5 my-3 w-2/3 border-collapse border border-black">
                <thead>
                    <tr>
                        <th className="text-left bg-blue-500 border border-black">Position</th>
                        <th className="text-left bg-blue-500 border border-black">Name</th>
                        <th className="text-left bg-blue-500 border border-black">Age</th>
                        <th className="text-left bg-blue-500 border border-black">Height</th>
                        <th className="text-left bg-blue-500 border border-black">College</th>
                        <th className="text-left bg-blue-500 border border-black">Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {roster && JSON.parse(roster).map((player, index) => (
                        <tr key={index} className="even:bg-gray-300">
                            <td className="text-left border border-black">{player.pos}</td>
                            <td className="text-left border border-black">{player.espnName}</td>
                            <td className="text-left border border-black">{player.age}</td>
                            <td className="text-left border border-black">{player.height}</td>
                            <td className="text-left border border-black">{player.school}</td>
                            <td className="text-left border border-black">{player.exp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <ul>
                {roster && JSON.parse(roster).map((player) => (
                    <li key={player.playerID}>{player.pos} - {player.espnName}</li>
                ))}
            </ul> */}
            {/* <p>{roster}</p> */}
        </div> 
    );
}

export default TeamRoster;