
document.getElementById("submit").addEventListener("click", handleClick)

async function handleClick() {
    let success = true
    const player = document.getElementById("search").value
    const playerURL = encodeURIComponent(player)
    const data = await fetch(`http://localhost:3000/?name=${playerURL}`).then(data => data.json())

    const mensagens = document.getElementById("messages");
    const summonerData = document.getElementById("summonerData")

    if (data) {
        showPlayerData(data)
        summonerData.style.display = '';
        mensagens.style.display = 'none';
        mensagens.textContent = '';
        return
    }

    summonerData.style.display = 'none';
    mensagens.style.display = '';
    mensagens.textContent = 'Pesquise novamente';
}

function showPlayerData(playerData) {
    console.log(playerData)
    const [winRate, laneData, championData] = playerData
    const dvWinRate = showWinrate(winRate)
    const dvlaneData = showlaneData(laneData)
    const dvchampionData = showchampionData(championData)
    document.getElementById("summonerData").append(dvWinRate)
    document.getElementById("summonerData").append(dvlaneData)
    document.getElementById("summonerData").append(dvchampionData)
}

function showWinrate(winRate) {
    const dvWinRate = document.createElement('div')
    dvWinRate.append(winRate)
    return dvWinRate
}
function showlaneData(laneData) {
    const dvlaneData = document.createElement('div')

    const tableLane = document.createElement('table')
    tableLane.title = "Lane's"

    const headerLane = document.createElement('tr')

    const headerLaneName = document.createElement('th')
    headerLaneName.textContent = "Lane Name"

    const headerLaneMatchs = document.createElement('th')
    headerLaneMatchs.textContent = "Lane Match's"

    const headerLaneWins = document.createElement('th')
    headerLaneWins.textContent = "Lane Win's"

    headerLane.append(headerLaneName)
    headerLane.append(headerLaneMatchs)
    headerLane.append(headerLaneWins)

    tableLane.append(headerLane)

    for (const [key, value] of Object.entries(laneData)) {
        const lineLane = document.createElement('tr')
        const laneName = document.createElement('td')
        laneName.textContent = key
        lineLane.append(laneName)
        for (const [_, val] of Object.entries(value)) {
            const laneData = document.createElement('td')
            laneData.textContent = val
            lineLane.append(laneData)
        }
        tableLane.append(lineLane)
    }

    dvlaneData.append(tableLane)
    return dvlaneData
}
function showchampionData(championData) {
    const dvchampionData = document.createElement('div')

    const tableChampion = document.createElement('table')
    tableChampion.title = "Champions"

    const headerChampion = document.createElement('tr')

    const headerChampionName = document.createElement('th')
    headerChampionName.textContent = "Champion Name"

    const headerChampionMatchs = document.createElement('th')
    headerChampionMatchs.textContent = "Champion Match's"

    headerChampion.append(headerChampionName)
    headerChampion.append(headerChampionMatchs)

    tableChampion.append(headerChampion)

    for (const [key, value] of Object.entries(championData)) {
        const lineChampion = document.createElement('tr')
        const lineChampionName = document.createElement('td')
        const lineChampionMatchs = document.createElement('td')
        lineChampionMatchs.textContent = value
        lineChampionName.textContent = key
        lineChampion.append(lineChampionName)
        lineChampion.append(lineChampionMatchs)
        tableChampion.append(lineChampion)
    }

    dvchampionData.append(tableChampion)

    return dvchampionData
}