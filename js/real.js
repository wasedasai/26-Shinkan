
function openModal(id) {
    const overlay = document.getElementById('modalOverlay');
    overlay.style.display = 'flex';
    
    // アニメーション開始
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    
    // アニメーションが終わったら非表示に
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}