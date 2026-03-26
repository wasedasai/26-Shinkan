function hoverIn(element, line1Text, line2Text = "") {
    const pathElement = element.querySelector('path');
    const tspan1 = element.querySelector('.line1');
    const tspan2 = element.querySelector('.line2');
    const textElement = element.querySelector('text'); // text要素を取得

    const originalColor = pathElement.getAttribute('fill');

    // --- 図形の見た目 ---
    pathElement.style.fill = "#FFFCFC";
    pathElement.style.stroke = originalColor;
    pathElement.style.strokeWidth = "8";

    // --- テキスト共通設定 ---
    // 【重要】1行でも2行でも、ホバー時は必ず20pxに固定する
    textElement.style.fontSize = "20px";
    tspan1.style.fill = "#1c1b1b";
    tspan1.textContent = line1Text;

    // --- 行数による位置の切り替え ---
    if (line2Text !== "") {
        // 2行ある場合
        tspan1.setAttribute('dy', '-0.6em'); 
        tspan2.textContent = line2Text;
        tspan2.style.fill = "#1c1b1b";
    } else {
        // 1行だけの場合
        tspan1.setAttribute('dy', '0.3em'); // 中央に配置
        tspan2.textContent = "";
    }
}

function hoverOut(element, originalTitle) {
    const pathElement = element.querySelector('path');
    const tspan1 = element.querySelector('.line1');
    const tspan2 = element.querySelector('.line2');
    const textElement = element.querySelector('text');

    // 図形の見た目を戻す
    pathElement.style.fill = ""; 
    pathElement.style.stroke = "none";

    // --- 元の状態にリセット ---
    // 1. 文字サイズを36pxに戻す
    textElement.style.fontSize = "36px";
    
    // 2. テキストを元のタイトルに戻し、位置を中央(0.3em)にする
    tspan1.textContent = originalTitle;
    tspan1.style.fill = "white";
    tspan1.setAttribute('dy', '0.3em'); 
    
    // 3. 2行目は確実に消す
    tspan2.textContent = "";
}

