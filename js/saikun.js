
// function hoverIn(element, detail) {
//     const pathElement = element.querySelector('path');
//     const textElement = element.querySelector('text');

//     // 1. 元の色を取得
//     const originalColor = pathElement.getAttribute('fill');


//     // 3. 文字：中身を詳細に変え、色を元の色（赤など）にする
//     textElement.textContent = detail;
//     textElement.style.fill = "#1c1b1b"; 
// }

// // --- マウスが外れた時（ホバーアウト）の処理 ---
// function hoverOut(element, title) {
//     const pathElement = element.querySelector('path');
//     const textElement = element.querySelector('text');

//     textElement.textContent = title; // タイトルに戻す
//     textElement.style.fill = "white"; // 白文字に戻す
// }


/**
//  * マウスが乗った時（ホバーイン）
//  * @param {Element} element - 触れた <g> 要素
//  * @param {string} line1Text - 1行目の表示文字
//  * @param {string} line2Text - 2行目の表示文字（空でもOK）
//  */
// function hoverIn(element, line1Text, line2Text = "") {
//     const pathElement = element.querySelector('path');
//     const tspan1 = element.querySelector('.line1');
//     const tspan2 = element.querySelector('.line2');
//     const textElement = element.querySelector('text');

//     // 1. 元の色（fill属性）を取得して枠線（stroke）に利用する
//     const originalColor = pathElement.getAttribute('fill');

//     // 2. 図形：背景を白(#FFFCFC)にし、枠線を元の色にする
//     pathElement.style.fill = "#FFFCFC";
//     pathElement.style.stroke = originalColor;
//     pathElement.style.strokeWidth = "8"; // 枠線をしっかり見せる
//     pathElement.style.transition = "0.3s";

//     // 3. 文字：中身を書き換え、色を黒(#1c1b1b)にする
//     if (tspan1) {
//         tspan1.textContent = line1Text;
//         tspan1.style.fill = "#1c1b1b"; 
//     }
    
//     if (tspan2) {
//         tspan2.textContent = line2Text;
//         tspan2.style.fill = "#1c1b1b";
//     }

//     // 4. 文字サイズ：2行の時は少し小さくして枠内に収める
//     if (line2Text !== "") {
//         textElement.style.fontSize = "26px";
//     } else {
//         textElement.style.fontSize = "32px";
//     }
// }

// /**
//  * マウスが離れた時（ホバーアウト）
//  * @param {Element} element - 離れた <g> 要素
//  * @param {string} originalTitle - 元のタイトル（名前、誕生日など）
//  */
// function hoverOut(element, originalTitle) {
//     const pathElement = element.querySelector('path');
//     const tspan1 = element.querySelector('.line1');
//     const tspan2 = element.querySelector('.line2');
//     const textElement = element.querySelector('text');

//     // 1. 図形：枠線を消し、背景色をリセット（CSSのfillに戻る）
//     pathElement.style.fill = ""; 
//     pathElement.style.stroke = "none";

//     // 2. 文字：元のタイトルに戻し、色を白にする
//     if (tspan1) {
//         tspan1.textContent = originalTitle;
//         tspan1.style.fill = "white";
//     }
    
//     if (tspan2) {
//         tspan2.textContent = ""; // 2行目は消去
//     }

//     // 3. 文字サイズを元に戻す
//     textElement.style.fontSize = "40px";
// }

function hoverIn(element, line1Text, line2Text = "") {
    const pathElement = element.querySelector('path');
    const tspan1 = element.querySelector('.line1');
    const tspan2 = element.querySelector('.line2');
    
    const originalColor = pathElement.getAttribute('fill');

    // 図形の見た目
    pathElement.style.fill = "#FFFCFC";
    pathElement.style.stroke = originalColor;
    pathElement.style.strokeWidth = "8";

    // 1行目のテキスト
    tspan1.textContent = line1Text;
    tspan1.style.fill = "#1c1b1b";
    
    // 【重要】2行目がある時だけ上にずらす
    if (line2Text !== "") {
        tspan1.setAttribute('dy', '-0.6em'); 
        tspan2.textContent = line2Text;
        tspan2.style.fill = "#1c1b1b";
        element.querySelector('text').style.fontSize = "20px";
    } else {
        tspan1.setAttribute('dy', '0.3em'); // 1行だけの時はほぼ真ん中
        tspan2.textContent = "";
    }
}

function hoverOut(element, originalTitle) {
    const pathElement = element.querySelector('path');
    const tspan1 = element.querySelector('.line1');
    const tspan2 = element.querySelector('.line2');

    pathElement.style.fill = ""; 
    pathElement.style.stroke = "none";

    tspan1.textContent = originalTitle;
    tspan1.style.fill = "white";
    
    // 【重要】元のタイトル1行の時は、ずらさず真ん中に戻す
    tspan1.setAttribute('dy', '0.3em'); 
    tspan2.textContent = "";
    
    element.querySelector('text').style.fontSize = "36px";
}