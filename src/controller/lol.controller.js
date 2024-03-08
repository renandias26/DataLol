const token = "RGAPI-33211947-1c4c-4dc7-ab51-5123d643f4e0";

let puuid = ""
let matchID = ""
let matchData = ""

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
    puuid = data.puuid
}

async function getMatchID(quantity) {
    matchID = await fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantity}`);
}

async function getMatchData() {
    const matchesDataProm = matchId.map((item) => {
        fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/${item}`)
    });

    const matchesData = await Promise.all(matchesDataProm)

    return matchesData.map((item) => {
        return {
            individualPosition: item.individualPosition,
            championId: item.championId,
            championName: item.championName,
            win: item.win,
            teamPosition: item.teamPosition,
            role: item.role,
            lane: item.lane
        }
    })
}

(async () => {
    await getPuuID("zYoshio", "BR1")
    await getMatchID(5)
    // const data = await getMatchData(matchID)
    console.log(matchID)
}
)()
