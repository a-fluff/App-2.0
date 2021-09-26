let tabs = document.querySelector('.tabs');
let tabsNav = document.querySelector('.tabs__nav-list');


let foldableList = document.querySelectorAll('.fold-list');
let foldBtn = document.querySelectorAll('.btn--fold');

let modalWindow = document.querySelectorAll('.modal-window');


(function createUnfoldBtn() {
  let button = document.createElement('button');
  let buttonWrapper = document.createElement('div');


  button.classList = 'btn btn--unfold';
  button.textContent = '...'
  buttonWrapper.classList = 'btn__wrapper';

  buttonWrapper.append(button);

  foldableList[0].after(buttonWrapper);
  foldableList[1].after(buttonWrapper.cloneNode(true));
  foldableList[2].after(buttonWrapper.cloneNode(true));
}());

(function locateAddOperationBtn() {
  if(screen.width > 320) {
    let addExpensesBtn = document.querySelector('a[href="#add-expenses"]');
    let addIncomeBtn = document.querySelector('a[href="#add-income"]');
    
    let tabsWidth = +getComputedStyle(tabs).width.slice(0, -2);
    let tabsHeight = +getComputedStyle(tabs).height.slice(0, -2);
    let mainSection = document.querySelector('main');
  
    addExpensesBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addExpensesBtn).right.slice(0, -2) + 'px';
    addExpensesBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addExpensesBtn).bottom.slice(0, -2) + 'px';
    addIncomeBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addIncomeBtn).right.slice(0, -2) + 'px';
    addIncomeBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addIncomeBtn).bottom.slice(0, -2) + 'px';


    console.log(addExpensesBtn.getBoundingClientRect().right, addExpensesBtn.getBoundingClientRect().bottom);

    // addIncomeBtn.style.right  = addExpensesBtn.getBoundingClientRect().right.toFixed(1) + 'px';
    // addIncomeBtn.style.bottom  = addExpensesBtn.getBoundingClientRect().bottom.toFixed(1) + 'px';

    console.log(addIncomeBtn)
  };
}());

//кнопка развернуть
let showMoreBtn = document.querySelectorAll('.btn--unfold');

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
  console.log(addExpensesBtn, addIncomeBtn)
  if(!e.target.classList.contains('tab--expenses')) {
    addExpensesBtn.classList.add('hidden');
  } else {
    addExpensesBtn.classList.remove('hidden');
  };
};