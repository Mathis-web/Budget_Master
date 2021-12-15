import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Expense from './Expense';
import filterExpenses from '../../selectors/filterExpenses';

function Expenses({expenses}) {
    const {slug} = useParams();
    const filteredExpenses = filterExpenses(slug, expenses);
    return (
        <main className="expenses">
            {filteredExpenses && filteredExpenses.length === 0 &&
                <p className="expenses__text">Aucune dépense n'est associée à cette catégorie. Commencez par en créer une.</p>
            }
            <ul className="expenses__list">
                {filteredExpenses.map(expense => <Expense
                    {...expense}
                    key={expense.expenseid} 
                />)}
            </ul>
        </main>
    );
}

Expenses.propTypes = {
    expenses: PropTypes.array.isRequired,
}

export default Expenses;