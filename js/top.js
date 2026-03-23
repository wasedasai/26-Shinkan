// --- 便利な待機関数（ローディングアニメーション用） ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. ローディング画面（読み込み中）の処理
    // =========================================================
    const logo1 = document.getElementById('logo1');
    let currentOpacity = 0.1;
    
    // ページ読み込み中：1つ目のロゴをだんだん濃くする
    const loadingInterval = setInterval(() => {
        if (logo1 && currentOpacity < 1.0) {
            currentOpacity += 0.05;
            logo1.style.opacity = currentOpacity;
        }
    }, 100);

    // =========================================================
    // 2. メニューの開閉処理
    // =========================================================
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

    // =========================================================
    // 3. ページ読み込み完了後（load）の処理まとめ
    // =========================================================
    window.addEventListener('load', async () => {
        
        // --- ローディング画面の2段階アニメーション ---
        const logo2 = document.getElementById('logo2');
        const loadingScreen = document.getElementById('loading-screen'); 
        const mainContent = document.getElementById('main-content');

        if (logo1 && logo2 && loadingScreen) {
            // ① 読み込み完了したら1つ目のロゴを完全に濃くする
            clearInterval(loadingInterval);
            logo1.style.opacity = 1.0;
            
            await sleep(500); // 0.5秒だけ余韻を見せる

            // ② 1つ目のロゴをフェードアウト
            logo1.style.transition = 'opacity 0.5s ease';
            logo1.style.opacity = 0;
            
            await sleep(500); // 完全に消えるまで0.5秒待つ

            // ③ 2つ目のロゴ（文字入り）をフェードイン
            logo2.style.visibility = 'visible';
            logo2.style.opacity = 1;
            loadingScreen.style.backgroundColor = '#FFFCFC';
            
            await sleep(1500); // 新しいロゴを表示して読ませる

            // ④ 2つ目のロゴをフェードアウト
            logo2.style.opacity = 0;
            
            await sleep(200); // ★変更箇所：消えるのを待つ時間を短縮（500→200）

            // ⑤ 背景（ローディング画面全体）をフェードアウト
            loadingScreen.style.opacity = 0;
            
            await sleep(300); // ★変更箇所：背景が透けるのを待つ時間を短縮（500→300）

            // ⑥ ローディング画面を裏側に隠す
            loadingScreen.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';

            // =========================================================
            // ★お引越し箇所：ローディングが完全に終わってからメイン画像を出す
            // =========================================================
            const centerImg = document.querySelector('.top-center');
            const sideImgs = document.querySelectorAll('.top-right, .top-left');
            const bottomRightLogo = document.querySelector('.hero-logo');
            const allImgs = document.querySelectorAll('.top-left, .top-center, .top-right');

            // PC/スマホで中央画像を切り替える
            // const isMobileLoad = window.matchMedia("(max-width: 500px)").matches;
            // if (isMobileLoad && centerImg) {
            //     centerImg.src = "../images/top-hero.jpg"; 
            // }

            // ローディング画面が消えた直後（50ミリ秒後）に八角形をフワッと登場させる
            setTimeout(() => {
                allImgs.forEach(img => {
                    img.classList.add('is-show'); 
                });

                const totalEntryTime = 1800; 

                setTimeout(() => {
                    if (centerImg) {
                        allImgs.forEach(img => {
                            img.style.transition = 'none';
                        });

                        initializeScrollAnimationResponsive(centerImg, sideImgs, bottomRightLogo);
                    }
                }, totalEntryTime);

            }, 50); // ★変更箇所：すぐに出るように短縮（200→50）

        } else {
            // 要素が見つからなかった場合の安全対策
            clearInterval(loadingInterval);
        }

        // =========================================================
        // スクロールアニメーション関数
        // =========================================================
        function initializeScrollAnimationResponsive(centerImg, sideImgs, bottomRightLogo) {
            const animateOnScroll = () => {
                const scrollY = window.scrollY || window.pageYOffset;
                const isMobile = window.matchMedia("(max-width: 500px)").matches;
                const totalScroll = isMobile ? window.innerHeight * 1.5 : window.innerHeight * 2; 

                let progress = scrollY / totalScroll;
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;

                let startSize;
                if (isMobile) {
                    startSize = window.innerWidth * 0.90;
                    if (startSize > 400) startSize = 400; 
                } else {
                    startSize = window.innerWidth * 0.50;
                    if (startSize > 700) startSize = 700;
                }

                const endWidth = document.documentElement.clientWidth;
                const stickArea = document.querySelector('.stick-area');
                const endHeight = stickArea ? stickArea.clientHeight : window.innerHeight;

                const currentWidth = startSize + (endWidth - startSize) * progress;
                const currentHeight = startSize + (endHeight - startSize) * progress;

                centerImg.style.width = `${currentWidth}px`;
                centerImg.style.height = `${currentHeight}px`;
                centerImg.style.maxWidth = 'none'; 
                centerImg.style.maxHeight = 'none';
                centerImg.style.flexShrink = '0'; 

                let yOffset = isMobile ? -99 * (1 - progress) : -100 * (1 - progress);
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

        // =========================================================
        // --- Swiperスライダーの設定 ---
        // =========================================================
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper('.mySwiper', {
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 30,
                grabCursor: true,
                speed: 600,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }

        // =========================================================
        // --- ニュースの「もっと見る」ボタンの設定 ---
        // =========================================================
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

        // =========================================================
        // --- FAQのアコーディオン設定 ---
        // =========================================================
        const faqCards = document.querySelectorAll('.faq-card');
        faqCards.forEach(card => {
            card.addEventListener('click', function() {
                if (window.matchMedia("(max-width: 500px)").matches) {
                    this.classList.toggle('is-active');
                }
            });
        });
    });
});