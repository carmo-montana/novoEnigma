document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const realObjects = document.querySelectorAll('.real-world .hidden-object');
    const mirrorObjects = document.querySelectorAll('.mirror-world .hidden-object');
    const mirrorWorld = document.querySelector('.mirror-world');
    const reverseTimeBtn = document.getElementById('reverse-time');
    const timeDisplay = document.getElementById('time-display');
    const inventoryItems = document.getElementById('inventory-items');
    const clueDisplay = document.getElementById('clue-display');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const clickSound = document.getElementById('clickSound');
    const successSound = document.getElementById('successSound');
    
    // Variáveis
    let isTimeReversed = false;
    const foundItems = [];
    const requiredItems = ['knife-mirror', 'ring-mirror', 'clock-mirror'];
    
    // Inicia som ambiente (sussurros)
    bgSound.volume = 0.4;
    bgSound.play();
    
    // Eventos para objetos no mundo real
    realObjects.forEach(obj => {
        obj.addEventListener('click', function() {
            clickSound.play();
            const objectType = this.dataset.object;
            showClue(objectType);
        });
    });
    
    // Eventos para objetos no espelho (quando tempo estiver revertido)
    mirrorObjects.forEach(obj => {
        obj.addEventListener('click', function() {
            if (!isTimeReversed) return;
            
            clickSound.currentTime = 0;
            clickSound.play();
            
            const objectType = this.dataset.object;
            if (!foundItems.includes(objectType)) {
                foundItems.push(objectType);
                updateInventory();
                showClue(objectType);
                this.style.opacity = '0';
                
                // Verifica se todas as pistas foram coletadas
                if (requiredItems.every(item => foundItems.includes(item))) {
                    clueDisplay.innerHTML = '<p class="success">Você viu a verdade... <strong>O assassino é o reflexo.</strong></p>';
                    successSound.play();
                    setTimeout(() => {
                        window.location.href = "../src/enigma3.html";
                    }, 4000);
                }
            }
        });
    });
    
    // Botão para reverter o tempo
    reverseTimeBtn.addEventListener('click', function() {
        isTimeReversed = !isTimeReversed;
        
        if (isTimeReversed) {
            mirrorWorld.classList.add('mirror-active');
            timeDisplay.textContent = "Passado";
            reverseTimeBtn.textContent = "Voltar ao Presente";
            bgSound.pause();
            successSound.currentTime = 0;
            successSound.play(); // Som de distorção temporal
        } else {
            mirrorWorld.classList.remove('mirror-active');
            timeDisplay.textContent = "Presente";
            reverseTimeBtn.textContent = "Voltar no Tempo";
            bgSound.play();
        }
    });
    
    // Atualiza inventário
    function updateInventory() {
        inventoryItems.innerHTML = '';
        foundItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            
            switch(item) {
                case 'knife-mirror': itemElement.textContent = '🔪'; break;
                case 'ring-mirror': itemElement.textContent = '💍'; break;
                case 'clock-mirror': itemElement.textContent = '🕰️'; break;
            }
            
            inventoryItems.appendChild(itemElement);
        });
    }
    
    // Mostra dicas
    function showClue(objectType) {
        const clues = {
            'knife': "A faca no chão... Alguém se apressou?",
            'ring': "Um anel de ouro com iniciais: <strong>E.L.</strong>",
            'diary': "O diário está aberto na página do dia do incidente.",
            'knife-mirror': "No passado, a faca estava na mesa... não no chão.",
            'ring-mirror': "O anel não estava no dedo dela.",
            'clock-mirror': "O relógio estava quebrado antes do crime."
        };
        clueDisplay.innerHTML = `<p>${clues[objectType]}</p>`;
    }
});