

const TeamDetails = ({team}) => {
    return (
        <div className="p-5 ml-5 my-3 w-1/2 bg-slate-300 rounded-md">
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
    );
}

export default TeamDetails;