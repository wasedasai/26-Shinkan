document.addEventListener('DOMContentLoaded', () => {
    // 1. メニューの開閉処理
    const openBtn = document.querySelector('.saikun-menu');
    const closeBtn = document.querySelector('.menu-close');
    const slideMenu = document.querySelector('.open-menu');

    openBtn.addEventListener('click', () => {
        slideMenu.classList.add('is-open');
    });
    
    closeBtn.addEventListener('click', () => {
        slideMenu.classList.remove('is-open');
    });

    // 2. スクロール時のタイトル変更とナビゲーションのアクティブ化
    const sections = document.querySelectorAll('section');
    const mainTitle = document.getElementById('main-title');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newTitle = entry.target.getAttribute('data-title');
                const currentSectionId = entry.target.getAttribute('id');
                
                // タイトルの切り替えアニメーション
                if (mainTitle && mainTitle.textContent !== newTitle) {
                    mainTitle.classList.add('is-hidden');
                    setTimeout(() => {
                        mainTitle.textContent = newTitle;
                        mainTitle.classList.remove('is-hidden');
                    }, 400);
                }
                
                // ナビゲーションのハイライト切り替え
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(sec => observer.observe(sec));

    // 3. ヒーロー・フッターエリア通過の監視（一番上と一番下にいるかの判定）
    const sidebar = document.querySelector('.sidebar');
    const heroArea = document.querySelector('.hero');
    const footerArea = document.querySelector('footer'); // フッターを取得
    const bottomNav = document.querySelector('.bottom-nav'); // ナビを取得
    
    let isPastHero = false; // 一番上を通り過ぎたか
    let isAtFooter = false; // フッターが見えているか

    // 読み込み時、スマホなら最初はナビを隠しておく
    if (window.innerWidth <= 768 && bottomNav) {
        bottomNav.classList.add('is-hidden');
    }

    // --- ヒーロー（一番上）の監視 ---
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                if (sidebar) sidebar.classList.add('is-visible');
                isPastHero = true;
                
                // スマホかつフッターにいなければナビを表示
                if (window.innerWidth <= 768 && bottomNav && !isAtFooter) {
                    bottomNav.classList.remove('is-hidden');
                }
            } else {
                if (sidebar) sidebar.classList.remove('is-visible');
                isPastHero = false;
                
                // スマホなら強制的にナビを隠す
                if (window.innerWidth <= 768 && bottomNav) {
                    bottomNav.classList.add('is-hidden');
                }
            }
        });
    }, {
        rootMargin: '-10% 0px 0px 0px' 
    });
    
    if (heroArea) heroObserver.observe(heroArea);

    // --- フッター（一番下）の監視 ---
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // フッターが見えたらナビを隠す
                isAtFooter = true;
                if (window.innerWidth <= 768 && bottomNav) {
                    bottomNav.classList.add('is-hidden');
                }
            } else {
                // フッターから上に離れたら、ヒーローを通り過ぎているか確認して表示
                isAtFooter = false;
                if (window.innerWidth <= 768 && bottomNav && isPastHero) {
                    bottomNav.classList.remove('is-hidden');
                }
            }
        });
    }, {
        // 少しでもフッターが見えたら反応するように設定
        rootMargin: '0px',
        threshold: 0
    });

    if (footerArea) footerObserver.observe(footerArea);


    // 4. スマホ版：スクロール連動ナビゲーション
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        // 画面幅が768px以下のスマホ表示の時だけ作動させる
        if (window.innerWidth <= 768 && bottomNav) {
            
            // 一番上にいる時、またはフッターにいる時は隠しっぱなしにする（タイマーを発動させない）
            if (!isPastHero || isAtFooter) {
                bottomNav.classList.add('is-hidden');
                return; 
            }

            // スクロール中は隠すクラスを付与
            bottomNav.classList.add('is-hidden');

            // 以前のタイマーをクリア
            clearTimeout(scrollTimeout);

            // スクロールが止まってから200ミリ秒後に表示
            scrollTimeout = setTimeout(() => {
                // セクション内にいる時（ヒーローでもフッターでもない時）だけ表示
                if (isPastHero && !isAtFooter) {
                    bottomNav.classList.remove('is-hidden');
                }
            }, 200);
        }
    });
});