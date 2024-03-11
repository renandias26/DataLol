import { writeFile } from 'fs/promises'
import lolModel from '../model/lol.model.js'

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

(async () => {
    const puuid = await getPuuID("zYoshio", "BR1");
    const matchID = await getMatchID(20, puuid);
    const data = await getMatchData(matchID, puuid);
    await writeFile("data.json", JSON.stringify(data, null, 2));
}
)()
