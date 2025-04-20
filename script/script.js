document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const hiddenObjects = document.querySelectorAll('.hidden-object');
    const colorSpots = document.querySelectorAll('.color-spot');
    const inventoryItems = document.getElementById('inventory-items');
    const clueDisplay = document.getElementById('clue-display');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const clickSound = document.getElementById('clickSound');
    const successSound = document.getElementById('successSound');
    
    // Itens coletados
    const foundItems = [];
    let colorSequence = [];
    const correctSequence = ['red', 'orange', 'yellow'];
    
    // Inicia som ambiente
    bgSound.volume = 0.3;
    bgSound.play();
    
    // Evento para objetos escondidos
    hiddenObjects.forEach(obj => {
        obj.addEventListener('click', function() {
            clickSound.play();
            const objectType = this.dataset.object;
            
            if (!foundItems.includes(objectType)) {
                foundItems.push(objectType);
                updateInventory();
                showClue(objectType);
                this.style.display = 'none';
                
                // Verifica se todos os itens foram encontrados
                if (foundItems.length === hiddenObjects.length) {
                    clueDisplay.innerHTML += '<p class="important">Você encontrou todas as pistas! Agora, clique nas cores na ordem do arco-íris...</p>';
                    colorSpots.forEach(spot => spot.style.opacity = '0.5');
                }
            }
        });
    });
    
    // Evento para cores (solução final)
    colorSpots.forEach(spot => {
        spot.addEventListener('click', function() {
            clickSound.play();
            const color = this.dataset.color;
            colorSequence.push(color);
            
            if (colorSequence.length === correctSequence.length) {
                checkSolution();
            }
        });
    });
    
    // Atualiza inventário
    function updateInventory() {
        inventoryItems.innerHTML = '';
        foundItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            
            switch(item) {
                case 'brush': itemElement.textContent = '🖌️'; break;
                case 'clock': itemElement.textContent = '🕒'; break;
                case 'note': itemElement.textContent = '📜'; break;
            }
            
            inventoryItems.appendChild(itemElement);
        });
    }
    
    // Mostra dicas
    function showClue(objectType) {
        const clues = {
            brush: "O pincel está quebrado... Será que o pintou não terminou a obra?",
            clock: "O relógio parou às <strong>3:33</strong>. O que isso significa?",
            note: "Uma nota atrás do quadro diz: <em>'A verdade está nas cores...'</em>"
        };
        clueDisplay.innerHTML = `<p>${clues[objectType]}</p>`;
    }
    
    // Verifica a solução
    function checkSolution() {
        const isCorrect = colorSequence.every((color, index) => 
            color === correctSequence[index]
        );
        
        if (isCorrect) {
            successSound.play();
            clueDisplay.innerHTML = '<p class="success">✅ O quadro se abre! "<strong>Ele está no sótão.</strong>"</p>';
            setTimeout(() => {
                window.location.href = "../src/enigma2.html"; 
            }, 3000);
        } else {
            colorSequence = [];
            clueDisplay.innerHTML += '<p class="error">❌ Ordem incorreta. Tente novamente.</p>';
        }
    }
});