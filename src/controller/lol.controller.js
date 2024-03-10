import { writeFile } from 'fs/promises'
const token = "RGAPI-a0f0b2c0-505a-4c8c-be82-ec5a5d8874b3";

function fetchRiotAPI(url) {
    return fetch(
        url,
        {
            headers: { "X-Riot-Token": token }
        }
    ).then((data) => data.json());
}

async function getPuuID(gameName, tagLine) {
    const data = await fetchRiotAPI(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    return data.puuid;
}

async function getMatchID(quantity, puuid) {
    const matchID = await fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantity}`);
    return matchID;
}

async function getMatchData(matchID, puuid) {
    console.log(matchID);
    const matchesDataProm = matchID.map((item) => {
        return fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/${item}`).then((response) => {
            return response;
        })
    }); 
    const matchesData = await Promise.all(matchesDataProm)
    return matchesData.map((item) => {
        const participantIndex = item.metadata.participants.indexOf(puuid);
        return {
            matchId: item.metadata.matchId,
            gameMode: item.info.gameMode,
            gameType: item.info.gameType,
            puuid: item.info.participants[participantIndex].puuid,
            win: item.info.participants[participantIndex].win,
            kda: item.info.participants[participantIndex].challenges.kda,
            individualPosition: item.info.participants[participantIndex].individualPosition,
            championId: item.info.participants[participantIndex].championId,
            championName: item.info.participants[participantIndex].championName,
            teamPosition: item.info.participants[participantIndex].teamPosition,
            role: item.info.participants[participantIndex].role,
            lane: item.info.participants[participantIndex].lane
        }
    })
}

(async () => {
    const puuid = await getPuuID("zYoshio", "BR1");
    const matchID = await getMatchID(20, puuid);
    const data = await getMatchData(matchID, puuid);
    await writeFile("data.json" ,JSON.stringify(data, null, 2));
}
)()
