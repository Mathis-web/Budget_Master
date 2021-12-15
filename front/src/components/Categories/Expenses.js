import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Expense from './Expense';
import filterExpenses from '../../selectors/filterExpenses';

function Expenses({expenses, onClickDelete, onCLickUpdate}) {
    const {slug} = useParams();
    const filteredExpenses = filterExpenses(slug, expenses);
    return (
        <main className="expenses">
        <h2 className="expenses__title">
            Mes dépenses dans {slug}
        </h2>
            {filteredExpenses && filteredExpenses.length === 0 &&
                <p className="expenses__text">Aucune dépense n'est associée à cette catégorie. Commencez par en créer une.</p>
            }
            <ul className="expenses__list">
                {filteredExpenses.map(expense => <Expense
                    {...expense}
                    key={expense.expenseid}
                    onClickDelete={onClickDelete}
                    onCLickUpdate={onCLickUpdate} 
                />)}
            </ul>
        </main>
    );
}

Expenses.propTypes = {
    expenses: PropTypes.array.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickUpdate: PropTypes.func.isRequired,
}

export default Expenses;