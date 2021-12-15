import PropTypes from 'prop-types';

import croix from '../../assets/croix.png';
import pen from '../../assets/draw.png';

function Expense({description, price, createdat}) {
    return (
        <li className="expenses__list__li">
            <div className="expenses__list__li__left">
                <p className="expenses__list__li__left_description">{description}</p>
            </div>
            <div className="expenses__list__li__right">
                <div style={{marginRight: '2rem'}}>
                    <div className="expenses__list__li__right__price">{price}€</div>
                    <div className="expenses__list__li__right__date">{createdat}</div>
                </div>
                <div>
                    <img src={pen} alt="Modifier une dépense" style={{marginBottom: '0.7rem'}}/>
                    <img src={croix} alt="Supprimer une dépense" />
                </div>
            </div>
        </li>
    );
}

Expense.propTypes = {

}

export default Expense;