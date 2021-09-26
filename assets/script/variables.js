let expensesDates = [];
let incomeDates = [];
let categories = [];
let total = [];
let totalExpenses = [];
let totalIncome = [];
let categoriesExpenses = [
  "Продукты",
  "Проезд",
  "Кафе и рестораны",
  "Дети",
  "Развлечения",
  "Машина",
  "Подарки",
  "Питомцы",
  "Образование",
  "Покупки",
  "Здоровье",
  "Спортзал",
  "Коммунальные платежи",
  "Жильё",
  "Уход за собой",
  "Платежи",
  "Кредит",
  "Рассрочка"
];
let categoriesIncome = [
  "Зарплата",
  "Подарок",
  "Депозит",
  "Обмен валюты",
  "Инвестиции"
];
let iconSrc = [
  "assets/icons/categories/grocery.svg",
  "assets/icons/categories/transport.svg",
  "assets/icons/categories/restauran.svg",
  "assets/icons/categories/children.svg",
  "assets/icons/categories/leisure.svg",
  "assets/icons/categories/auto.svg",
  "assets/icons/categories/gift.svg",
  "assets/icons/categories/pets.svg",
  "assets/icons/categories/education.svg",
  "assets/icons/categories/shopping.svg",
  "assets/icons/categories/health.svg",
  "assets/icons/categories/gym.svg",
  "assets/icons/categories/utilities.svg",
  "assets/icons/categories/rent.svg",
  "assets/icons/categories/personal-care.svg",
  "assets/icons/categories/payments.svg",
  "assets/icons/categories/credit.svg",
  "assets/icons/categories/installments.svg",
  "assets/icons/categories/salary.svg",
  "assets/icons/categories/cash-gift.svg",
  "assets/icons/categories/deposit.svg",
  "assets/icons/categories/currency-exchange.svg",
  "assets/icons/categories/investments.svg",
  "assets/icons/categories/meds.svg",
  "assets/icons/categories/vacation.svg",
  "assets/icons/categories/nails.svg",
  "assets/icons/categories/clothes.svg",
  "assets/icons/categories/laundry.svg",
  "assets/icons/categories/cleaning.svg",
  "assets/icons/categories/juwelery.svg",
  "assets/icons/categories/installments.svg",
  "assets/icons/categories/dry-cleaning.svg",
  "assets/icons/categories/therapy.svg",
  "assets/icons/categories/repair-service.svg",
  "assets/icons/categories/credit.svg",
  "assets/icons/categories/renovation.svg"
];

let iconSrcModal = [
  "assets/icons/categories/meds.svg",
  "assets/icons/categories/vacation.svg",
  "assets/icons/categories/nails.svg",
  "assets/icons/categories/clothes.svg",
  "assets/icons/categories/laundry.svg",
  "assets/icons/categories/cleaning.svg",
  "assets/icons/categories/juwelery.svg",
  "assets/icons/categories/installments.svg",
  "assets/icons/categories/dry-cleaning.svg",
  "assets/icons/categories/therapy.svg",
  "assets/icons/categories/repair-service.svg",
  "assets/icons/categories/credit.svg",
  "assets/icons/categories/renovation.svg"
];

categories = [...categoriesExpenses, ...categoriesIncome];

let options = {day: 'numeric', month: 'long', weekday: 'long'};