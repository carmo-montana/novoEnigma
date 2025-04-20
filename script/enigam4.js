document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const flowers = document.querySelectorAll('.flower');
    const waterFountain = document.getElementById('water-fountain');
    const sequenceDisplay = document.getElementById('sequence-display');
    const checkSequenceBtn = document.getElementById('check-sequence');
    const clueDisplay = document.getElementById('clue-display');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const flowerSound = document.getElementById('flowerSound');
    const waterSound = document.getElementById('waterSound');
    
    // Variáveis
    let currentSequence = [];
    const correctSequence = [3, 1, 4]; // Número de pétalas das flores na ordem correta
    let isWatering = false;
    
    // Inicia som ambiente (vento no jardim)
    bgSound.volume = 0.3;
    bgSound.play();
    
    // Clicar em flores para adicionar à sequência
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            if (isWatering) return;
            
            flowerSound.currentTime = 0;
            flowerSound.play();
            
            const petalCount = parseInt(this.querySelector('.petals').textContent);
            currentSequence.push(petalCount);
            updateSequenceDisplay();
            
            // Dica após primeira interação
            if (currentSequence.length === 1) {
                clueDisplay.innerHTML = '<p>A fonte pode limpar seus erros...</p>';
            }
        });
    });
    
    // Fonte de água (reinicia sequência)
    waterFountain.addEventListener('click', function() {
        waterSound.play();
        isWatering = true;
        currentSequence = [];
        sequenceDisplay.innerHTML = '';
        clueDisplay.innerHTML = '<p>Sequência reiniciada. Tente novamente.</p>';
        
        setTimeout(() => {
            isWatering = false;
        }, 1000);
    });
    
    // Verificar sequência
    checkSequenceBtn.addEventListener('click', function() {
        const isCorrect = currentSequence.length === correctSequence.length &&
                          currentSequence.every((num, idx) => num === correctSequence[idx]);
        
        if (isCorrect) {
            clueDisplay.innerHTML = '<p class="success">✅ O solo treme... Uma <strong>caixa</strong> emerge das flores!</p>';
            setTimeout(() => {
                window.location.href = "../src/enigma5.html";
            }, 3000);
        } else {
            clueDisplay.innerHTML = '<p class="error">❌ Ordem incorreta. Observe as pétalas.</p>';
        }
    });
    
    // Atualiza a exibição da sequência
    function updateSequenceDisplay() {
        sequenceDisplay.innerHTML = '';
        currentSequence.forEach(num => {
            const item = document.createElement('div');
            item.className = 'sequence-item';
            item.textContent = num;
            sequenceDisplay.appendChild(item);
        });
    }
});