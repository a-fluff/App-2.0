let addExpensesBtn = document.querySelector('a[href="#add-expenses"]');
let saveExpensesBtn = document.querySelector('.tab--expenses .btn--save');
let backExpensesBtn = document.querySelector('.tab--expenses .btn--back');

let expensesSum = document.querySelector('.expenses__sum');
let expensesIconsList = document.querySelector('.fold-list--expenses');
let expensesDate = document.querySelector('.expenses__date');

let showMoreBtn = document.querySelectorAll('.btn--unfold');
let foldableList = document.querySelectorAll('.fold-list');
let foldBtn = document.querySelectorAll('.btn--fold');

let wrappersExpenses = [];



addExpensesBtn.addEventListener('click', function() {
  expensesDate.value = renderTodayDate();

  createOperatioWrapper('expenses');
});

//создание новой записи в DOM
function createOperationNote(operation) {
  let operationNote = document.createElement('div');
  let operationSelectedIconOutput = document.createElement('div');
  let operationTitleOutput = document.createElement('p');
  let operationSumOutput = document.createElement('p');

  operationNote.className = `${operation}-output`;
  console.log(operationNote)
  operationSelectedIconOutput.className = `${operation}__selected-icon`;
  operationTitleOutput.className = `${operation}-title`;
  if(operation == 'expenses') {
    operationSumOutput.classList = `${operation}-spent`;
  } else if(operation == 'income') {
    operationSumOutput.classList = `${operation}-received`;
  };

  operationNote.appendChild(operationSelectedIconOutput);
  operationNote.appendChild(operationTitleOutput);
  operationNote.appendChild(operationSumOutput);

  return operationNote;
};

//создание обёртки операции
function createOperatioWrapper(operation) {
  let activeTab = document.querySelector('.tabs__panels .js-active');
  let expensesTab = document.querySelector('.tabs__panels .tab--expenses');
  let incomeTab = document.querySelector('.tabs__panels .tab--income');

  let operationDateOutput = document.createElement('p');
  let wrapper = document.createElement('div');
  let operationNote = createOperationNote(operation);

  operationDateOutput.className = `${operation}-date`;
  wrapper.className = `${operation}-output__wrapper`;


  wrapper.appendChild(operationNote);
  console.log(activeTab)
  if(activeTab.classList.contains('tab--expenses')) {
    expensesTab.prepend(wrapper);
    expensesTab.prepend(operationDateOutput); 

    console.log(expensesTab, wrapper, operationDateOutput)
  } else if(activeTab.classList.contains('tab--income')) {
    incomeTab.prepend(wrapper);
    incomeTab.prepend(operationDateOutput); 
  }
};

//сохранение формы расходов
saveExpensesBtn.addEventListener('click', saveExpenses);

function saveExpenses(e) {
  //!должно быть еще условие по иконке + валидация суммы
  if(expensesSum.value) {
    // wrappersExpenses = document.querySelectorAll('.tab--expenses .expenses-output__wrapper');
    // console.log(wrappersExpenses);

    //Добавление записи уже существующей даты
    if(expensesDates.find(item => item == expensesDate.value)) {
      console.log('expenses', expensesDate, expensesDates)
      addExpensesSameDate();

      addOperation("expenses");

      sortOperations(total);

      clearExpensesForm();
    } else {
      let expensesDateOutputAll = document.querySelectorAll('.expenses-date');

      //Сортировка записей по дате
      if(expensesDateOutputAll.length >= 2) {
        sortEarlierExpensesDates(expensesDateOutputAll);
        
        sortOperations(total);
      } else {
        //Создание первой записи
        addExpenses();

        addOperation("expenses");

        sortOperations(total);
        
        clearExpensesForm();
      }
    };
  } else {
    invalidAlert();

    deleteExpenses();

    clearExpensesForm();
  };

  wrappersExpenses = document.querySelectorAll('.tab--expenses .expenses-output__wrapper');

  renderTotal(total); //!запустила рендер вручную - так не нужно было, но не работает из init.js

  window.location.href = "#";
};

function sortEarlierExpensesDates(expensesDateOutputAll) {
  let curentWrapper = document.querySelector('.expenses-output__wrapper');

  let earlierExpensesDates = expensesDates.filter(item => item < expensesDate.value);

  function getBiggestExpensesDate() {
    let biggest = earlierExpensesDates[0];
    for(let i = 1; i < earlierExpensesDates.length; i++) {
      if(earlierExpensesDates[i] > biggest) {
        biggest = earlierExpensesDates[i];
      }
    };
    
    return biggest;
  };
    
  //если текущая дата меньше всех в массиве
  if(earlierExpensesDates.filter(item => item > expensesDate.value)) {
    if(earlierExpensesDates.length == 0) {
      addExpenses();

      wrappersExpenses[wrappersExpenses.length - 1].after(curentWrapper);
      curentWrapper.before(expensesDateOutputAll[0]);

      addOperation("expenses");

      clearExpensesForm();
    } else {
      //Наибольшая из предыдуших дата
      let biggestDate = new Date(getBiggestExpensesDate()).toLocaleDateString('ru', options);
      let biggestDateOutput = Array.from(expensesDateOutputAll).find(item => item.textContent == biggestDate);

      addExpenses();

      biggestDateOutput.before(curentWrapper.previousElementSibling);
      biggestDateOutput.before(curentWrapper);

      addOperation("expenses");

      clearExpensesForm();
    };
  };
};

let flagOperation = null;

function getExpensesNumber() {
  expensesDates.sort().reverse();

  return expensesDates.indexOf(expensesDate.value);
};

//Добавление записи в итоги
function addOperation(operation) {
  flagOperation = operation;

  if(operation == "expenses") {
    let expensesSum = document.querySelectorAll('.expenses-spent');
    let expensesCategory = document.querySelectorAll('.expenses-title');

    //Получение порядкового номера обёртки расходов
    let index = getExpensesNumber();

    let currentExpensesSum = expensesSum[index];
    let currentExpensesCategory = expensesCategory[index];

    let newExpenses = {
      sum: currentExpensesSum.textContent.slice(1),
      category: currentExpensesCategory.textContent,
      date: expensesDate.value,
      operation: flagOperation
    };

    // totalExpenses.push(newExpenses);

    total.push(newExpenses);
    //!
    // total = [...totalExpenses, ...totalIncome];


    clearExpensesForm();
  } else if(operation == "income") {
    let incomeSum = document.querySelectorAll('.income-received');
    let incomeCategory = document.querySelectorAll('.income-title');
  
    let index = getIncomeNumber();
    
    console.log(index)
  
    let currentIncomeSum = incomeSum[index];
    let currentIncomeCategory = incomeCategory[index];
  
    let newIncome = {
      sum: currentIncomeSum.textContent.slice(1),
      category: currentIncomeCategory.textContent,
      date: incomeDate.value,
      operation: flagOperation
    };

    // total.push(newIncome);

    totalIncome.push(newIncome);

    //!
    total = [...totalExpenses, ...totalIncome];
  
    clearIncomeForm();
  
    renderTotalCategories('modal__category');
  };

  filterTotal();

  console.log(total);
};

//получение сегодняшеней даты
function renderTodayDate() {
  let todayDate = new Date().toISOString().slice(0, 10);

  return todayDate;
};

//получение даты расходов
function getExpensesDate() {
  console.log(expensesDates)
  if(!expensesDates.find(item => item == expensesDate.value)) {
    expensesDates.push(expensesDate.value);
  };

  let date = new Date(expensesDate.value);

  if(date.toISOString().slice(0, 10) == renderTodayDate()) {
    return `Сегодня`
  } else {
    return date.toLocaleDateString('ru', options); 
  };
};

//создание новой записи расходов уже существующей даты
function addExpensesSameDate() {
  let expensesSelectedIconOutput = document.querySelector('.expenses__selected-icon');
  let expensesTitleOutput = document.querySelector('.expenses-title');

  //копии иконки и названия расходов
  let iconClone = expensesSelectedIconOutput.children[0].cloneNode(true);
  let titleClone = expensesTitleOutput.textContent;

  let index = getExpensesNumber();

  //заполнение всех полей в новой записи
  wrappersExpenses[index].prepend(createOperationNote('expenses'));
  wrappersExpenses[index].querySelector('.expenses__selected-icon').append(iconClone);
  wrappersExpenses[index].querySelector('.expenses-title').append(titleClone);
  wrappersExpenses[index].querySelector('.expenses-spent').textContent = `-${expensesSum.value}`;

  //удаление обёртки созданной при нажатии на +
  deleteExpenses();
};

//получение выбранной иконки и наименования, изменение цвета при выборе
expensesIconsList.addEventListener('click', getIconWrapper);

function getIconWrapper(e) {
  let expensesSelectedIconOutput = document.querySelector('.expenses__selected-icon');
  let expensesTitleOutput = document.querySelector('.expenses-title');

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

  if(expensesSelectedIconOutput.innerHTML == 0) {
    expensesSelectedIconOutput.append(getIcon().cloneNode(true));
  } else if(expensesSelectedIconOutput.innerHTML != 0) {
    expensesSelectedIconOutput.innerHTML = '';
    expensesSelectedIconOutput.append(getIcon().cloneNode(true));
  };

  function getCategoryName() {
    let expensesIcons = document.querySelectorAll('.fold-list--expenses .categories__item');
    let expensesTitles = document.querySelectorAll('.fold-list--expenses .categories__item .category__title');

    let index = Array.from(expensesIcons).indexOf(getIcon().parentElement);

    return expensesTitles[index].textContent;
  };

  expensesTitleOutput.textContent = getCategoryName();
};

//создание новой записи расходов
function addExpenses() {
  //дата
  let expensesDateOutput = document.querySelector('.expenses-date');

  expensesDateOutput.textContent = getExpensesDate();

  //сумма расходов
  let expensesSum = document.querySelector('.expenses__sum');
  let expensesSumOutput = document.querySelector('.expenses-spent');
  
  console.log(expensesSumOutput);
  
  if(expensesSum.value) {
    expensesSumOutput.textContent = `-${expensesSum.value}`;
  };
};

backExpensesBtn.addEventListener('click', deleteExpensesWrapper);

//Удаление пустой обёртки
function deleteExpensesWrapper() {
  if(window.location.href = "#add-expenses") {
    let permission = confirm('Сохранить изменения операции?');

    if(!permission) {
      deleteExpenses();

      clearExpensesForm();
    } else {
      saveExpenses();
    };  
  } else {
    deleteExpenses();
  };
};

function deleteExpenses() {
  let operationDateOutput = document.querySelector('.expenses-date');
  let wrapper = document.querySelector('.expenses-output__wrapper');


  if(!operationDateOutput.textContent) {
    wrapper.remove();
    operationDateOutput.remove();
  };
};

function clearExpensesForm() {
  expensesSum.value = '';
  unSelectItem();
  expensesDate.value = renderTodayDate();
};

function renderChangedExpensesTotal(category, item) {
  total.forEach(obj => {
    if(obj.category == category) {
      obj.category = item;
    }
  });

  renderTotal(total);
};

function invalidAlert() {
  alert('Пожалуйста, заполните все поля перед сохранением');
};

function selectItem(item) {
  let allSelectedList = item.parentElement.parentElement;
  let allSelected = allSelectedList.querySelectorAll('.selected');

  if(allSelected.length == 0) {
    item.classList.add('selected');
  } else {
    unSelectItem(item);
    item.classList.add('selected');
  }
};

function unSelectItem() {
  Array.from(document.querySelectorAll('.selected')).forEach(item => item.classList.remove('selected'));
};

//кнопка развернуть (показать ещё)
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

//Рендер записей расходов //!мб здесь что-то после изменения в тотале
function renderExpensesNotes(category, value) {
  let expensesCategory = document.querySelectorAll('.expenses-title');

  Array.from(expensesCategory).forEach(title => title.textContent = value);
};

//Рендер списка категорий в модальном окне
function renderExpensesCategory() {
  expensesIconsList.innerHTML = '';

  categoriesExpenses.forEach(function(category) {
    expensesIconsList.appendChild(templateCategory(category));
  });
};

//Создание списка категорий в модальном окне
function templateCategory(name) {
  let wrapperCategory = document.createElement('div');
  wrapperCategory.className = 'categories__item';

  let iconWrapper = document.createElement('div');
  iconWrapper.className = 'icon__wrapper'; //!

  let icon = document.createElement('img');
  icon.className = 'categories__item-icon';
  let srcIndex = categories.indexOf(name);
  icon.src = iconSrc[srcIndex];
  iconWrapper.appendChild(icon);

  wrapperCategory.appendChild(iconWrapper);

  let categotyTitle = document.createElement('p');
  // textItem.className = 'categories__name';
  categotyTitle.className = 'category__title';
  categotyTitle.textContent = name;

  wrapperCategory.appendChild(categotyTitle);

  let controlWrapper = document.createElement('div');
  controlWrapper.className = 'control__wrapper';

  controlWrapper.innerHTML = `<img class="change-icon change-icon--edit icon--small" src="assets/icons/edit.svg" alt="">
  <img class="change-icon change-icon--delete icon--small" src="assets/icons/delete.svg" alt="">`;

  wrapperCategory.appendChild(controlWrapper);

  return wrapperCategory;
};