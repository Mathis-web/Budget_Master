function filterExpenses(categoryName, expenses) {
    return expenses.filter(cat => cat.name === categoryName);
}

export default filterExpenses;