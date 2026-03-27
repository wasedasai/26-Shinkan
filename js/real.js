
const interviewData = {
    'interview1': {
        title: '運スタでやりがいを感じるときは？',
        img: '../images/real/yarigaidayo.jpg',
        tags: ['企画が成功した瞬間', '来場者の笑顔を見た時', '来場者や後輩が楽しそうにしている時', '早稲田祭当日に規模の大きさを実感した時', '早稲田祭を終えた瞬間の景色']
    },
    'interview2': {
        title: '運スタに入会した理由は？',
        img: '../images/real/nyukaidayo.png',
        tags: ['日本一の学園祭をつくれるから', '何か大学で大きなものを成し遂げたかった', '文化祭運営に憧れがあった', '文化祭・学祭が大好きだから']
    },
    'interview3': {
        title: '運スタの好きなところは？',
        img: '../images/real/tanoshiiiinaaaa.png',
        tags: ['人との繋がりが本当にたくさんできる', 'とにかく仲が良い', '早稲田祭への愛が強い', '活動の毎日が想い出なところ', '早稲田祭に最前線で関われる']
    },
    'interview4': {
        title: '運スタで楽しかったことは？',
        img: '../images/real/nanndetanoshiino.jpg',
        tags: ['何かを創り上げて祭りを成功させるという共通の目標を持って活動ができる', 'いろいろなバックグラウンドを持つ人がいて話してて楽しい！', 'とにかく沢山の人と仲良くなれる', '大学生らしいレクや遊びがたくさんできた！']
    },
    'interview5': {
        title: '運スタの魅力は？',
        img: '../images/real/miryoooooooooku.jpg',
        tags: ['祭の後の感動、達成感が半端じゃない', '自分の生み出したものが来場者のみなさんに届いたときの感動', '運スタや来場者、他のサークルのみなさんに感謝される', 'ステージ裏から完成した舞台を見てとても感動した', '早稲田祭当日に、はっぴを着てキャンパスを歩くことが楽しい！']
    },
};

function openModal(id) {
    const data = interviewData[id];
    const overlay = document.getElementById('modalOverlay');
    
    if (!data) return; // データがない場合は何もしない

    // 中身を書き換える
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg').src = data.img;

    // タグを生成して追加
    const tagArea = document.getElementById('modalTagArea');
    tagArea.innerHTML = ''; // 前のを消す
    data.tags.forEach((text, index) => {
        const tag = document.createElement('div');
        tag.className = `bubble-tag tag-pos-${index}`; // CSSで位置を制御するためのクラス
        tag.innerText = text;
        tagArea.appendChild(tag);
    });

    // モーダルを表示
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active'); 
    
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
} // ← ここが抜けていたので足しました！