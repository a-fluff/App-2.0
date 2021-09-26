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
//!ошибка здеь
//маловероятно(
function getOperationNumber(target) {
  let wrapperTotal = document.querySelectorAll('.total-output__wrapper');

  return Array.from(wrapperTotal).indexOf(target.parentElement.parentElement.parentElement);
};

let opertaionNumber = null;

//Записываю в значения в модальном окне
function editTotalOperation(index) {
  opertaionNumber = index;

  let operation = total[index];

  //Обращаюсь к записи массива тотал
  editOperationSum.value = operation.sum;
  editOperationCategory.value = operation.category;
  editOperationDate.value = operation.date;

  openModal();
};

function deleteTotalOperation(index) {
  let permission = confirm('Удалить запись?');

  if(permission) {
    let deletedOperation = total.splice(index, 1); //удаленная запись

    renderTotal(total);

    console.log(total, totalExpenses, totalIncome)

    let wrappers = document.querySelectorAll('.expenses-output__wrapper');
    let expensesOperations = document.querySelectorAll('.expenses-output');

    let expensesSum = document.querySelectorAll('.expenses-spent');
    let expensesCategory = document.querySelectorAll('.expenses-title');
    let expensesDateOutput = document.querySelectorAll('.expenses-date');


    let a = Array.from(expensesSum).findIndex(item => item.textContent == -deletedOperation[0].sum);
    let b = Array.from(expensesCategory).findIndex(item => item.textContent == deletedOperation[0].category);
    // let c = Array.from(expensesDateOutput).findIndex(item => item == searchDate(deletedOperation[0].date)); 
    //!неправильно с зависит от количества операций в обертке, не всегда Б и на 1
    let c = expensesDates.findIndex(item => deletedOperation[0].date);

    console.log(wrappers.length, expensesOperations.length)

    // if(Array.from(wrapperTotal).find(item => item.children.length <= 1)) {
    //   if(a === b && b === c) {
    //     console.log('В КАЖДОМ ВРАППЕРЕ ПО ОДНОМУ')
    //     wrappers[a].remove();
    //     expensesDateOutput[a].remove();
    //   };
    // } else {
    //   if(a === b && (b - c == 1)) {
    //     console.log('ВО ВРАППЕРАХ ЕСТЬ НЕСКОЛЬКО ЗАПИСЕЙ');
    //     expensesOperations[a].remove()
    //   };
    // };


    console.log(a, b, c);
  };
};

function openModal() {
  modalTotal.classList.remove('hidden');
};

saveTotalBtn.addEventListener("click", saveTotal);

function saveTotal(){

  // console.log(total.indexOf(aaa))
  // let findOperation = {
  //   sum: editOperationSum.value,
  //   category: editOperationCategory.value,
  //   date: editOperationDate.value,
  //   operation: 'expenses'
  // };

  // let index = total.findIndex(operation => JSON.stringify(operation) === JSON.stringify(findOperation));
  
  // console.log(index);

  total[index].sum = editOperationSum.value;
  total[index].category = editOperationCategory.value;
  total[index].date = editOperationDate.value;

  filterTotal(total);
  
  closeModal();
  // console.log(findOperation === total[0])
  console.log(total)
  // console.log(findOperation, total[0])
 // console.log(total.forEach(operation => Object.values(operation) == Object.values(findOperation)))
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
      (item.operation === paramsFitlers.operation || !paramsFitlers.operation || paramsFitlers.operation === 'all') && (item.sum.includes(paramsFitlers.sum) || !paramsFitlers.sum) 
  });

  renderTotal(totalFilers)
};