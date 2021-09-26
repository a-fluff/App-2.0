let totalSumOutput = document.querySelector('.total');

let currencySelect = document.querySelector('.select-currency');
let currencyValue = document.querySelector('.currency__output');

//Выбор валюты
// currencySelect.addEventListener('change', function(e) {
//   currencyValue.textContent = currencySelect.value;
// });

//!
// function invalidAlert() {
//   alert('Пожалуйста, заполните все поля перед сохранением');
// };

// function selectItem(item) {
//   let allSelectedList = item.parentElement.parentElement;
//   let allSelected = allSelectedList.querySelectorAll('.selected');

//   if(allSelected.length == 0) {
//     item.classList.add('selected');
//   } else {
//     unSelectItem(item);
//     item.classList.add('selected');
//   }
// };

// function unSelectItem() {
//   Array.from(document.querySelectorAll('.selected')).forEach(item => item.classList.remove('selected'));
// };



// //!
// (function locateAddOperationBtn() {
//   if(screen.width > 720) {
//     let tabsWidth = +getComputedStyle(tabs).width.slice(0, -2);
//     let tabsHeight = +getComputedStyle(tabs).height.slice(0, -2);
//     let mainSection = document.querySelector('main');
  
//     addExpensesBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addExpensesBtn).right.slice(0, -2) + 'px';
//     addExpensesBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addExpensesBtn).bottom.slice(0, -2) + 'px';
//     addIncomeBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addIncomeBtn).right.slice(0, -2) + 'px';
//     addIncomeBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addIncomeBtn).bottom.slice(0, -2) + 'px';
    
//      };
// }());

// tabsNav.addEventListener('click', function(e) {
//   window.location.href = "#";

//   if(!e.target.classList.contains('tab--expenses')) {
//     addExpensesBtn.classList.add('hidden')
//   } else if(e.target.classList.contains('tab--expenses')) {
//     addExpensesBtn.classList.remove('hidden')
//   };

//   if(e.target.classList.contains('tab--income')) {
//     let tabsWidth = +getComputedStyle(tabs).width.slice(0, -2);
//     let tabsHeight = +getComputedStyle(tabs).height.slice(0, -2);
//     let mainSection = document.querySelector('main');
//     // addIncomeBtn.style.right  = (screen.width - tabsWidth)/2 + +getComputedStyle(addIncomeBtn).right.slice(0, -2) + 'px';
//     // addIncomeBtn.style.bottom  = (+getComputedStyle(mainSection).height.slice(0, -2) - tabsHeight) + +getComputedStyle(addIncomeBtn).bottom.slice(0, -2) + 'px';
//     // //!почему она невидна?
//   }
// });







//сохранение формы расходов
// saveExpensesBtn.addEventListener('click', function(e) {
//   //!должно быть еще условие по иконке + валидация суммы
//   if(expensesSum.value) {
//     // wrappersExpenses = document.querySelectorAll('.tab--expenses .expenses-output__wrapper');
//     // console.log(wrappersExpenses);

//     //добавление записи уже существующей даты
//     if(expensesDates.find(item => item == expensesDate.value)) {
//       console.log('expenses', expensesDate, expensesDates)
//       addExpensesSameDate();
  
//       clearExpensesForm();
//     } else {
//       let expensesDateOutputAll = document.querySelectorAll('.expenses-date');
//       let wrapper = document.querySelector('.expenses-output__wrapper');
  
//       if(expensesDateOutputAll.length >= 2) {
//         let options = {day: 'numeric', month: 'long', weekday: 'long'};
//         let earlierDates = expensesDates.filter(item => item < expensesDate.value);
  
//         function getBiggestDate() {
//           let biggest = earlierDates[0];
//           for(let i = 1; i < earlierDates.length; i++) {
//             if(earlierDates[i] > biggest) {
//               biggest = earlierDates[i];
//             }
//           };
          
//           return biggest;
//         };
          
//         //если текущая дата меньше всех в массиве
//         if(expensesDates.filter(item => item > expensesDate.value)) {
//           if(earlierDates.length == 0) {
//             addExpenses();
//             //!
            
//             wrappersExpenses[wrappersExpenses.length - 1].after(wrapper);
//             wrapper.before(expensesDateOutputAll[0]);
    
//             clearExpensesForm();
//           } else {
//             let biggestDate = new Date(getBiggestDate()).toLocaleDateString('ru', options);
//             let biggestDateOutput = Array.from(expensesDateOutputAll).find(item => item.textContent == biggestDate);
//             addExpenses();
//             biggestDateOutput.before(wrapper.previousElementSibling);
//             biggestDateOutput.before(wrapper);
  
//             clearExpensesForm();
//           }
  
//         } else {
//           return
//         }
  
//       } else {
//         //первая обертка
//         addExpenses();
        
//         clearExpensesForm();
//       }
//     };
//   } else {
//     invalidAlert();
//     deleteExpenses();
//   };

//   wrappersExpenses = document.querySelectorAll('.tab--expenses .expenses-output__wrapper');
//   console.log(wrappersExpenses);

//   addOperation("expenses");
//   renderTotal(total); //!запустила рендер вручную - так не нужно было, но не работает из init.js
// });

// let flagOperation = null;

// function addOperation(operation) {
//   // let expensesTitleOutput = document.querySelector('.expenses-title');
//   // let incomeTitleOutput = document.querySelector('.income-title');
//   // let expensesSumOutput = document.querySelector('.expenses-spent');
//   // let incomeSumOutput = document.querySelector('.income-received');
  

//   flagOperation = operation;

//   if(operation == "expenses") {
//     let expensesDateOutputAll = document.querySelectorAll('.expenses-date');
//     let wrapper = document.querySelector('.expenses-output__wrapper');
    
//     let expensesSum;
//     let expensesCategory;

//     console.log(expensesDateOutputAll)
//     if(expensesDateOutputAll.length >= 2) {
      
//       expensesSum
//       expensesCategory
//     } else {
//       expensesCategory = document.querySelector('.expenses-title');
//       expensesSum = document.querySelector('.expenses-spent');
//     };
    
//     let newExpenses = {
//       sum: expensesSum.textContent.slice(1), //!
//       category: expensesCategory.textContent, //!
//       date: expensesDate.value,
//       operation: flagOperation
//     };

//     total.push(newExpenses);
//     clearExpensesForm();
//   } else if(operation == "income") {
//     let incomeSum = document.querySelector('.income-received');
//     let incomeCategoty = document.querySelector('.income-title');
//     let incomeDateOutputAll = document.querySelectorAll('.income-date');

//     //let index = incomeDates.indexOf(incomeDate.value);



//     //let incomeTitleOutput = document.querySelectorAll('.income-title');

//     let newIncome = {
//       sum: incomeSum.textContent.slice(1),
//       category: incomeCategoty.textContent,
//       date: incomeDate.value,
//       operation: flagOperation
//     };
    
//     total.push(newIncome);

//     renderTotalCategories('modal__category');
//     console.log(total)
//   }


// //   let operationSum = `${operation}Sum`;
// //   let operationCategory = expensesTitleOutput.textContent;
// //   let operationDate = `${operation}Date.value`;
// //   console.log(operationSum)

// // //заполнять ПОСЛЕ сохранения






//   // filterTotal();

//   console.log(total);
// };

//создание новой записи расходов уже существующей даты
// function addExpensesSameDate() {
//   let expensesSelectedIconOutput = document.querySelector('.expenses__selected-icon');
//   let expensesTitleOutput = document.querySelector('.expenses-title');
//   let index = expensesDates.indexOf(expensesDate.value);

//   console.log(expensesSelectedIconOutput, expensesTitleOutput)

//   //копии иконки и названия расходов
//   let iconClone = expensesSelectedIconOutput.children[0].cloneNode(true);
//   let titleClone = expensesTitleOutput.cloneNode(true);

//   console.log(iconClone, titleClone)
  
//   //удаление обёртки созданной при нажатии на +
//   deleteExpenses();

//   //заполнение всех полей в новой записи
//   console.log(wrappersExpenses, expensesDates, index)
//   wrappersExpenses[index].prepend(createOperationNote('expenses'));
//   wrappersExpenses[index].querySelector('.expenses__selected-icon').append(iconClone);
//   wrappersExpenses[index].querySelector('.expenses-title').append(titleClone);
//   wrappersExpenses[index].querySelector('.expenses-spent').textContent = `-${expensesSum.value}`;
// };

// function clearExpensesForm() {
//   expensesSum.value = '';
//   unSelectItem();
// };

//получение выбранной иконки и наименования, изменение цвета при выборе
// expensesIconsList.addEventListener('click', getIconWrapper);

// function getIconWrapper(e) {
//   let expensesSelectedIconOutput = document.querySelector('.expenses__selected-icon');
//   let expensesTitleOutput = document.querySelector('.expenses-title');

//   let selectedIcon = e.target;

//   function getIcon() {
//     if(selectedIcon.classList.contains('categories__item-icon')) {
//       selectedIcon = selectedIcon.parentElement;
//       selectItem(selectedIcon);

//       return selectedIcon;
//     } else if(selectedIcon.classList.contains('icon__wrapper')) {
//       selectItem(selectedIcon);

//       return selectedIcon;
//     };
//   };

//   if(expensesSelectedIconOutput.innerHTML == 0) {
//     expensesSelectedIconOutput.append(getIcon().cloneNode(true));
//   } else if(expensesSelectedIconOutput.innerHTML != 0) {
//     //expensesSelectedIconOutput.innerHTML = '';
//     expensesSelectedIconOutput.append(getIcon().cloneNode(true));
//   };

//   //!только для expenses
//   function getCategoryName() {
//     let expensesIcons = document.querySelectorAll('.fold-list--expenses .categories__item');
//     let expensesTitles = document.querySelectorAll('.fold-list--expenses .categories__item .category__title');

//     let index = Array.from(expensesIcons).indexOf(getIcon().parentElement);
//     return expensesTitles[index].textContent;
//   };

//   expensesTitleOutput.textContent = getCategoryName();
// };

//создание обёртки операции
// function createOperatioWrapper(operation) {
//   let activeTab = document.querySelector('.tabs__panels .js-active');
//   let expensesTab = document.querySelector('.tabs__panels .tab--expenses');
//   let incomeTab = document.querySelector('.tabs__panels .tab--income');

//   let operationDateOutput = document.createElement('p');
//   let wrapper = document.createElement('div');
//   let operationNote = createOperationNote(operation);

//   operationDateOutput.className = `${operation}-date`;
//   wrapper.className = `${operation}-output__wrapper`;


//   wrapper.appendChild(operationNote);
//   console.log(activeTab)
//   if(activeTab.classList.contains('tab--expenses')) {
//     expensesTab.prepend(wrapper);
//     expensesTab.prepend(operationDateOutput); 

//     console.log(expensesTab, wrapper, operationDateOutput)
//   } else if(activeTab.classList.contains('tab--income')) {
//     incomeTab.prepend(wrapper);
//     incomeTab.prepend(operationDateOutput); 
//   }
// };

// //создание новой записи в DOM
// function createOperationNote(operation) {
//   let operationNote = document.createElement('div');
//   let operationSelectedIconOutput = document.createElement('div');
//   let operationTitleOutput = document.createElement('p');
//   let operationSumOutput = document.createElement('p');

//   operationNote.className = `${operation}-output`;
//   operationSelectedIconOutput.className = `${operation}__selected-icon`;
//   operationTitleOutput.className = `${operation}-title`;
//   if(operation == 'expenses') {
//     operationSumOutput.classList = `${operation}-spent`;
//   } else if(operation == 'income') {
//     operationSumOutput.classList = `${operation}-received`;
//   };

//   operationNote.appendChild(operationSelectedIconOutput);
//   operationNote.appendChild(operationTitleOutput);
//   operationNote.appendChild(operationSumOutput);

//   return operationNote;
// };

// //получение сегодняшеней даты
// function renderTodayDate() {
//   let todayDate = new Date().toISOString().slice(0, 10);

//   return todayDate;
// };

// //подстановка сегодняшней даты в поле ввода даты
// expensesDate.value = renderTodayDate();

// //получение даты расходов //!мб можно сделать для всех операций
// function getExpensesDate() {
//   console.log(expensesDates)
//   if(!expensesDates.find(item => item == expensesDate.value)) {
//     expensesDates.push(expensesDate.value);
//   };

//   let date = new Date(expensesDate.value);

//   if(date.toISOString().slice(0, 10) == renderTodayDate()) {
//     return `Сегодня`
//   } else {
//     let options = {day: 'numeric', month: 'long', weekday: 'long'};
//     return date.toLocaleDateString('ru', options); 
//   };
// };

// //создание новой записи расходов
// function addExpenses() {
//   //дата
//   let expensesDateOutput = document.querySelector('.expenses-date');

//   expensesDateOutput.textContent = getExpensesDate();

//   //сумма расходов
//   let expensesSum = document.querySelector('.expenses__sum');
//   let expensesSumOutput = document.querySelector('.expenses-spent');
  
//   let currencySelect = document.querySelector('.select-currency');

//   console.log(expensesSumOutput);
  
//   if(expensesSum.value) {
//     expensesSumOutput.textContent = `-${expensesSum.value}`;
//   };
  
//   //! если валюта белка,
//   //totalSumOutput.textContent = expensesSumOutput.textContent;
// };





// (function createUnfoldBtn() {
//   let allDivsInFoldableList = document.querySelectorAll('.fold-list > div:not(.add-item)');

//   let button = document.createElement('button');
//   let buttonWrapper = document.createElement('div');


//   button.classList = 'btn btn--unfold';
//   button.textContent = '...'
//   buttonWrapper.classList = 'btn__wrapper';
//   buttonWrapper.append(button);
//   //!allDivsInFoldableList[3].before(buttonWrapper);



//   //for(let i = 1; i < 8; i + 2) {}
//   //fold-list <300 то [3] 200/100*2-1
//   //fold-list >300 && <400 то [5] 300/100*2-1
//   //fold-list >400 && <500 то [7] 400/100*2-1
//   //fold-list >=400 то последний = [3]
//   function locateShowMoreBtn() {

//   };



//   //!!!

//   window.onresize = function() {
//     if(screen.width < 511) {
//       allDivsInFoldableList[Math.floor((foldableList[0].clientWidth - 1)/document.querySelector('.categories__item').clientWidth)*2 - 1].before(buttonWrapper);
//     } else {
//       allDivsInFoldableList[Math.floor((foldableList[0].clientWidth)/document.querySelector('.categories__item').clientWidth) - 1].before(buttonWrapper);
//     };
//   };

// }());


// //кнопка развернуть (показать ещё)
// showMoreBtn.forEach((item, index) => item.addEventListener('click', function() {
//   foldableList[index].classList.add('unfold-list');
//   item.parentElement.classList.add('hidden');
//   foldBtn[index].classList.remove('hidden');
// }));

// //кнопка свернуть
// foldBtn.forEach((item, index) => item.addEventListener('click', function() {
//   foldableList[index].classList.remove('unfold-list');
//   showMoreBtn[index].parentElement.classList.remove('hidden');
//   item.classList.add('hidden');
// }));

//кнопка добавить расход //!мб можно сделать для всех операций
// addExpensesBtn.addEventListener('click', function() {
//   createOperatioWrapper('expenses')
  //перед созданием нового враппера обращаюсь к массиву дат
  // читаю его дату

  //document.querySelector('.modal-window').classList.remove('hidden');

  // addExpensesBtn.classList.add('hidden');
  // wrappersExpenses.classList.add('hidden');
// });


//кнопка назад
// backExpensesBtn.addEventListener('click', deleteExpenses);

// function deleteExpenses() {  
//   let wrapper = document.querySelector('.expenses-output__wrapper');
//   let operationDateOutput = document.querySelector('.expenses-date');

//   wrapper.remove();
//   operationDateOutput.remove();

//   clearExpensesForm();
//   console.log(wrapper, operationDateOutput)
// };