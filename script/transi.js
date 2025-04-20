// Armazena progresso (pode ser usado com localStorage)
let currentEnigma = 1;
const totalEnigmas = 10;

function goToNextEnigma() {
    if (currentEnigma < totalEnigmas) {
        currentEnigma++;
        window.location.href = `enigma${currentEnigma}.html`;
    } else {
        alert("🎉 Você completou todos os enigmas!");
    }
}