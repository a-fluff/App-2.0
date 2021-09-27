let newCategory = document.querySelector('.js-category'); //инпут куда пишем новую категорию
let newListCategory = document.querySelector('.new__list'); //в него выводятся существующие вставляются новые
let categoryOperation = document.querySelector('.buttons__wrapper');
let categoriesModalIconsList = document.querySelector('.fold-list--categories');
let categoriesModalIcons = categoriesModalIconsList.querySelectorAll('.categories__item-icon');

let btnNewCategory = document.querySelector('#add-category .btn--save'); //кнопка добавить
let backOperationBtn = document.querySelector('#add-category .btn--back');
// let addCategoryExpenses = document.querySelector('.btn--expenses-category');
// let addCategoryIncome = document.querySelector('.btn--expenses-income');

let categoriesExpensesCopy;
let categoriesIncomeCopy;

let statusEditCategory = false;

let selected;

let operationType;

let clickNumber = 0;

let iconChosen = false;


btnNewCategory.addEventListener('click', addCategory);

newListCategory.addEventListener('click', changeCategory);

backOperationBtn.addEventListener('click', clearCategoryForm);

categoryOperation.addEventListener('click', selectCategoryOperation);

categoriesModalIconsList.addEventListener('click', getCategoryModalIcon);

//Сохранение формы добавления категории
function addCategory() {
  let value = newCategory.value;
  
  //Валидация новой категории
  if(validateCategory(value)) {
    invalidAlert();
    clearCategoryForm();
  } else {    
    //Добавление категории в глобальную переменную
    if(operationType == "expenses") {
      categoriesExpenses.unshift(value);
    } else if(operationType == "income") {
      categoriesIncome.unshift(value);
    };

    categories.unshift(value);

    //Перерендер всех категорий
    renderCategory();

    //Очистка поля ввода
    clearCategoryForm();
  };
};


function selectCategoryOperation(e) {
  let target = e.target;
  selectItem(target);

  function getOperationType() {
    if(target.textContent == "Расходы") {
      return "expenses"
    } else if(target.textContent == "Доходы") {
      return "income"
    };
  };

  operationType = getOperationType();
};

function getCategoryModalIcon(e) {
  clickNumber++;
  let selectedIcon = e.target;

  iconChosen = true;

  function getIcon() {
    if(selectedIcon.classList.contains('icon__wrapper')) {
      selectItem(selectedIcon);
      selectedIcon = selectedIcon.children[0];
      
      return selectedIcon;
    } else if(selectedIcon.classList.contains('categories__item-icon')) {
      selectItem(selectedIcon.parentElement);

      return selectedIcon;
    };
  };

  let index = Array.from(categoriesModalIcons).indexOf(getIcon());

  if(clickNumber == 1) {
    iconSrc.unshift(iconSrcModal[index]);
  } else {
    iconSrc.shift();
    iconSrc.unshift(iconSrcModal[index]);
  };
};

function removeListener() {
  categoriesModalIconsList.removeEventListener('click', getCategoryModalIcon);
};

function clearCategoryForm() {
  newCategory.value = '';
  unSelectItem();
  clickNumber = 0;
  iconChosen = false;
};

function validateCategory(category) {
  let hasError = false;
  
  if(category === '' || categories.includes(category) || !operationType || !iconChosen) {
    hasError = true;
  };

  return hasError;
};

//Рендер списка категорий
function renderCategory() {
  // renderExpensesNotes();
  // renderIncomeNotes();
  
  newListCategory.innerHTML = '';
  expensesIconsList.innerHTML = '';
  incomeIconsList.innerHTML = '';

  categories.forEach(function(category) {
    newListCategory.appendChild(templateCategory(category));
  });

  categoriesExpenses.forEach(function(category) {  
    expensesIconsList.appendChild(templateCategory(category));
  });

  categoriesIncome.forEach(function(category) {
    incomeIconsList.appendChild(templateCategory(category));
  });

  renderTotalCategories('modal__category');
  renderTotalCategories('filter-category');
};

function renderTotalCategories(className) {
  let selectCategories = document.querySelector(`.${className}`);

  selectCategories.innerHTML = '<option value="all">Категория</option>';

  categories.forEach(function(category) {
    let option = document.createElement('option');

    option.value = category;
    option.textContent = category;

    selectCategories.appendChild(option);
  })
};

function createControlWrapper() {
  let controlWrapper = document.createElement('div');
  controlWrapper.className = 'control__wrapper';

  controlWrapper.innerHTML = `<img class="change-icon change-icon--edit icon--small" src="assets/icons/edit.svg" alt="">
  <img class="change-icon change-icon--delete icon--small" src="assets/icons/delete.svg" alt="">`;

  return controlWrapper
};

//Создание списка категорий
function templateCategory(name) {
  let wrapperCategory = document.createElement('div');
  wrapperCategory.className = 'categories__item';

  let iconWrapper = document.createElement('div');
  iconWrapper.className = 'icon__wrapper';

  let icon = document.createElement('img');
  icon.className = 'categories__item-icon';
  let srcIndex = categories.indexOf(name);
  icon.src = iconSrc[srcIndex];
  iconWrapper.appendChild(icon);

  wrapperCategory.appendChild(iconWrapper);

  let categotyTitle = document.createElement('p');
  categotyTitle.className = 'category__title';
  categotyTitle.textContent = name;

  wrapperCategory.appendChild(categotyTitle);

  wrapperCategory.appendChild(createControlWrapper());

  return wrapperCategory;
};

function changeCategory(e) {
  let target = e.target;
  
  //Копия текущего массива категорий
  categoriesExpensesCopy = categoriesExpenses.slice();
  categoriesIncomeCopy = categoriesIncome.slice();

  if((target.classList.contains('change-icon--edit')) && !statusEditCategory) {
    renameCategory(target.parentElement.parentElement);
    
    statusEditCategory = true;
  };

  if((target.classList.contains('change-icon--delete')) && !statusEditCategory) {
    deleteCategory(target.parentElement.parentElement);
  };
};

//Изменение названия категории
function renameCategory(parentElement) {
  let categoryTitle = parentElement.querySelector('.category__title');
  let category = categoryTitle.textContent;

  let wrapperItem = document.createElement('div');
  wrapperItem.className = 'categories__item';

  let inputItem = document.createElement('input');
  inputItem.className = 'js-category category__title';
  inputItem.value = category;

  wrapperItem.appendChild(inputItem);

  let saveItem = document.createElement('button');
  saveItem.className = 'btn btn--save-category';
  saveItem.textContent = 'Save';

  wrapperItem.appendChild(saveItem);

  newListCategory.replaceChild(wrapperItem, parentElement);

  saveItem.addEventListener('click', function() {
    categories.forEach(function(item, index) {
      if(item === category) {
        categories[index] = inputItem.value;

        console.log(index, category)
      };
    });

    categoriesExpenses.forEach(function(item, index) {
      if(item === category) {
        categoriesExpenses[index] = inputItem.value;

        renderExpensesNotes(category, inputItem.value);
        renderChangedExpensesTotal(category, inputItem.value);

        console.log(index, category)
      };
    });

    categoriesIncome.forEach(function(item, index) {
      if(item === category) {
        categoriesIncome[index] = inputItem.value;

        renderIncomeNotes(category, inputItem.value);
        renderChangedIncomeTotal(category, inputItem.value);

        console.log(index, category)
      };
    });

    console.log(categoriesExpenses, categories, inputItem.value)

    statusEditCategory = false;

    //Рендер в списки категорий в модальных окнах и фильтрации
    renderCategory();
  });
};

function deleteCategory(parentElement) {
  let categoryTitle = parentElement.querySelector('.category__title');
  let category = categoryTitle.textContent;

  let permission = confirm(`Удалить категорию ${category}?`);
  console.log(parentElement)

  if(permission) {
    let index = categories.indexOf(category);

    categories.splice(index, 1);

    if(categoriesExpenses.includes(category)) {
      categoriesExpenses.splice(index, 1);
    } else if(categoriesIncome.includes(category)) {
      categoriesIncome.splice(index, 1);
    };

    iconSrc.splice(index, 1);
    console.log(iconSrc)

    setNoNameCategory(category);

    renderCategory();

    deleteExpensesCategoryIcon();
    deleteIncomeCategoryIcon();
  };
};

function setNoNameCategory(category) {
  if(categoriesExpensesCopy.includes(category)) {
    let categoriesExpensesNew = document.querySelectorAll('.expenses-title');

    let noNameExpenses = Array.from(categoriesExpensesNew).filter(title => title.textContent == category);
    console.log(categoriesExpensesNew, noNameExpenses)
    Array.from(noNameExpenses).forEach(item => {
      item.classList.add('unknown');
      item.textContent = 'Неизвестные расходы';

      renderChangedExpensesTotal(category, item.textContent);
    });
    
    Array.from(noNameExpenses).forEach(item => item.previousElementSibling.remove());
  } else if(categoriesIncomeCopy.includes(category)) {
    let incomeCategoryNew = document.querySelectorAll('.income-title');

    let noNameIncome = Array.from(incomeCategoryNew).filter(title => title.textContent == category);
  
    Array.from(noNameIncome).forEach(item => {
      item.classList.add('unknown');
      item.textContent = 'Неизвестные доходы';

      renderChangedIncomeTotal(category, item.textContent);
    });

    Array.from(noNameIncome).forEach(item => item.previousElementSibling.remove());
  };
};

function deleteExpensesCategoryIcon() {
  let expensesIcon = Array.from(expensesIconsList.querySelectorAll('img')); //все картинки
  let undefinedIcon = expensesIcon.filter(item => item.getAttribute("src") == "undefined");

  undefinedIcon.forEach(item => item.parentElement.parentElement.classList.add('hidden'));
};

function deleteIncomeCategoryIcon() {
  let incomesIcon = Array.from(incomeIconsList.querySelectorAll('img')); //все картинки
  let undefinedIcon = incomesIcon.filter(item => item.getAttribute("src") == "undefined");

  undefinedIcon.forEach(item => item.parentElement.parentElement.classList.add('hidden'));
};


//!это в общий док, а не категории?
let addCategoryBtn = document.querySelectorAll('.btn--add-category'); //их 3
let tabNavCategories = document.querySelectorAll('.tab--categories')[0];
let navTabs = document.querySelectorAll('.tabs__nav-item');

addCategoryBtn.forEach((item) =>
item.addEventListener('click', function() {
  window.location.href = '#add-category';

  Array.from(navTabs).forEach(item => item.classList.remove('js-active'));
  tabNavCategories.classList.add('js-active');
}));