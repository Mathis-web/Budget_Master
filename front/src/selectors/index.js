const countTotal = (expenses) => {
    return expenses.reduce((acc, currentValue) => acc + currentValue.price, 0);
};

const findCategoryId = (categories, slug) => {
    const category = categories.find((cat) => cat.name === slug);
    if(category && category.id) return category.id;
    else return null;
};


function filterExpenses(categoryName, expenses) {
    return expenses.filter(cat => cat.name === categoryName);
}

export {countTotal, findCategoryId, filterExpenses};
