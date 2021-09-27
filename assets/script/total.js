let budget = document.querySelector('.budget');

let wrapperTotal = document.querySelectorAll('.total-output__wrapper');
let totalOperationsList = document.querySelector('.total__list');

let backTotalBtn = document.querySelector('.tab--total .btn--back');
let saveTotalBtn = document.querySelector('.tab--total .btn--save');
let operationControl = document.querySelector('.tab--total .control__wrapper');

let modalTotal = document.querySelector('.modal-window--total');
let editOperationSum = document.querySelector('.modal__sum');
let editOperationCategory = document.querySelector('.modal__category');
let editOperationDate = document.querySelector('.modal__date');

let filterDate = document.querySelector(".filter-date");
let filterCategory = document.querySelector(".filter-category");
let filterOperation = document.querySelector(".filter-operation");
let filterSum = document.querySelector(".filter-sum");

let paramsFitlers = {
  date: '',
  category: '',
  operation: '',
  sum: ''
};


//Сортировка по дате
function sortOperations(arr) {
  arr.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};

totalOperationsList.addEventListener('click', changeTotalOperation);

function changeTotalOperation(e) {
  let target = e.target;

  if((target.classList.contains('change-icon--edit'))) {
    editTotalOperation(getOperationNumber(target));
  } else if((target.classList.contains('change-icon--delete'))) {
    deleteTotalOperation(getOperationNumber(target));
  };
};


//получение номера редактриуемой операции
function getOperationNumber(target) {
  let wrapperTotal = document.querySelectorAll('.total-output__wrapper');

  return Array.from(wrapperTotal).indexOf(target.parentElement.parentElement.parentElement);
};

let opertaionNumber = null;

//Запись в значения в модальном окне
function editTotalOperation(index) {
  opertaionNumber = index;

  let operation = total[index];

  //Обращение к записи массива тотал
  editOperationSum.value = operation.sum;
  editOperationCategory.value = operation.category;
  editOperationDate.value = operation.date;

  openModal();
};

function searchDate(a) {
  let date = new Date(a);

  if(date.toISOString().slice(0, 10) == renderTodayDate()) {
    return 'Сегодня'
  } else {
    return date.toLocaleDateString('ru', options); 
  };
};

function deleteTotalOperation(index) {
  let permission = confirm('Удалить запись?');

  if(permission) {
    //удаленная запись
    let deletedOperation = total.splice(index, 1);

    renderTotal(total);

    if(deletedOperation[0].operation == 'expenses') {
      deleteExpensesOperation(deletedOperation);
    } else {
      deleteIncomeOperation(deletedOperation);
    };
  };
};

function deleteExpensesOperation(deletedOperation) {
  let expensesOperations = document.querySelectorAll('.expenses-output');

  let expensesSum = document.querySelectorAll('.expenses-spent');
  let expensesCategory = document.querySelectorAll('.expenses-title');

  //Поиск удалённой записи
  let a = Array.from(expensesSum).findIndex(item => item.textContent == -deletedOperation[0].sum);
  let b = Array.from(expensesCategory).findIndex(item => item.textContent == deletedOperation[0].category);
  let deletedExpensesOperationDate = expensesOperations[a].parentElement.previousElementSibling;
  let c = deletedExpensesOperationDate.textContent;

  if(a == b) {
    if(c == searchDate(deletedOperation[0].date)) {
      if(expensesOperations[a].previousElementSibling || expensesOperations[a].nextElementSibling) {
        expensesOperations[a].remove();
      } else {
        deletedExpensesOperationDate.remove();
        expensesOperations[a].parentElement.remove();
      };
    };
  };
};

function deleteIncomeOperation(deletedOperation) {
  let incomeOperations = document.querySelectorAll('.income-output');
  let incomeSum = document.querySelectorAll('.income-received');
  let incomeCategory = document.querySelectorAll('.income-title');
  console.log(incomeSum)
  //Поиск удалённой записи
  let a = Array.from(incomeSum).findIndex(item => item.textContent == +deletedOperation[0].sum);
  let b = Array.from(incomeCategory).findIndex(item => item.textContent == deletedOperation[0].category);
  console.log(incomeOperations[a])
  let deletedIncomeOperationDate = incomeOperations[a].parentElement.previousElementSibling;
  let c = deletedIncomeOperationDate.textContent;

  if(a == b) {
    if(c == searchDate(deletedOperation[0].date)) {
      if(incomeOperations[a].previousElementSibling || incomeOperations[a].nextElementSibling) {
        incomeOperations[a].remove();
      } else {
        deletedIncomeOperationDate.remove();
        incomeOperations[a].parentElement.remove();
      };
    };
  };
};

function openModal() {
  modalTotal.classList.remove('hidden');
};

saveTotalBtn.addEventListener("click", saveTotal);

function saveTotal(){
  //Поиск изменённой записи
  let searchEditedTitle = null;
  let searchEditedSum = null;
  let searchEditedDate = null;

  //Параметры искомое записи
  searchEditedTitle = total[opertaionNumber].category;
  searchEditedSum = getSumFromTotal();
  searchEditedDate = total[opertaionNumber].date;
  searchOperation = total[opertaionNumber].operation;

  total[opertaionNumber].sum = editOperationSum.value;
  total[opertaionNumber].category = editOperationCategory.value;
  total[opertaionNumber].date = editOperationDate.value; //новое значение

  function getSumFromTotal() {
    if(total[opertaionNumber].sum.toString().includes('-') || total[opertaionNumber].sum.toString().includes('+')) {
      return total[opertaionNumber].sum.toString().slice(1)
    } else {
      return total[opertaionNumber].sum;
    };
  };

  if(searchOperation == 'expenses') {
    editedExpensesOperation(searchEditedTitle, searchEditedSum, searchEditedDate);
  } else {
    editeIncomeOperation(searchEditedTitle, searchEditedSum, searchEditedDate);
  };

  clearSearch();

  sortOperations(total);

  filterTotal(total);
  
  closeModal();
};

function clearSearch() {
  searchEditedTitle = null;
  searchEditedSum = null;
  searchEditedDate = null;
};

function editedExpensesOperation(searchEditedTitle, searchEditedSum, searchEditedDate) {
  let expensesOperations = document.querySelectorAll('.expenses-output');
  let expensesSum = document.querySelectorAll('.expenses-spent');
  let expensesCategory = document.querySelectorAll('.expenses-title');

  let indexExp = expensesDates.indexOf(editOperationDate.value);

  expensesDates.splice(indexExp, 1);
  expensesDates.push(editOperationDate.value);
  expensesDates.sort().reverse();

  console.log(expensesDates)
  //!запустить сортировку

  let a  = Array.from(expensesSum).findIndex(item => item.textContent == -searchEditedSum);
  let b = Array.from(expensesCategory).findIndex(item => item.textContent == searchEditedTitle);
  let editedExpensesOperationDate = expensesOperations[a].parentElement.previousElementSibling;
  let c = editedExpensesOperationDate.textContent;

  if(a == b) {
    console.log(searchEditedDate)

    if(c == searchDate(searchEditedDate)) {
      if(expensesOperations[a].previousElementSibling || expensesOperations[a].nextElementSibling) {
        let i = categories.indexOf(total[opertaionNumber].category);
        expensesOperations[a].querySelector('.expenses-spent').textContent = -total[opertaionNumber].sum;
        expensesOperations[a].querySelector('.expenses-title').textContent = total[opertaionNumber].category;
        expensesOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        expensesOperations[a].querySelector('img').src = iconSrc[i];
        
        // // createOperatioWrapper('expenses');
        // let expensesDateOutputAll = document.querySelectorAll('.expenses-date');

        // if(expensesDateOutputAll.length >= 2) {
        //   let curentWrapper = document.querySelector('.expenses-output__wrapper');

        //   let earlierExpensesDates = expensesDates.filter(item => item < expensesDate.value);
        
        //   function getBiggestExpensesDate() {
        //     let biggest = earlierExpensesDates[0];
            
        //     for(let i = 1; i < earlierExpensesDates.length; i++) {
        //       if(earlierExpensesDates[i] > biggest) {
        //         biggest = earlierExpensesDates[i];
        //       }
        //     };
            
        //     return biggest;
        //   };

        //     //если текущая дата меньше всех в массиве
        //     if(earlierExpensesDates.filter(item => item > expensesDate.value)) {
        //       if(earlierExpensesDates.length == 0) {
        //         addExpenses();

        //         wrappersExpenses[wrappersExpenses.length - 1].after(curentWrapper);
        //         curentWrapper.before(expensesDateOutputAll[0]);

        //         let i = categories.indexOf(total[opertaionNumber].category);
        //         expensesOperations[a].querySelector('.expenses-spent').textContent = -total[opertaionNumber].sum;
        //         expensesOperations[a].querySelector('.expenses-title').textContent = total[opertaionNumber].category;
        //         expensesOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        //         expensesOperations[a].querySelector('img').src = iconSrc[i];
        //       } else {
        //         //Наибольшая из предыдуших дата
        //         let biggestDate = new Date(getBiggestExpensesDate()).toLocaleDateString('ru', options);
        //         let biggestDateOutput = Array.from(expensesDateOutputAll).find(item => item.textContent == biggestDate);

        //         expensesOperations[a].querySelector('.expenses-spent').textContent = -total[opertaionNumber].sum;
        //         expensesOperations[a].querySelector('.expenses-title').textContent = total[opertaionNumber].category;
        //         expensesOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        //         expensesOperations[a].querySelector('img').src = iconSrc[i];

        //         biggestDateOutput.before(curentWrapper.previousElementSibling);
        //         biggestDateOutput.before(curentWrapper);
        //       };
        //     };
          
        //   sortOperations(total);
        // } else {
        //   //Создание первой записи
        //   let i = categories.indexOf(total[opertaionNumber].category);

        //   let activeTab = document.querySelector('.tabs__panels .js-active');
        //   let expensesTab = document.querySelector('.tabs__panels .tab--expenses');
        //   let incomeTab = document.querySelector('.tabs__panels .tab--income');

        //   let wrapper = document.createElement('div');
        //   wrapper.className = `expenses-output__wrapper`;

        //   let operationNote = document.createElement('div');
        //   let operationSelectedIconOutput = document.createElement('div');
        //   let operationTitleOutput = document.createElement('p');
        //   let operationSumOutput = document.createElement('p');
        
        //   operationNote.className = `expenses-output`;

        //   let wrapperCategory = document.createElement('div');
        //   wrapperCategory.className = 'categories__item';
        
        //   let iconWrapper = document.createElement('div');
        //   iconWrapper.className = 'icon__wrapper';

        //   let icon = document.createElement('img');
        //   icon.className = 'categories__item-icon';
        //   icon.src = iconSrc[i];
        //   iconWrapper.appendChild(icon);
        
        //   wrapperCategory.appendChild(iconWrapper);
          
        //   operationTitleOutput.className = `expenses-title`;
        //   operationTitleOutput.classList = total[opertaionNumber].category;
        //   operationSumOutput.classList = `expenses-spent`;
        //   operationSumOutput.textContent = -total[opertaionNumber].sum;
        
        //   operationNote.appendChild(wrapperCategory);
        //   operationNote.appendChild(operationSelectedIconOutput);
        //   operationNote.appendChild(operationTitleOutput);
        //   operationNote.appendChild(operationSumOutput);



        //   wrapper.appendChild(operationNote);

        //   if(activeTab.classList.contains('tab--expenses')) {
        //     expensesTab.prepend(wrapper);
        //     expensesTab.prepend(operationDateOutput); 
        
        //     console.log(expensesTab, wrapper, operationDateOutput)
        //   } else if(activeTab.classList.contains('tab--income')) {
        //     incomeTab.prepend(wrapper);
        //     incomeTab.prepend(operationDateOutput); 
        //   }
        // }
      } else {
        //!сортировать по датам
        let i = categories.indexOf(total[opertaionNumber].category);
        expensesOperations[a].querySelector('.expenses-spent').textContent = -total[opertaionNumber].sum;
        expensesOperations[a].querySelector('.expenses-title').textContent = total[opertaionNumber].category;
        expensesOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        expensesOperations[a].querySelector('img').src = iconSrc[i];
      };
    };
  };
};

function editeIncomeOperation(searchEditedTitle, searchEditedSum, searchEditedDate) {
  let incomeOperations = document.querySelectorAll('.income-output');
  let incomeSum = document.querySelectorAll('.income-received');
  let incomeCategory = document.querySelectorAll('.income-title');

  let indexInc = incomeDates.indexOf(editOperationDate.value);

  incomeDates.splice(indexInc, 1);
  incomeDates.push(editOperationDate.value);
  incomeDates.sort().reverse();

  console.log(incomeDates)
  //!запустить сортировку
  console.log(total, searchEditedTitle)

  let a  = Array.from(incomeSum).findIndex(item => item.textContent == +searchEditedSum);
  let b = Array.from(incomeCategory).findIndex(item => item.textContent == searchEditedTitle);
  let editedIncomeOperationDate = incomeOperations[a].parentElement.previousElementSibling;
  let c = editedIncomeOperationDate.textContent;

  if(a == b) {
    console.log(searchEditedDate)

    if(c == searchDate(searchEditedDate)) {
      if(incomeOperations[a].previousElementSibling || incomeOperations[a].nextElementSibling) {
        //!сортировка
        let i = categories.indexOf(total[opertaionNumber].category);

        incomeOperations[a].querySelector('.income-received').textContent = +total[opertaionNumber].sum;
        incomeOperations[a].querySelector('.income-title').textContent = total[opertaionNumber].category;
        incomeOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        incomeOperations[a].querySelector('img').src = iconSrc[i];
      } else {
        let i = categories.indexOf(total[opertaionNumber].category);
        incomeOperations[a].querySelector('.income-received').textContent = +total[opertaionNumber].sum;
        incomeOperations[a].querySelector('.income-title').textContent = total[opertaionNumber].category;
        incomeOperations[a].parentElement.previousElementSibling.textContent = searchDate(total[opertaionNumber].date);
        incomeOperations[a].querySelector('img').src = iconSrc[i];
      };
    };
  };
};

backTotalBtn.addEventListener("click", closeModal);

function closeModal() {
  modalTotal.classList.add("hidden");

  clearFormModal();

  opertaionNumber = null;

  renderTotal(total)
};

function clearFormModal() {
  editOperationSum.value = "";
  editOperationCategory.value = "";
  editOperationDate.value = renderTodayDate();
};

function renderTotal(arr) {
  totalOperationsList.innerHTML = '';


  arr.forEach(function(operation) {
    totalOperationsList.appendChild(createTotalOperationWrapper(operation));
  });

  getBudget(arr);
};

//Итоговая сумма бюджета
function getBudget(arr) {
  if(arr == total) {   
    budget.textContent = (getTotalIncome() - getTotalExpenses()).toFixed(2);
  };
};

function getTotalExpenses() {
  let totalExpenses = 0;

  total.forEach((item) => {
    if(item.operation == "expenses") {
      totalExpenses += +item.sum;
    }});

  return totalExpenses;
};

function getTotalIncome() {
  let totalIncome = 0;

  total.forEach((item) => {
    if(item.operation == "income") {
      totalIncome += +item.sum;
    }});

  return totalIncome;
};

function createTotalOperationWrapper(operation) {
  let totalWrapper = document.createElement('div');
  totalWrapper.className = 'total-output__wrapper';

  let operationDate = document.createElement('p');
  operationDate.className = 'operation-date';
  operationDate.textContent = `${operation.date}`;

  totalWrapper.appendChild(operationDate);

  let operationWrapper = document.createElement('div');
  operationWrapper.className = 'operation-output__wrapper';

  let operationTitle = document.createElement('p');
  operationTitle.className = 'operation-title';
  operationTitle.textContent = `${operation.category}`;

  operationWrapper.appendChild(operationTitle);  

  let operationSum = document.createElement('p');
  operationSum.className = 'operation-sum';
  operationSum.textContent = `${operation.sum}`;

  operationWrapper.appendChild(operationSum);

  operationWrapper.appendChild(createControlWrapper());

  totalWrapper.appendChild(operationWrapper);

  return totalWrapper;
};

//Фильтры
filterDate.addEventListener('input', function(e) {
  paramsFitlers.date = this.value;
  filterTotal();
});

filterCategory.addEventListener('input', function() {
  paramsFitlers.category = this.value;
  filterTotal();
});

filterOperation.addEventListener('input', function() {
  paramsFitlers.operation = this.value;
  filterTotal();
});

filterSum.addEventListener('input', function() {
  paramsFitlers.sum = this.value;
  filterTotal();
});

function filterTotal(){

  let totalFilers = total.filter((item) => {
      return (item.date.includes(paramsFitlers.date) || !paramsFitlers.date) && (item.category === paramsFitlers.category || !paramsFitlers.category || paramsFitlers.category === 'all') &&
      (item.operation === paramsFitlers.operation || !paramsFitlers.operation || paramsFitlers.operation === 'all') && (item.sum.toString().slice(1).includes(paramsFitlers.sum) || !paramsFitlers.sum) 
  });

  renderTotal(totalFilers)
};