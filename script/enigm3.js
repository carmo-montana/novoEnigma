document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const books = document.querySelectorAll('.book');
    const readingDesk = document.getElementById('reading-desk');
    const flashlight = document.getElementById('flashlight');
    const useFlashlightBtn = document.getElementById('use-flashlight');
    const clueDisplay = document.getElementById('clue-display');
    const encodedMessage = document.getElementById('encoded-message');
    const decoderInput = document.getElementById('decoder-input');
    const submitCodeBtn = document.getElementById('submit-code');
    
    // Sons
    const bgSound = document.getElementById('bgSound');
    const pageSound = document.getElementById('pageSound');
    const codeSound = document.getElementById('codeSound');
    
    // Variáveis
    let isFlashlightOn = false;
    const cipherKey = { 12: 'L', 15: 'O', 4: 'D', 5: 'E' }; // Código: 12-15-4-5 = LODE
    
    // Inicia som ambiente (biblioteca)
    bgSound.volume = 0.3;
    bgSound.play();
    
    // Drag and Drop para livros
    books.forEach(book => {
        book.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('book', this.dataset.book);
        });
    });
    
    readingDesk.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    readingDesk.addEventListener('drop', function(e) {
        e.preventDefault();
        const bookType = e.dataTransfer.getData('book');
        pageSound.play();
        openBook(bookType);
    });
    
    // Lanterna UV
    useFlashlightBtn.addEventListener('click', function() {
        isFlashlightOn = !isFlashlightOn;
        if (isFlashlightOn) {
            readingDesk.classList.add('uv-reveal');
            flashlight.style.display = 'block';
            useFlashlightBtn.textContent = 'Desligar Lanterna';
        } else {
            readingDesk.classList.remove('uv-reveal');
            flashlight.style.display = 'none';
            useFlashlightBtn.textContent = 'Usar Lanterna UV';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isFlashlightOn) {
            flashlight.style.left = `${e.clientX - 50}px`;
            flashlight.style.top = `${e.clientY - 50}px`;
        }
    });
    
    // Decifrar código
    submitCodeBtn.addEventListener('click', function() {
        const userAnswer = decoderInput.value.trim().toUpperCase();
        if (userAnswer === 'LODE') {
            codeSound.play();
            clueDisplay.innerHTML = '<p class="success">✅ Correto! O compartimento secreto se abre: <strong>"O livro está atrás do quadro."</strong></p>';
            setTimeout(() => {
                window.location.href = "../src/enigma4";
            }, 3000);
        } else {
            clueDisplay.innerHTML = '<p class="error">❌ Código incorreto. Consulte o livro de cifras.</p>';
        }
    });
    
    // Abre um livro na mesa
    function openBook(bookType) {
        let content = '';
        
        switch(bookType) {
            case 'cipher':
                content = `
                    <h3>Códigos Antigos</h3>
                    <p>Use esta chave para decifrar:</p>
                    <table class="cipher-table">
                        <tr><th>Número</th><th>Letra</th></tr>
                        <tr><td>12</td><td>L</td></tr>
                        <tr><td>15</td><td>O</td></tr>
                        <tr><td>4</td><td>D</td></tr>
                        <tr><td>5</td><td>E</td></tr>
                    </table>
                `;
                break;
                
            case 'diary':
                content = `
                    <h3>Diário do Alquimista</h3>
                    <p class="hidden-text">A magia está nas páginas em branco... use a luz.</p>
                    <p>Não deixe que <span class="hidden-text">ele</span> encontre o livro.</p>
                `;
                break;
                
            case 'blank':
                content = `
                    <h3>Páginas em Branco</h3>
                    <p class="hidden-text">12-15-4-5</p>
                    <p>Parece não haver nada aqui...</p>
                `;
                break;
        }
        
        readingDesk.innerHTML = content;
    }
});