import { writeFile, readFile } from 'fs/promises'
import lolModel from '../model/lol.model.js'

async function getPlayerData(playerName) {
    const hashtagIndex = playerName?.indexOf("#")
    const nickname = player.slice(0, hashtagIndex);
    const tag = player.slice(hashtagIndex + 1);

    const puuid = await getPuuID(nickname, tag);
    const matchID = await getMatchID(20, puuid);
    return await getMatchData(matchID, puuid);
}

async function getPuuID(gameName, tagLine) {
    return lolModel.getPlayerData(gameName, tagLine).then(item => item.puuid);
}

async function getMatchID(quantity, puuid) {
    return lolModel.getMatchID(quantity, puuid);
}

async function getMatchData(matchID, puuid) {
    const matchesDataProm = matchID.map(data => lolModel.getMatchData(data))
    return Promise.all(matchesDataProm).then(data => {
        return data.filter((match) => match.info.gameMode == 'CLASSIC').map((item) => {
            const participantIndex = item.metadata.participants.indexOf(puuid);
            const participantData = item.info.participants[participantIndex];
            return {
                matchId: item.metadata.matchId,
                gameMode: item.info.gameMode,
                gameType: item.info.gameType,
                puuid: participantData.puuid,
                win: participantData.win,
                kda: participantData.challenges.kda,
                individualPosition: participantData.individualPosition,
                championId: participantData.championId,
                championName: participantData.championName,
                teamPosition: participantData.teamPosition,
                role: participantData.role,
                lane: participantData.lane
            }
        })
    })
}

async function getWinRate() {
    const data = JSON.parse(await readFile('data.json', 'utf-8'));

    let count = 0;
    data.map((match) => {
        if (match.win == true) count++;
    });
    return (count * 100) / data.length;
}

async function getLaneData() {
    const data = JSON.parse(await readFile('data.json', 'utf-8'));

    const result = data.reduce((acc, match) => {
        const position = match.individualPosition;
        const win = match.win;

        if (!acc[position]) {
            acc[position] = { totalMatches: 0, totalWins: 0 };
        }

        acc[position].totalMatches++;
        if (win) {
            acc[position].totalWins++;
        }
        return acc;
    }, {});
    console.log(result);
    return result;
}

async function getChampionData() {
    const data = JSON.parse(await readFile('data.json', 'utf-8'));

    const result = data.reduce((cont, match) => {
        cont[match.championName] = (cont[match.championName] || 0) + 1;
        return cont;
    }, {});

    console.log(result);
}

(async () => {
    //const puuid = await getPuuID("zYoshio", "BR1");
    //const matchID = await getMatchID(20, puuid);
    //const data = await getMatchData(matchID, puuid);
    //await writeFile("data.json", JSON.stringify(data, null, 2));
    console.log(await getWinRate());
    getChampionData()
    getLaneData();
}
)()

export default getPlayerData