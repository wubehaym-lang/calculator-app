let displayText = '';
let previous = '';
let current = '';
let oprator = '';
let solutionFinshed = false;
let hasDecimal = false;

renderInputs();

document.querySelectorAll('.zeros').forEach((zero)=> {
  zero.addEventListener('click', ()=> {
    let btnValue = zero.innerText;
      if(current === '' || Number(current) === 0 && hasDecimal === false){
        if(previous === ''){
          current = '';
          displayText = '';
          previous = '';
          oprator = '';
          displayText = '0';
          current = '0';
        } else{
          
          current = '0';
          displayText = `${previous}${oprator}${current}`;
          console.log('here')
        }
        
      } else if(solutionFinshed === true){
        solutionFinshed = false;
        current = '';
        displayText = '';
        previous = '';
        oprator = '';
        displayText = '0';
        current = '0';
      } else{
        displayText += btnValue;
        current += btnValue;
      }

      console.log(previous, oprator, current)
      renderInputs();

  });
});

document.querySelectorAll('.num').forEach((numBtn) => {
  numBtn.addEventListener('click', ()=> {
    let numBtnValue = numBtn.innerText;
    
    if(current === '0' && previous === ''){
      displayText = numBtnValue;
      current = numBtnValue;
    } else if(solutionFinshed === true){
      solutionFinshed = false;
      current = '';
      previous = '';
      oprator = '';
      current = numBtnValue;
      displayText = numBtnValue ;
    } else{
      if(current === '0'){
        current = numBtnValue;
        displayText = `${previous}${oprator}${current}`;
      }else{
        displayText += numBtnValue;
        current += numBtnValue;
      }
    }
    renderInputs();
  });
});

document.querySelector('.numDot').addEventListener('click', () => {

  if(current === '' && hasDecimal === false){
    if (previous === ''){
      solutionFinshed = false;
      current = '';
      displayText = '';
      previous = '';
      oprator = '';
      displayText += '0.';
      current += '0.';  
      console.log('here')
    } else{
      displayText += '0.';
      current += '0.'; 
    }
  } else if(hasDecimal === false && current !== '' ){
    displayText += '.';
    current += '.';
  }
  
  hasDecimal = true;
  renderInputs();
});


document.querySelectorAll('.oprat').forEach((opratBtn)=>{
  opratBtn.addEventListener('click', ()=>{
    let btnValue = opratBtn.innerText;
    solutionFinshed = false;

    if(current !== '' && previous !== ''){
      current = calcOpration();
      displayText = current;
    } 

    if(current !== ''){
      previous = current;
      current = '';
      
      displayText += btnValue;
      oprator = btnValue;
    } else if(previous !== '' && current === ''){
      let changed = displayText.slice(0, -1) + btnValue;
      displayText = changed;
      current = '';
    }

    oprator = btnValue;
    hasDecimal = false;
    renderInputs();
  });
});
document.querySelector('.percent').addEventListener('click', ()=>{
  if(previous === '' && current !== ''){
    let perCentNp =  (Number(current) * 10) * 0.01;

    displayText = perCentNp;
    current = perCentNp;
  } else{
    let PerCentWp = (calcOpration()* 10) * 0.01;
    displayText = PerCentWp;
    current =PerCentWp;
  }

  renderInputs();
});

document.querySelector('.solve').addEventListener('click', ()=>{
  solutionFinshed = false;
  if(current !== '' && previous !== ''){
    displayText = calcOpration();
    current = displayText;
    previous = '';
    oprator = '';
    solutionFinshed = true;
  }
  hasDecimal = false;
  renderInputs();
  
});

document.querySelector('.ac').addEventListener('click', ()=> { 
  displayText = '';
  previous = '';
  current = '';
  oprator = '';
  solutionFinshed = false;
  hasDecimal = false;

  renderInputs();
});
document.querySelector('.del').addEventListener('click', ()=>{
  const strDisplayText = String(displayText);
  const strCurrent = String(current);
  const strPrevious = String(previous);
        solutionFinshed = false;

  if(current === '' && oprator !== ''){
    displayText = strDisplayText.slice(0, -1);
    oprator = '';
  } else if(previous !== '' && oprator === ''){
    current = strPrevious;
    displayText = strDisplayText.slice(0, -1);
    previous = '';
  } else{
    displayText = strDisplayText.slice(0, -1);
    current = strCurrent.slice(0, -1);
  }
  renderInputs();
});

function renderInputs() {
  document.getElementById('display').innerText = displayText === '' ? 0 : displayText;
}

function calcOpration() {
  let result = 0;
  const  first = Number(previous)*100;
  const  second = Number(current)*100;

  if(oprator === '+'){
    result = (first + second)/100;
  } else if(oprator === '-'){
    result = (first - second)/100;
  } else if(oprator === '*'){
    result = (first * second)/10000;
  }  else if(oprator === '/'){
    result = first / second;
  }
  oprator = '';
  return result;
}