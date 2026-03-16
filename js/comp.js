document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.querySelector('.saikun-menu');
    const closeBtn = document.querySelector('.menu-close');
    const slideMenu = document.querySelector('.open-menu');

    // メニューを開く処理
    openBtn.addEventListener('click', () => {
        slideMenu.classList.add('is-open');
    });

    // メニューを閉じる処理
    closeBtn.addEventListener('click', () => {
        slideMenu.classList.remove('is-open');
    });

    const sections = document.querySelectorAll('section');
    const mainTitle = document.getElementById('main-title');
    const navLinks = document.querySelectorAll('.nav-link');

    // 「画面のどの位置に来たら反応するか」の設定
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // 画面の中央（50%）を通過した時に判定する
      threshold: 0
    };

    // スクロールを監視するセンサー（オブザーバー）を作成
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // もしセクションが画面中央を通過したら
        if (entry.isIntersecting) {
          const newTitle = entry.target.getAttribute('data-title');
          const currentSectionId = entry.target.getAttribute('id');

          // 現在のタイトルと違う場合だけアニメーションを実行
          if (mainTitle.textContent !== newTitle) {
            mainTitle.classList.add('is-hidden');
            
            setTimeout(() => {
              mainTitle.textContent = newTitle;
              mainTitle.classList.remove('is-hidden');
            }, 400); // CSSのtransition時間と合わせる
          }

          // 左下のメニューの色（activeクラス）も連動して切り替える
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    // 全てのセクション（sectionタグ）にセンサーを取り付ける
    sections.forEach(sec => observer.observe(sec));
    // ===== ここから下を追記：ヒーローエリアを監視してサイドバーを出し入れする =====

    const sidebar = document.querySelector('.sidebar');
    const heroArea = document.querySelector('.hero');

    // ヒーローエリア用のセンサーを作成
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // isIntersecting が false（= ヒーローエリアが画面から見えなくなった）なら
            if (!entry.isIntersecting) {
                sidebar.classList.add('is-visible'); // サイドバーを表示
            } else {
                // ヒーローエリアが見えている間は非表示
                sidebar.classList.remove('is-visible');
            }
        });
    }, {
        // ヒーローエリアが「どれくらい画面から外れたら」反応するか
        // -10% くらいにしておくと、画像がほぼ消えかけた自然なタイミングで出現します
        rootMargin: '-10% 0px 0px 0px' 
    });

    // センサーを .hero に取り付ける
    if (heroArea) {
        heroObserver.observe(heroArea);
    }

    // ===== 追記ここまで =====
});