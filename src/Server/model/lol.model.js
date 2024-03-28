class lolModel {
    token = "RGAPI-7f4429d7-66f9-4bb7-88c4-37e92c12fef3";
    async fetchRiotAPI(url) {
        return fetch(
            url,
            {
                headers: { "X-Riot-Token": this.token }
            }
        ).then(item => item.json()).catch(err => { console.log(`Riot Fetch Error: ${err}`) });
    }

    async getPlayerData(gameName, tagLine) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    }

    async getMatchID(quantity, puuid) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=${quantity}`);
    }

    async getMatchData(item) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/${item}`);
    }
}

export default new lolModel();