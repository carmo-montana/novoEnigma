document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const flasks = document.querySelectorAll('.flask');
    const testTube = document.getElementById('test-tube');
    const liquidMix = document.getElementById('liquid-mix');
    const mixButton = document.getElementById('mix-button');
    const clueDisplay = document.getElementById('clue-display');
    const timerDisplay = document.getElementById('timer');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const bubbleSound = document.getElementById('bubbleSound');
    const alarmSound = document.getElementById('alarmSound');
    
    // Variáveis
    let currentSequence = [];
    const correctSequence = ['blue', 'red', 'green']; // Ordem de mistura
    let timeLeft = 180; // 3 minutos em segundos
    let timerInterval;
    
    // Inicia som ambiente (laboratório)
    bgSound.volume = 0.3;
    bgSound.play();
    
    // Inicia timer
    startTimer();
    
    // Drag and Drop para frascos
    flasks.forEach(flask => {
        flask.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('flask', this.dataset.flask);
        });
    });
    
    testTube.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    testTube.addEventListener('drop', function(e) {
        e.preventDefault();
        const flaskType = e.dataTransfer.getData('flask');
        
        if (currentSequence.length < 3) {
            bubbleSound.play();
            currentSequence.push(flaskType);
            updateTestTube();
            
            // Dicas conforme mistura
            if (currentSequence.length === 1) {
                clueDisplay.innerHTML += '<p>O líquido brilha fracamente...</p>';
            }
        }
    });
    
    // Botão de mistura
    mixButton.addEventListener('click', function() {
        if (currentSequence.length === 0) return;
        
        const isCorrect = currentSequence.every((color, index) => 
            color === correctSequence[index]
        );
        
        if (isCorrect) {
            // Efeito visual de sucesso
            liquidMix.style.backgroundColor = '#9400d3';
            liquidMix.style.boxShadow = '0 0 20px #9400d3';
            clueDisplay.innerHTML = '<p class="success">✅ A mistura perfeita! Um compartimento secreto se abre...</p>';
            clearInterval(timerInterval);
            
            setTimeout(() => {
                window.location.href = "../src/enigma6.html";
            }, 3000);
        } else {
            // Efeito visual de erro
            liquidMix.style.backgroundColor = '#8b0000';
            clueDisplay.innerHTML = '<p class="error">❌ Reação perigosa! A sequência está errada.</p>';
            timeLeft -= 30; // Penalidade de tempo
            alarmSound.play();
        }
    });
    
    // Atualiza o tubo de ensaio visualmente
    function updateTestTube() {
        const mixHeight = (currentSequence.length / 3) * 100;
        liquidMix.style.height = `${mixHeight}%`;
        
        // Cor baseada na sequência
        if (currentSequence.length === 1) {
            liquidMix.style.backgroundColor = '#1e90ff'; // Azul
        } else if (currentSequence.length === 2) {
            liquidMix.style.backgroundColor = '#9932cc'; // Roxo (azul + vermelho)
        } else if (currentSequence.length === 3) {
            liquidMix.style.backgroundColor = '#556b2f'; // Verde musgo (todos)
        }
    }
    
    // Timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clueDisplay.innerHTML = '<p class="error">⏰ O tempo acabou! O laboratório foi selado.</p>';
                mixButton.disabled = true;
                alarmSound.play();
            }
        }, 1000);
    }
});