const token = "RGAPI-e35e04fb-92aa-4b32-8be5-0ca8c031712b";

async function getPuuID(gameName, tagLine) {
    const userData = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {headers: {"X-Riot-Token": token }}).then((data)=> data.json());

    return userData.puuid;
}

const puuid = getPuuID("zYoshio", "BR1");
puuid.then(item => console.log(item))

