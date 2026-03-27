// const interviewData = {
//     'interview1': {
//         title: '運スタでやりがいを感じるときは？',
//         img: '../images/real/yarigaidayo.jpg',
//         tags: ['企画が成功した瞬間', '来場者の笑顔をみた時', '最高の景色']
//     },
//     'interview2': {
//         title: '運スタに入会した理由は？',
//         img: '../images/real/nyukai-riyu.jpg', // 変えたい画像パス
//         tags: ['早稲田祭が好き', '成長したい', '友達作り']
//     },
//     'interview3': {
//         title: '運スタの好きなところは？',
//         img: '../images/real/suki-tokoro.jpg', // 変えたい画像パス
//         tags: ['みんな熱い', '居場所がある', '達成感']
//     }
// };

// function openModal(id) {
//     const overlay = document.getElementById('modalOverlay');
//     const card = document.getElementById('modalCard');
    
//     // ここでIDに応じて中身を書き換える処理を入れると1つのモーダルで使い回せます
//     // document.getElementById('modalTitle').innerText = "質問内容...";

//     overlay.style.display = "flex";
//     setTimeout(() => {
//         overlay.classList.add('active');
//     }, 10);
// }

// function closeModal() {
//     const overlay = document.getElementById('modalOverlay');
//     overlay.classList.remove('active');
//     setTimeout(() => {
//         overlay.style.display = "none";
//     }, 600);
// }

// 各ボタンごとの中身データ（セリフ集）
// const interviewData = {
//     'interview1': {
//         title: '運スタでやりがいを感じるときは？',
//         img: '../images/real/yarigaidayo.jpg',
//         tags: ['企画が成功した瞬間', '来場者の笑顔', '最高の景色']
//     },
//     'interview2': {
//         title: '運スタに入会した理由は？',
//         img: '../images/real/riyu-photo.jpg', // 入会理由用の画像に変えてね
//         tags: ['早稲田祭が好き', '新しい挑戦', '仲間が欲しかった']
//     },
//     'interview3': {
//         title: '運スタの好きなところは？',
//         img: '../images/real/suki-photo.jpg', // 好きなところ用の画像に変えてね
//         tags: ['みんな熱い', '居場所がある', '達成感がすごい']
//     }
// };

// function openModal(id) {
//     const data = interviewData[id]; // タップされたIDのデータを取り出す
//     const overlay = document.getElementById('modalOverlay');

//     // --- 中身を書き換える ---
//     document.getElementById('modalTitle').innerText = data.title;
//     document.getElementById('modalImg').src = data.img;

//     // タグ（吹き出し）を新しく作る
//     const tagArea = document.getElementById('tagArea');
//     tagArea.innerHTML = ''; // 前に表示したタグを消す
//     data.tags.forEach((text, index) => {
//         const div = document.createElement('div');
//         div.className = `bubble-tag tag-pos-${index}`; // 位置調整用のクラス
//         div.innerText = text;
//         tagArea.appendChild(div);
//     });

//     // --- モーダルを表示 ---
//     overlay.style.display = 'flex';
//     setTimeout(() => {
//         overlay.classList.add('active');
//     }, 10);
// }

// 質問ごとのデータ（ここを変えれば中身が変わる）
const interviewData = {
    'interview1': {
        title: '運スタでやりがいを感じるときは？',
        img: '../images/real/yarigaidayo.jpg',
        tags: ['企画が成功した瞬間', '来場者の笑顔', '最高の景色', '最高の景色', '最高の景色']
    },
    'interview2': {
        title: '運スタに入会した理由は？',
        img: '../images/real/riyu-photo.jpg',
        tags: ['早稲田祭が好き', '新しい挑戦', '仲間作り']
    },
    'interview3': {
        title: '運スタの好きなところは？',
        img: '../images/real/suki-photo.jpg',
        tags: ['みんな熱い', '居場所がある', '達成感']
    }
};

function openModal(id) {
    const data = interviewData[id];
    const overlay = document.getElementById('modalOverlay');

    // 中身を書き換える
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg').src = data.img;

    // タグを生成して追加
    const tagArea = document.getElementById('modalTagArea');
    tagArea.innerHTML = ''; // 前のを消す
    data.tags.forEach((text, index) => {
        const tag = document.createElement('div');
        tag.className = `bubble-tag tag-pos-${index}`;
        tag.innerText = text;
        tagArea.appendChild(tag);
    });

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

// これで確実に閉じる！
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active'); // アニメーションを戻す
    
    // 0.6秒待ってから消す（CSSのtransitionと合わせる）
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}