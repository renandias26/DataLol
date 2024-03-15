class lolModel {
    token = "RGAPI-0562212c-e2d9-4fe9-a2c2-1255383914ad";
    async fetchRiotAPI(url) {
        return fetch(
            url,
            {
                headers: { "X-Riot-Token": this.token }
            }
        ).then(item => item.json()).catch(err => { console.log(err) });
    }

    async getPlayerData(gameName, tagLine) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    }

    async getMatchID(quantity, puuid) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantity}`);
    }

    async getMatchData(item) {
        return this.fetchRiotAPI(`https://americas.api.riotgames.com/lol/match/v5/matches/${item}`);
    }
}

export default new lolModel();