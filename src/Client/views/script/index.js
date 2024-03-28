
document.getElementById("submit").addEventListener("click", LoadData)

document.getElementById("search").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        LoadData();
    }
});

async function LoadData() {
    ShowLoader();
    ClearPlayerData();
    RemoveMessage();

    const player = document.getElementById("search").value
    const playerURL = encodeURIComponent(player)

    const data = await fetch(`http://localhost:3000/?name=${playerURL}`)
        .then(item => item.json())
        .catch((err) => {
            RemoveLoader();
            ShowMessage('Tente Novamente')
            console.log(err)
        })

    if (typeof data === "string") {
        RemoveLoader();
        ShowMessage(data)
        return
    }

    if (data) {
        showPlayerData(data)
        RemoveMessage()
        RemoveLoader();
        return
    }
}

function ShowMessage(message) {
    const mensagens = document.getElementById("messages");
    const summonerData = document.getElementById("summonerData")

    summonerData.style.display = 'none';
    mensagens.style.display = '';
    mensagens.textContent = message;
}

function RemoveMessage() {
    const mensagens = document.getElementById("messages");
    const summonerData = document.getElementById("summonerData")

    summonerData.style.display = '';
    mensagens.style.display = 'none';
    mensagens.textContent = '';
}

function ShowLoader() {
    document.getElementById("loader").classList.remove('d-none')
}

function RemoveLoader() {
    document.getElementById("loader").classList.add('d-none')
}

function ClearPlayerData() {
    const parent = document.getElementById("summonerData")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showPlayerData(playerData) {
    const [winRate, laneData, championData] = playerData
    const dvWinRate = showWinrate(winRate)
    const dvTables = showTables(laneData, championData)
    document.getElementById("summonerData").append(dvWinRate)
    document.getElementById("summonerData").append(dvTables)
}

function showWinrate(winRate) {
    const dvWinRate = document.createElement('div')
    dvWinRate.append(`Win Rate: ${winRate}%`)
    dvWinRate.style.fontWeight = "Bold"
    return dvWinRate
}

function showTables(laneData, championData) {
    const dvTables = document.createElement('div')
    const dvlaneData = showlaneData(laneData)
    const dvchampionData = showchampionData(championData)
    dvTables.append(dvlaneData)
    dvTables.append(dvchampionData)
    dvTables.style.display = "flex";
    dvTables.style.alignItems = "center";
    dvTables.style.justifyContent = "space-evenly"
    return dvTables
}

function showlaneData(laneData) {
    const dvlaneData = document.createElement('div')

    const tableLane = document.createElement('table')
    tableLane.title = "Lane's"
    tableLane.classList.add('table')

    const headerLane = document.createElement('tr')
    const header = document.createElement('thead')

    const headerLaneName = document.createElement('th')
    headerLaneName.textContent = "Lane Name"
    headerLaneName.scope = "col"

    const headerLaneMatchs = document.createElement('th')
    headerLaneMatchs.textContent = "Lane Match's"
    headerLaneMatchs.scope = "col"

    const headerLaneWins = document.createElement('th')
    headerLaneWins.textContent = "Lane Win's"
    headerLaneWins.scope = "col"

    headerLane.append(headerLaneName)
    headerLane.append(headerLaneMatchs)
    headerLane.append(headerLaneWins)

    header.append(headerLane)
    tableLane.append(header)

    const body = document.createElement('tbody')

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
        body.append(lineLane)
    }

    tableLane.append(body)
    dvlaneData.append(tableLane)
    return dvlaneData
}

function showchampionData(championData) {
    const dvchampionData = document.createElement('div')

    const tableChampion = document.createElement('table')
    tableChampion.title = "Champions"
    tableChampion.classList.add('table')

    const headerChampion = document.createElement('tr')
    const header = document.createElement('thead')

    const headerChampionName = document.createElement('th')
    headerChampionName.textContent = "Champion Name"
    headerChampionName.scope = "col"

    const headerChampionMatchs = document.createElement('th')
    headerChampionMatchs.textContent = "Champion Match's"
    headerChampionMatchs.scope = "col"

    headerChampion.append(headerChampionName)
    headerChampion.append(headerChampionMatchs)

    header.append(headerChampion)
    tableChampion.append(header)

    const body = document.createElement('tbody')

    for (const [key, value] of Object.entries(championData)) {
        const lineChampion = document.createElement('tr')
        const lineChampionName = document.createElement('td')
        const lineChampionMatchs = document.createElement('td')
        lineChampionMatchs.textContent = value
        lineChampionName.textContent = key
        lineChampion.append(lineChampionName)
        lineChampion.append(lineChampionMatchs)
        body.append(lineChampion)
    }

    tableChampion.append(body)

    dvchampionData.append(tableChampion)

    return dvchampionData
}