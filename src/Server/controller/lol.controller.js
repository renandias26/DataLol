import lolModel from '../model/lol.model.js'

async function getPlayerData(playerName) {
    const hashtagIndex = playerName?.indexOf("#");
    const nickname = playerName?.slice(0, hashtagIndex);
    const tag = playerName?.slice(hashtagIndex + 1);
    const puuid = await getPuuID(nickname, tag);
    if (!puuid) {
        return 'NickName não existe';
    }
    const matchData = await getMatchData(20, puuid);
    if (!matchData) {
        return 'Tente Novamente';
    }
    const playerData = await Promise.all([
        getWinRate(matchData),
        getLaneData(matchData),
        getChampionData(matchData)
    ])
    if (!playerData) {
        return 'Tente Novamente';
    }
    return playerData
}

async function getPuuID(gameName, tagLine) {
    return lolModel.getPlayerData(gameName, tagLine).then(item => item.puuid).catch((err) => {
        console.log(err);
    });
}

async function getMatchID(quantity, puuid) {
    return lolModel.getMatchID(quantity, puuid);
}

async function getMatchData(quantity, puuid) {
    const matchID = await getMatchID(quantity, puuid);

    const matchesDataProm = matchID?.map(data => lolModel.getMatchData(data))
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

async function getWinRate(playerData) {
    let count = 0;
    playerData.map((match) => {
        if (match.win == true) count++;
    });
    return (count * 100) / playerData.length;
}

async function getLaneData(playerData) {
    return playerData.reduce((acc, match) => {
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
}

async function getChampionData(playerData) {
    return playerData.reduce((cont, match) => {
        cont[match.championName] = (cont[match.championName] || 0) + 1;
        return cont;
    }, {});
}

// (async () => {
//     await getPlayerData("zYoshio#BR1");
// }
// )()

export { getPlayerData }