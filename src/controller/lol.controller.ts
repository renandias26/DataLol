const token = "RGAPI-0eaa805f-2f0f-49ee-bf3b-9d028f2ed9c4";

let puuid = ""

async function getPuuID(gameName, tagLine) {
    const userData = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {headers: {"X-Riot-Token": token }}).then((data)=> data.json()).then(data => puuid = data.puuid);
}

(async () =>{
    await getPuuID("zYoshio", "BR1")
    console.log(puuid)
}
)()
