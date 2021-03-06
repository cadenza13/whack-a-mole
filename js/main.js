'use strict';

{
  const moles = document.querySelectorAll('.mole');
  const mask = document.querySelectorAll('.mask');
  const score = document.getElementById('score');
  const time = document.getElementById('time');
  const gameStart = document.getElementById('start');
  const reStart = document.getElementById('reStart');
  const result = document.getElementById('result');
  const firstImage = document.getElementById('img-a');
  const secondImage = document.getElementById('img-b');
  const sound = document.getElementById('sound');
  let isSound = false;
  let scorePoint = 0;
  let timer = 60;
  let rank;

  function bgm(){
    if(isSound === true){
      sound.pause();
      sound.currentTime = 0;
      isSound = false;
    } else{
      sound.play();
      isSound = true;
    } 
  }

  function moleUp(){
    const n = Math.floor(Math.random() * moles.length);
    if(moles[n].classList.contains('interval')){
      moleUp();
      return;
    }
    moles.forEach(mole =>{
      mole.classList.remove('interval');
    });
    moles[n].src = 'img/mole01.PNG';
    moles[n].classList.add('encount');
    moles[n].classList.add('interval');
    if(timer === 0){
      return;
    }else if(timer < 15){
      setTimeout(moleDown, 499);
      setTimeout(moleUp, 500);
      return;
    }else if(timer < 30){
      setTimeout(moleDown, 999);
      setTimeout(moleUp, 1000);
      return;
    }else if(timer < 45){
      setTimeout(moleDown, 1499);
      setTimeout(moleUp, 1500);
      return;
    }else{
      setTimeout(moleDown, 1999);
      setTimeout(moleUp, 2000);
    }
  }

  function moleDown(){
    moles.forEach(mole =>{
      if(mole.classList.contains('encount')){
        mole.classList.remove('encount');
        return;
      }
    });
  }

  moles.forEach(mole =>{
    mole.addEventListener('click', () =>{
      if(mole.classList.contains('encount')){
        scorePoint++;
        mole.src = 'img/mole02.PNG';
        mole.classList.remove('encount');
        score.textContent = `score : ${scorePoint}`;
      }
    });
  });

  function countTimer(){
    timer--;
    time.textContent = `${timer}`;
    if(timer === 0){
      mask[1].classList.remove('hidden');
      if(scorePoint > 40){
        firstImage.src = 'img/yuusya.png';
        secondImage.src = 'img/A.png';
        rank = '???????????????';
      } else if(scorePoint > 30){
        firstImage.src = 'img/knight.png';
        secondImage.src = 'img/B.png';
        rank = '???????????????';
      } else if(scorePoint > 15){
        firstImage.src = 'img/heitai.png';
        secondImage.src = 'img/C.png';
        rank = '????????????';
      } else{
        firstImage.src = 'img/man.png';
        secondImage.src = 'img/D.png';
        rank = '????????????';
      }
      setTimeout(resultScreen, 3000);
      bgm();
      return;
    }
    setTimeout(countTimer, 1000);
  }

  function resultScreen(){
    mask[1].classList.add('hidden');
    mask[2].classList.remove('hidden');
    result.textContent = `???????????????${rank}?????????!`;
    setTimeout(resultScreenNext, 1000);
  }

  function resultScreenNext(){
    firstImage.classList.remove('clear');
    result.classList.remove('clear');
  }

  gameStart.addEventListener('click', () =>{
    mask[0].classList.add('hidden');
    setTimeout(moleUp, 2000);
    setTimeout(countTimer, 1000);
    bgm();
  });

  reStart.addEventListener('click', () =>{
    mask[2].classList.add('hidden');
    firstImage.classList.add('clear');
    result.classList.add('clear');
    score.textContent = 'score : 0';
    time.textContent = '60';
    scorePoint = 0;
    timer = 60;
    moleDown();
    setTimeout(moleUp, 2000);
    setTimeout(countTimer, 1000);
    bgm();
  });
}