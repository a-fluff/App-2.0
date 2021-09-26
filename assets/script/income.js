let addIncomeBtn = document.querySelector('a[href="#add-income"]');
let saveIncomeBtn = document.querySelector('.tab--income .btn--save');
let backIncomeBtn = document.querySelector('.tab--income .btn--back');

let incomeSum = document.querySelector('.income__sum');
let incomeIconsList = document.querySelector('.fold-list--income');
let incomeDate = document.querySelector('.income__date');

let wrappersIncome = [];


addIncomeBtn.addEventListener('click', function() {
  incomeDate.value = renderTodayDate();
  createOperatioWrapper('income');
});

//сохранение формы доходов
saveIncomeBtn.addEventListener('click', saveIncome);

function saveIncome(e) {
  //!должно быть еще условие по иконке + валидация суммы
  if(incomeSum.value) {

    //добавление записи уже существующей даты
    if(incomeDates.find(item => item == incomeDate.value)) {
      console.log('income', incomeDate, incomeDates)
      addIncomeSameDate();

      addOperation("income");

      sortOperations(total);
  
      clearIncomeForm();
    } else {
      let incomeDateOutputAll = document.querySelectorAll('.income-date');

      if(incomeDateOutputAll.length >= 2) {
        sortEarlierIncomeDates(incomeDateOutputAll);

        sortOperations(total);
      } else {
        addIncome();

        addOperation("income");

        sortOperations(total);
        
        clearIncomeForm();
      }
    };
  } else {
    invalidAlert();

    deleteIncome();

    clearIncomeForm();
  };

  wrappersIncome = document.querySelectorAll('.income-output__wrapper');
  console.log(wrappersIncome);

  renderTotal(total);

  window.location.href = "#";
};

function sortEarlierIncomeDates(incomeDateOutputAll) {
  let curentWrapper = document.querySelector('.income-output__wrapper');

  let options = {day: 'numeric', month: 'long', weekday: 'long'};
  let earlierIncomeDates = incomeDates.filter(item => item < incomeDate.value);

  function getBiggestIncomeDate() {
    let biggest = earlierIncomeDates[0];
    for(let i = 1; i < earlierIncomeDates.length; i++) {
      if(earlierIncomeDates[i] > biggest) {
        biggest = earlierIncomeDates[i];
      }
    };
    
    return biggest;
  };
    
  //если текущая дата меньше всех в массиве
  if(incomeDates.filter(item => item > incomeDates.value)) {
    if(earlierIncomeDates.length == 0) {
      addIncome();
      
      wrappersIncome[wrappersIncome.length - 1].after(curentWrapper);
      curentWrapper.before(incomeDateOutputAll[0]);

      addOperation("income");

      clearIncomeForm();
    } else {
      let biggestDate = new Date(getBiggestIncomeDate()).toLocaleDateString('ru', options);
      let biggestDateOutput = Array.from(incomeDateOutputAll).find(item => item.textContent == biggestDate);

      addIncome();

      biggestDateOutput.before(curentWrapper.previousElementSibling);
      biggestDateOutput.before(curentWrapper);

      addOperation("income");

      clearIncomeForm();
    };
  };
};

//создание новой записи доходов
function addIncome() {

  //дата
  //incomeDateOutput.textContent = getIncomeDate();

  //иконка расходов
  //getIcon();

  //наименование расхода
  //expensesTitleOutput.textContent = getItem[1];

  //сумма расходов
  //incomeSumOutput.textContent = `+${incomeSum.value}`;
  //console.log(expensesTitleOutput.textContent, expensesSelectedIconOutput);
};

//создание новой записи доходов уже существующей даты
function addIncomeSameDate() {
  let incomeSelectedIconOutput = document.querySelector('.income__selected-icon');
  let incomeTitleOutput = document.querySelector('.income-title');

  //копии иконки и названия расходов
  let iconClone = incomeSelectedIconOutput.children[0].cloneNode(true);
  let titleClone = incomeTitleOutput.textContent;

  let index = getIncomeNumber();

  //заполнение всех полей в новой записи
  wrappersIncome[index].prepend(createOperationNote('income'));
  wrappersIncome[index].querySelector('.income__selected-icon').append(iconClone);
  wrappersIncome[index].querySelector('.income-title').append(titleClone);
  wrappersIncome[index].querySelector('.income-received').textContent = `+${incomeSum.value}`;

  //удаление обёртки созданной при нажатии на +
  deleteIncome();
};

//получение выбранной иконки и наименования, изменение цвета при выборе
incomeIconsList.addEventListener('click', getIconWrapper);

function getIconWrapper(e) {
  let incomeSelectedIconOutput = document.querySelector('.income__selected-icon');
  let incomeTitleOutput = document.querySelector('.income-title');

  let selectedIcon = e.target;

  function getIcon() {
    if(selectedIcon.classList.contains('categories__item-icon')) {
      selectedIcon = selectedIcon.parentElement;
      selectItem(selectedIcon);

      return selectedIcon;
    } else if(selectedIcon.classList.contains('icon__wrapper')) {
      selectItem(selectedIcon);

      return selectedIcon;
    };
  };

  if(incomeSelectedIconOutput.innerHTML == 0) {
    incomeSelectedIconOutput.append(getIcon().cloneNode(true));
  } else if(incomeSelectedIconOutput.innerHTML != 0) {
    incomeSelectedIconOutput.innerHTML = '';
    incomeSelectedIconOutput.append(getIcon().cloneNode(true));
  };


  function getCategoryName() {
    let incomeIcons = document.querySelectorAll('.fold-list--income .categories__item');
    let incomeTitles = document.querySelectorAll('.fold-list--income .categories__item .category__title');

    let index = Array.from(incomeIcons).indexOf(getIcon().parentElement);

    return incomeTitles[index].textContent;
  };

  incomeTitleOutput.textContent = getCategoryName();
};

//получение даты доходов
function getIncomeDate() {
  console.log(incomeDates)
  if(!incomeDates.find(item => item == incomeDate.value)) {
    incomeDates.push(incomeDate.value);
  };

  let date = new Date(incomeDate.value);

  if(date.toISOString().slice(0, 10) == renderTodayDate()) {
    return `Сегодня`
  } else {
    let options = {day: 'numeric', month: 'long', weekday: 'long'};
    return date.toLocaleDateString('ru', options); 
  };
};

//создание новой записи доходов
function addIncome() {
  //дата
  let incomeDateOutput = document.querySelector('.income-date');

  incomeDateOutput.textContent = getIncomeDate();

  //сумма расходов
  let incomeSum = document.querySelector('.income__sum');
  let incomeSumOutput = document.querySelector('.income-received');
  
  console.log(incomeSumOutput);
  
  if(incomeSum.value) {
    incomeSumOutput.textContent = `+${incomeSum.value}`;
  };
};

//кнопка назад
backIncomeBtn.addEventListener('click', deleteIncomeWrapper);

function deleteIncomeWrapper() {  
  if(window.location.href = "#add-income") {
    let permission = confirm('Сохранить изменения операции?');

    if(!permission) {
      deleteIncome();

      clearIncomeForm();
    } else {
      saveIncome();
    };  
  } else {
    deleteIncome();
  };
};

function deleteIncome() {
  let operationDateOutput = document.querySelector('.income-date');
  let wrapper = document.querySelector('.income-output__wrapper');

  if(!operationDateOutput.textContent) {
    wrapper.remove();
    operationDateOutput.remove();
  };
};

function clearIncomeForm() {
  incomeSum.value = '';
  unSelectItem();
  incomeDate.value = renderTodayDate();
};

function getIncomeNumber() {
  incomeDates.sort().reverse();

  let index = incomeDates.indexOf(incomeDate.value);

  return index;
};

//Рендер списка категорий в модальном окне
function renderIncomeCategory() {
  incomeIconsList.innerHTML = '';

  categoriesIncome.forEach(function(category) {
    incomeIconsList.appendChild(templateCategory(category));
  });
};

//Рендер записей доходов
function renderIncomeNotes(category, value) {
  let incomeCategory = document.querySelectorAll('.income-title');

  Array.from(incomeCategory).forEach(title => title.textContent = value);
};

function renderChangedIncomeTotal(category, item) {
  total.forEach(obj => {
    if(obj.category == category) {
      obj.category = item;
    }
  });

  renderTotal(total);
};