let tabs = document.querySelector('.tabs');
let tabsNav = document.querySelector('.tabs__nav-list');


let currencySelect = document.querySelector('.select-currency');
let currencyValue = document.querySelector('.currency__output');


//Выбор валюты
currencySelect.addEventListener('change', function() {
  currencyValue.textContent = currencySelect.value;
});

(function createUnfoldBtn() {
  let allDivsInFoldableList = document.querySelectorAll('.fold-list > div:not(.add-item)');
  console.log(allDivsInFoldableList, getComputedStyle(document.querySelector('.categories__item')).width);

  let button = document.createElement('button');
  let buttonWrapper = document.createElement('div');


  button.classList = 'btn btn--unfold';
  button.textContent = '...'
  buttonWrapper.classList = 'btn__wrapper';
  buttonWrapper.append(button);
  //?не работает ↓
  //allDivsInFoldableList[3].before(buttonWrapper);



  //for(let i = 1; i < 8; i + 2) {}
  //fold-list <300 то [3] 200/100*2-1
  //fold-list >300 && <400 то [5] 300/100*2-1
  //fold-list >400 && <500 то [7] 400/100*2-1
  //fold-list >=400 то последний = [3]
  function locateShowMoreBtn() {

  };



  //!!!

  // window.onresize = function() {
  //   if(screen.width < 511) {
  //     allDivsInFoldableList[Math.floor((foldableList[0].clientWidth - 1)/document.querySelector('.categories__item').clientWidth)*2 - 1].before(buttonWrapper);
  //   } else {
  //     allDivsInFoldableList[Math.floor((foldableList[0].clientWidth)/document.querySelector('.categories__item').clientWidth) - 1].before(buttonWrapper);
  //   };
  // };

}());


//кнопка разворота ...
showMoreBtn.forEach((item, index) => item.addEventListener('click', function() {
  foldableList[index].classList.add('unfold-list');
  item.parentElement.classList.add('hidden');
  foldBtn[index].classList.remove('hidden');
}));

//кнопка свернуть
foldBtn.forEach((item, index) => item.addEventListener('click', function() {
  foldableList[index].classList.remove('unfold-list');
  showMoreBtn[index].parentElement.classList.remove('hidden');
  item.classList.add('hidden');
}));

//!
(function locateAddOperationBtn() {
  if(screen.width > 720) {
    let addExpensesBtn = document.querySelector('a[href="#add-expenses"]');
    let addIncomeBtn = document.querySelector('a[href="#add-income"]');
    
    let tabsWidth = +getComputedStyle(tabs).width.slice(0, -2);
    let tabsHeight = +getComputedStyle(tabs).height.slice(0, -2);
    let mainSection = document.querySelector('main');
  
    addExpensesBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addExpensesBtn).right.slice(0, -2) + 'px';
    addExpensesBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addExpensesBtn).bottom.slice(0, -2) + 'px';
    addIncomeBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addIncomeBtn).right.slice(0, -2) + 'px';
    addIncomeBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addIncomeBtn).bottom.slice(0, -2) + 'px';
    console.log(addExpensesBtn)
     };
}());

tabsNav.addEventListener('click', switchTab);

function switchTab(e) {
  console.log(window.location.href)
  window.location.href = "#";

  toggleAddExpensesBtn(e);

  if(e) {
    deleteExpenses();
    deleteIncome();
  };
};

function toggleAddExpensesBtn(e) {
  if(!e.target.classList.contains('tab--expenses')) {
    addExpensesBtn.classList.add('hidden')
  } else {
    addExpensesBtn.classList.remove('hidden')
  };
};