
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