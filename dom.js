document.addEventListener("DOMContentLoaded", () => {
  const colorBox = document.getElementById("color-box");
  const changeColorBtn = document.getElementById("change-color-btn");
  const colorCodeText = document.getElementById("color-code");
  const copyBtn = document.getElementById("copy-btn");
  const colorHistory = document.getElementById("color-history");

  const historyColors = [];

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updateColorBox(color) {
    colorBox.style.backgroundColor = color;
    colorCodeText.textContent = color;
    colorCodeText.style.color = color;
  }

  function addToHistory(color) {
    historyColors.unshift(color);
    if (historyColors.length > 5) {
      historyColors.pop();
    }

    colorHistory.innerHTML = "";
    historyColors.forEach(c => {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = c;
      swatch.title = c;
      swatch.addEventListener("click", () => {
        updateColorBox(c);
      });
      colorHistory.appendChild(swatch);
    });
  }

  changeColorBtn.addEventListener("click", () => {
    const newColor = getRandomColor();
    updateColorBox(newColor);
    addToHistory(newColor);
  });

  copyBtn.addEventListener("click", () => {
    const color = colorCodeText.textContent;
    navigator.clipboard.writeText(color).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1500);
    });
  });

  // Initial color in history
  addToHistory("#3498db");
});
