document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const paintings = document.querySelectorAll('.painting');
    const symbolButtons = document.querySelectorAll('.symbol-btn');
    const clueDisplay = document.getElementById('clue-display');
    const galleryScene = document.querySelector('.gallery-scene');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const errorSound = document.getElementById('errorSound');
    const revealSound = document.getElementById('revealSound');
    
    // Variáveis
    const correctSequence = ['candle', 'blood', 'moon']; // 🕯️ → 🩸 → 🌕
    let playerSequence = [];
    let whisperVolume = 0.3;
    
    // Inicia som ambiente (sussurros)
    bgSound.volume = whisperVolume;
    bgSound.play();
    
    // Observar detalhes nos quadros
    paintings.forEach(painting => {
        painting.addEventListener('click', function() {
            const paintingType = this.dataset.painting;
            let clue = '';
            
            switch(paintingType) {
                case 'before':
                    clue = "A vela está apagada... será que precisa ser acesa?";
                    break;
                case 'during':
                    clue = "Uma lágrima de sangue escorre silenciosamente.";
                    break;
                case 'after':
                    clue = "A lua observa tudo, mesmo atrás das nuvens.";
                    break;
            }
            
            clueDisplay.innerHTML = `<p>${clue}</p>`;
        });
    });
    
    // Botões de símbolos
    symbolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const symbol = this.dataset.symbol;
            playerSequence.push(symbol);
            
            // Verifica se a sequência está errada
            if (playerSequence.length <= correctSequence.length && 
                playerSequence[playerSequence.length - 1] !== correctSequence[playerSequence.length - 1]) {
                resetPuzzle();
                return;
            }
            
            // Verifica se a sequência está completa e correta
            if (playerSequence.length === correctSequence.length) {
                revealSecret();
            }
        });
    });
    
    // Reinicia o puzzle com efeito de distorção
    function resetPuzzle() {
        playerSequence = [];
        whisperVolume += 0.1;
        bgSound.volume = Math.min(whisperVolume, 0.7);
        
        galleryScene.classList.add('distort');
        errorSound.play();
        
        clueDisplay.innerHTML = '<p class="error">Algo está errado... os quadros sussurram mais alto.</p>';
        
        setTimeout(() => {
            galleryScene.classList.remove('distort');
        }, 1000);
    }
    
    // Revelação final
    function revealSecret() {
        revealSound.play();
        paintings.forEach(painting => {
            painting.classList.add('eyes-open');
        });
        
        clueDisplay.innerHTML = '<p class="success">"Você viu. Agora será visto."</p>';
        
        setTimeout(() => {
            window.location.href = "https://bespoke-manatee-0c1e91.netlify.app/";
        }, 5000);
    }
});