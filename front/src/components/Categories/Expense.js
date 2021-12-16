import PropTypes from 'prop-types';

import croix from '../../assets/croix.png';
import pen from '../../assets/draw.png';

import convertPostgresDate from '../../helpers/datePostgres';

function Expense({expenseid, description, price, createdat, onClickUpdate, onClickDelete}) {

    const handleOnCLickUpdate = () => {
        onClickUpdate(expenseid, description, price);
    };

    const handleOnClickDelete = () => {
        onClickDelete(expenseid);
    };

    const date = convertPostgresDate(createdat);

    return (
        <li className="expenses__list__li">
            <div className="expenses__list__li__left">
                <p className="expenses__list__li__left_description">{description}</p>
            </div>
            <div className="expenses__list__li__right">
                <div style={{marginRight: '2.5rem'}}>
                    <div className="expenses__list__li__right__price">{price}€</div>
                    <div className="expenses__list__li__right__date">{date}</div>
                </div>
                <div>
                    <img src={pen} alt="Modifier une dépense" style={{marginBottom: '0.7rem'}} onClick={handleOnCLickUpdate} />
                    <img src={croix} alt="Supprimer une dépense" onClick={handleOnClickDelete} />
                </div>
            </div>
        </li>
    );
}

Expense.propTypes = {
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    createdat: PropTypes.string.isRequired,
    onClickUpdate: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
}

export default Expense;