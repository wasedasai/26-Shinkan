document.addEventListener('DOMContentLoaded', () => {
    // --- メニューの開閉処理 ---
    const openBtn = document.querySelector('.saikun-menu');
    const closeBtn = document.querySelector('.menu-close');
    const slideMenu = document.querySelector('.open-menu');


    if (openBtn && slideMenu) {
        openBtn.addEventListener('click', () => {
            slideMenu.classList.add('is-open');
        });
    }

    if (closeBtn && slideMenu) {
        closeBtn.addEventListener('click', () => {
            slideMenu.classList.remove('is-open');
        });
    }
});

window.addEventListener('load', () => {
    // --- ヒーローアニメーション処理 ---
    const loadingScreen = document.getElementById('loading');
    const centerImg = document.querySelector('.top-center');
    const sideImgs = document.querySelectorAll('.top-right, .top-left');
    const bottomRightLogo = document.querySelector('.hero-logo');
    const allImgs = document.querySelectorAll('.top-left, .top-center, .top-right');

    if (loadingScreen) {
        loadingScreen.classList.add('loaded'); 
    }

    // 🌟 【今回追加した部分】PC/スマホで中央画像を切り替える 🌟
    // 画面幅が500px以下（スマホ）の時だけ、srcをスマホ用の画像に書き換えます
    const isMobileLoad = window.matchMedia("(max-width: 500px)").matches;
    if (isMobileLoad && centerImg) {
        centerImg.src = "../images/top-hero-logo-sp.jpg"; 
    }

    setTimeout(() => {
        allImgs.forEach(img => {
            img.classList.add('is-show'); 
        });

        const totalEntryTime = 1800; 

        setTimeout(() => {
            if (centerImg) {
                // 登場が終わったら、CSSのフワッと動く設定を解除してJSに引き継ぐ
                allImgs.forEach(img => {
                    img.style.transition = 'none';
                });

                initializeScrollAnimationResponsive(centerImg, sideImgs, bottomRightLogo);
            }
        }, totalEntryTime);

    }, 200); 

    // スクロールアニメーション関数
    function initializeScrollAnimationResponsive(centerImg, sideImgs, bottomRightLogo) {
        const animateOnScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            
            // ⭐ スマホかどうかを判定
            const isMobile = window.matchMedia("(max-width: 500px)").matches;
            
            // ⭐ スクロール範囲の設定
            const totalScroll = isMobile ? window.innerHeight * 1.5 : window.innerHeight * 2; 

            let progress = scrollY / totalScroll;
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // ⭐ 初期サイズをCSSと完全に一致させる（カクつき防止）
            let startSize;
            if (isMobile) {
                startSize = window.innerWidth * 0.90;
                if (startSize > 400) startSize = 400; 
            } else {
                startSize = window.innerWidth * 0.50;
                if (startSize > 700) startSize = 700;
            }

            const endWidth = document.documentElement.clientWidth;
            // 🌟 変更1: スマホの縦マックスまで広げるために、実際のエリアの高さを測る
            const endHeight = document.querySelector('.stick-area').clientHeight;

            const currentWidth = startSize + (endWidth - startSize) * progress;
            const currentHeight = startSize + (endHeight - startSize) * progress;

            centerImg.style.width = `${currentWidth}px`;
            centerImg.style.height = `${currentHeight}px`;
            centerImg.style.maxWidth = 'none'; 
            centerImg.style.maxHeight = 'none';
            centerImg.style.flexShrink = '0'; 

            // 🌟 変更2: スマホ版の初期位置を少し上げる（-30px）
            let yOffset;
            if (isMobile) {
                yOffset = -99 * (1 - progress); // -30の数字を大きくするとさらに上に上がります
            } else {
                yOffset = -100 * (1 - progress); // PCはズレなし
            }
            centerImg.style.transform = `translateY(${yOffset}px)`;

            let clipProgress = progress * 1.5; 
            if (clipProgress > 1) clipProgress = 1;

            const startPath = [
                { x: 29.29, y: 0 }, { x: 70.71, y: 0 }, { x: 100, y: 29.29 }, { x: 100, y: 70.71 },
                { x: 70.71, y: 100 }, { x: 29.29, y: 100 }, { x: 0, y: 70.71 }, { x: 0, y: 29.29 }
            ];

            const endPath = [
                { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 },
                { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 0 }
            ];

            const currentPath = startPath.map((startPt, index) => {
                const endPt = endPath[index];
                const x = startPt.x + (endPt.x - startPt.x) * clipProgress;
                const y = startPt.y + (endPt.y - startPt.y) * clipProgress;
                return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
            }).join(', ');

            centerImg.style.webkitClipPath = `polygon(${currentPath})`;
            centerImg.style.clipPath = `polygon(${currentPath})`;

            let sideOpacity = 1 - (progress * 3);
            if (sideOpacity < 0) sideOpacity = 0;
            sideImgs.forEach(img => {
                img.style.opacity = sideOpacity;
                img.style.transform = `translateY(${yOffset}px)`;
            });

            if (bottomRightLogo) {
                const maxAlpha = 0.4;
                const currentAlpha = maxAlpha * progress;
                bottomRightLogo.style.backgroundColor = `rgba(255, 252, 252, ${currentAlpha})`;

                if (progress === 1) {
                    bottomRightLogo.classList.add('is-visible');
                } else {
                    bottomRightLogo.classList.remove('is-visible');
                }
            }
        };

        animateOnScroll(); 

        window.addEventListener('scroll', () => {
            requestAnimationFrame(animateOnScroll);
        });

        window.addEventListener('resize', () => {
            requestAnimationFrame(animateOnScroll);
        });
    }

    // --- Swiperスライダーの設定 ---
    const swiper = new Swiper('.mySwiper', {
        loop: true,                 // 最後まで行ったら最初に戻る（無限ループ）
        slidesPerView: 'auto',      // CSSで指定した幅（320px）に合わせて複数表示
        centeredSlides: true,       // 選択されているスライドを画面の中央に配置
        spaceBetween: 30,           // カードとカードの間の隙間（px）
        grabCursor: true,           // マウスを乗せると「手のマーク」になり、引っ張れることが直感的にわかるようになる
        speed: 600,                 // スライドが動くスピード
        pagination: {
            el: '.swiper-pagination',
            clickable: true,          
        },
    });

    // --- ニュースの「もっと見る」ボタンの設定 ---
    const btnMore = document.getElementById('btn-more');
    const hiddenItems = document.querySelectorAll('.is-hidden');

    if (btnMore) {
        btnMore.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            hiddenItems.forEach(function(item) {
                item.classList.remove('is-hidden');
            });
            
            btnMore.style.display = 'none';
        });
    }
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('click', function() {
            // スマホ（画面幅500px以下）の時だけ作動させる
            if (window.matchMedia("(max-width: 500px)").matches) {
                // タップで is-active クラスをつけたり外したりする
                this.classList.toggle('is-active');
            }
        });
    });
});