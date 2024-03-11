class lolModel {
    token = "RGAPI-3a4b45d2-a826-4db0-b966-4da01ee1e89a";

    async fetchRiotAPI(url) {
        return fetch(
            url,
            {
                headers: { "X-Riot-Token": this.token }
            }
        ).then(item => item.json());
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