import getPlayerData from '../../controller/lol.controller';

function handleClick() {
    let success = true
    const player = document.getElementById("search").textContent
    const mensagens = document.getElementById("messages");
    const summonerData = document.getElementById("summonerData")
    getPlayerData(player).then(data => {
        success = true
    })
        .catch(() => {

            success = false
        });

    if (success) {
        summonerData.style.display = '';
        mensagens.style.display = 'none';
        mensagens.textContent = '';
        return
    }

    summonerData.style.display = 'none';
    mensagens.style.display = '';
    mensagens.textContent = 'Pesquise novamente';
}