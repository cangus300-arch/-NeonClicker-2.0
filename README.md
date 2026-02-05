<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Neon Clicker Pro</title>
  <style>
    body {
      margin: 0;
      font-family: 'Arial', sans-serif;
      background: linear-gradient(180deg, #0a0a1a, #1a1a2e);
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      position: relative;
    }

    h1 {
      margin: 20px 0;
      text-shadow: 0 0 15px #00ffde;
    }

    #progressText {
      font-size: 24px;
      margin-bottom: 5px;
      text-shadow: 0 0 10px #00ffde;
    }

    #clickCount {
      font-size: 18px;
      margin-bottom: 20px;
      text-shadow: 0 0 5px #00ffde;
    }

    .menu {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      position: relative;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      background: linear-gradient(90deg, #ff8a00, #e52e71);
      color: #fff;
      transition: all 0.2s;
    }

    button:hover {
      transform: scale(1.1);
      box-shadow: 0 0 15px #ff8a00;
    }

    button:active {
      transform: scale(0.9);
      background: linear-gradient(90deg, #e52e71, #ff8a00);
    }

    #clickButton {
      font-size: 24px;
      padding: 20px 40px;
      margin: 20px 0;
      box-shadow: 0 0 15px #00ffde;
    }

    .stats {
      margin: 10px 0;
      font-size: 18px;
      text-shadow: 0 0 8px #00ffde;
    }

    .progress-container {
      width: 80%;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 20px;
      height: 25px;
    }

    .progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #00ffde, #00aaff);
      transition: width 0.2s;
      border-radius: 20px;
    }

    .modal {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(20, 20, 40, 0.95);
      padding: 20px;
      border-radius: 15px;
      width: 400px;
      max-height: 70%;
      overflow-y: auto;
      box-shadow: 0 0 20px #00ffde;
      z-index: 10;
    }

    .modal h2 {
      margin-top: 0;
      text-align: center;
    }

    .modal button {
      margin-top: 5px;
      width: 100%;
    }

    #musicToggle, #infoBtn {
      position: fixed;
      top: 10px;
      padding: 10px;
      font-size: 14px;
    }

    #musicToggle { right: 10px; }
    #infoBtn { right: 120px; }

    #turboStatus {
      position: fixed;
      bottom: 10px;
      left: 10px;
      font-size: 16px;
      text-shadow: 0 0 10px #ff8a00;
    }

    #moneyDisplayUpgrade {
      position: absolute;
      top: 10px;
      right: 10px;
      font-weight: bold;
    }

    .overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 5;
    }

    .floating-text {
      position: absolute;
      font-size: 20px;
      pointer-events: none;
      animation: floatUp 1s ease-out forwards;
      text-shadow: 0 0 10px #00ffde;
    }

    @keyframes floatUp {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-40px); }
    }
  </style>
</head>
<body>
  <h1>Neon Clicker Pro</h1>

  <div id="progressText">Cíl: 100000000 → 0</div>
  <div id="clickCount">Kliky: 0</div>

  <div class="menu">
    <button id="upgradesBtn">Upgrady</button>
    <button id="resetBtn">Reset hry</button>
  </div>

  <div class="stats">
    💰 Peníze: <span id="money">0</span><br>
    🏭 Továrny: <span id="factories">0</span><br>
    ⚡ Multiplikátor: x<span id="multiplier">1</span>
  </div>

  <div class="progress-container">
    <div class="progress-bar" id="progressBar"></div>
  </div>

  <button id="clickButton">Klikni!</button>
  <button id="musicToggle">Hudba ON</button>
  <button id="infoBtn">Info ?</button>
  <div id="turboStatus">Turbo Ready</div>

  <audio id="bgMusic" loop>
    <source src="https://cdn.pixabay.com/download/audio/2023/02/14/audio_68a4ac0039.mp3?filename=neon-gaming-142228.mp3" type="audio/mpeg">
  </audio>
  <audio id="clickSound" src="https://www.soundjay.com/button/sounds/button-16.mp3"></audio>
  <audio id="buySound" src="https://www.soundjay.com/button/sounds/button-3.mp3"></audio>

  <div class="overlay" id="overlay"></div>

  <div class="modal" id="upgradesModal">
    <h2>Upgrady <span id="moneyDisplayUpgrade"></span></h2>
    <div id="upgradesList"></div>
    <button id="closeUpgrades">Zavřít</button>
  </div>

  <div class="modal" id="infoModal">
    <h2>Jak hra funguje?</h2>
    <ul>
      <li>🖱️ +1 za klik – zvyšuje kolik 💰 dostaneš za klik.</li>
      <li>⚙️ Auto-clicker – automaticky kliká za tebe.</li>
      <li>🏭 Továrna – vydělává pasivní příjem každých 5 s.</li>
      <li>⚡ Multiplikátor – násobí všechny zisky ×2 (max 3×).</li>
      <li>💎 Kritický klik – šance na ×5 💰 klik (aktivuje se po koupi).</li>
      <li>🔥 Turbo klik – krátkodobý ×3 boost.</li>
      <li>🎲 Random bonus – náhodně 0–17500 💰 (max 5×, cena se nemění).</li>
      <li>💰 Zlato z nebe – jednorázový bonus +100 000 💰.</li>
    </ul>
    <button id="closeInfo">Zavřít</button>
  </div>

  <script>
    // Hlavní proměnné
    let targetClicks = 100000000;
    let clicks = parseInt(localStorage.getItem('clicks')) || 0;
    let money = parseInt(localStorage.getItem('money')) || 0;
    let factories = parseInt(localStorage.getItem('factories')) || 0;
    let multiplier = parseInt(localStorage.getItem('multiplier')) || 1;
    let critLevel = parseInt(localStorage.getItem('critLevel')) || 0;
    let autoClickLevels = parseInt(localStorage.getItem('autoClickLevels')) || 0;
    const maxFactories = 10;
    let autoClickInterval = null;
    let factoryIntervals = [];
    let turboReady = true;

    // DOM elementy
    const moneyDisplay = document.getElementById('money');
    const factoriesDisplay = document.getElementById('factories');
    const multiplierDisplay = document.getElementById('multiplier');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const clickCount = document.getElementById('clickCount');
    const upgradesList = document.getElementById('upgradesList');
    const turboStatus = document.getElementById('turboStatus');
    const moneyDisplayUpgrade = document.getElementById('moneyDisplayUpgrade');

    function updateDisplay() {
      moneyDisplay.textContent = money;
      factoriesDisplay.textContent = factories;
      multiplierDisplay.textContent = multiplier;
      progressBar.style.width = Math.min((clicks / targetClicks) * 100, 100) + '%';
      progressText.textContent = `Cíl: ${Math.max(targetClicks - clicks, 0)} → 0`;
      clickCount.textContent = `Kliky: ${clicks}`;
      moneyDisplayUpgrade.textContent = `💰 ${money}`;
    }

    function saveProgress() {
      localStorage.setItem('money', money);
      localStorage.setItem('factories', factories);
      localStorage.setItem('multiplier', multiplier);
      localStorage.setItem('clicks', clicks);
      localStorage.setItem('autoClickLevels', autoClickLevels);
      localStorage.setItem('critLevel', critLevel);
      localStorage.setItem('upgrades', JSON.stringify(upgrades.map(u => ({level: u.level, price: u.price}))));
    }

    function showFloatingText(text, x, y) {
      const span = document.createElement('span');
      span.className = 'floating-text';
      span.style.left = x + 'px';
      span.style.top = y + 'px';
      span.textContent = text;
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 1000);
    }

    // Upgrady
    const upgrades = [
      {icon:'🖱️', name:'+1 za klik', desc:'Zvyšuje příjem za klik o +1 💰.', price:50, max:50, level:0, effect:()=>{ multiplier +=1; }},
      {icon:'⚙️', name:'Auto-clicker', desc:'Kliká automaticky 1×/s za každý level.', price:500, max:10, level:0, effect:()=>{ 
        autoClickLevels++;
        if(autoClickInterval) clearInterval(autoClickInterval);
        autoClickInterval = setInterval(() => {
          money += autoClickLevels * multiplier;
          clicks += autoClickLevels * multiplier;
          updateDisplay(); saveProgress();
        },1000);
      }},
      {icon:'🏭', name:'Továrna', desc:'Vydělává 5 × multiplikátor 💰 každých 5 s.', price:2000, max:10, level:0, effect:()=>{ 
        factories++;
        let interval = setInterval(()=>{
          money += 5 * multiplier;
          clicks += 5 * multiplier;
          updateDisplay(); saveProgress();
        },5000);
        factoryIntervals.push(interval);
      }},
      {icon:'⚡', name:'Multiplikátor x2', desc:'Zdvojnásobí všechny zisky.', price:12500, max:3, level:0, effect:()=>{ multiplier *=2; }},
      {icon:'💎', name:'Kritický klik', desc:'Zvyšuje šanci na ×5 💰 klik o +5 % za level.', price:5000, max:5, level:0, effect:()=>{ critLevel++; }},
      {icon:'🔥', name:'Turbo klik', desc:'Na 5 s ×3 kliky (cooldown 30 s).', price:10000, max:3, level:0, effect:()=>{
        if(turboReady){
          turboReady=false; multiplier*=3; turboStatus.textContent="Turbo aktivní!";
          setTimeout(()=>{
            multiplier=Math.max(1,multiplier/3); turboStatus.textContent="Turbo Cooldown";
            setTimeout(()=>{ turboReady=true; turboStatus.textContent="Turbo Ready"; },30000);
          },5000);
        } else alert("Turbo je na cooldown!");
      }},
      {icon:'🎲', name:'Random bonus', desc:'Po koupi získáš náhodně 0–17500 💰 (max 5×, cena se nemění).', price:15000, max:5, level:0, effect:()=>{
        if(upgrades[6].level < upgrades[6].max){
          let bonus = Math.floor(Math.random()*17501);
          money += bonus;
          upgrades[6].level++;
          alert(`🎲 Random bonus: +${bonus} 💰`);
        }
      }},
      {icon:'💰', name:'Zlato z nebe', desc:'Jednorázový bonus +100 000 💰.', price:50000, max:1, level:0, effect:()=>{ money+=100000; alert('💰 Zlato z nebe: +100000 💰'); }}
    ];

    // Načtení uložených upgrade levelů
    let savedUpgrades = JSON.parse(localStorage.getItem('upgrades'));
    if(savedUpgrades && savedUpgrades.length === upgrades.length){
      upgrades.forEach((up,index)=>{
        up.level = savedUpgrades[index].level || 0;
        up.price = savedUpgrades[index].price || up.price;
      });
    }

    function openUpgrades(){
      upgradesList.innerHTML = '';
      upgrades.forEach((up,index)=>{
        let div = document.createElement('div');
        div.innerHTML = `<b>${up.icon} ${up.name}</b><br><small>${up.desc}</small><br>Cena: ${up.price} 💰<br>Level: ${up.level}/${up.max}`;
        const buyBtn = document.createElement('button');
        buyBtn.disabled = money < up.price || up.level >= up.max;
        buyBtn.textContent = up.level>=up.max?'Max':'Koupit';
        buyBtn.addEventListener('click', ()=>{
          if(money>=up.price && up.level<up.max){
            money -= up.price;
            up.effect();
            if(index !== 6) { up.level++; up.price = Math.floor(up.price*1.7); }
            document.getElementById('buySound').play();
            updateDisplay(); openUpgrades(); saveProgress();
          } else alert('Nemáš dost peněz nebo jsi na max levelu!');
        });
        div.appendChild(buyBtn);
        div.style.marginBottom='10px';
        upgradesList.appendChild(div);
      });
      document.getElementById('upgradesModal').style.display='block';
      document.getElementById('overlay').style.display='block';
    }

    document.getElementById('upgradesBtn').addEventListener('click', openUpgrades);
    document.getElementById('closeUpgrades').addEventListener('
