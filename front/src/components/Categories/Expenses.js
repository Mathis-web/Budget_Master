import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import Expense from './Expense';
import { FormModal, ConfirmModal, Loading } from '../index';
import dataService from '../../services/dataService';
import {filterExpenses, countTotal, findCategoryId} from '../../selectors/index';

function Expenses({categories, expenses, getUserData, isLoading}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseInfo, setExpenseInfo] = useState({});

    useEffect(() => {if(expenses.length === 0) getUserData()}, []);

    const {slug} = useParams();

    const filteredExpenses = filterExpenses(slug, expenses);
    const total = countTotal(filteredExpenses);
    let categoryId;
    if(categories.length > 0) categoryId = findCategoryId(categories, slug); 
    if(!categoryId) return <Navigate to="/mesdepenses" />;  

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const handleOnClickUpdateExpense = (id, description, price) => {
        setExpenseInfo({
            ...expenseInfo,
            id,
            description,
            price,
            type: 'update'
        });
        openModal();
    };

    const handleOnClickDeleteExpense = (id) => {
        setExpenseInfo({
            ...expenseInfo,
            id,
            type: 'delete'
        });
        openModal();
    };

    const handleOnClickCreateExpense = () => {
        setExpenseInfo({
            type: 'create'
        });
        openModal();
    };

    const deleteExpense = async () => {
        closeModal();
        const result = await dataService.deleteOneExpense(expenseInfo.id);
        toast.success(result);
        getUserData();
    };

    const updateExpense = async (e) => {
        e.preventDefault();
        closeModal();
        const description = e.target.elements['description'].value;
        const price = e.target.elements['price'].value;
        await dataService.updateOneExpense(expenseInfo.id, description, price, categoryId);
        toast.success('Votre dépense a bien été modifiée.');
        getUserData();
    };

    const createExpense = async (e) => {
        e.preventDefault();
        closeModal();
        const description = e.target.elements['description'].value;
        const price = e.target.elements['price'].value;
        await dataService.createOneExpense(description, price, categoryId);
        toast.success('Votre dépense a bien été créée.');
        getUserData();
    };

    if(isLoading) return <Loading />;

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
                    onClickDelete={handleOnClickDeleteExpense}
                    onClickUpdate={handleOnClickUpdateExpense}
                />)}
            </ul>

            <div className="expenses__total">
                Montant de vos dépenses dans cette catégorie: <span>{total}€</span>
            </div>

            <button className="categories__create-btn" onClick={handleOnClickCreateExpense}>
               Ajouter une dépense
           </button>

           {expenseInfo.type && expenseInfo.type === 'delete' && 
                <ConfirmModal
                    isOpen={isModalOpen} 
                    content="Etes-vous sur de vouloir supprimer cette dépense ?"
                    onClickPositive={deleteExpense}
                    onClickNegative={closeModal}
                />
            }

            {expenseInfo.type && expenseInfo.type === 'update' && 
                <FormModal
                    isOpen={isModalOpen} 
                    content="Modifier une dépense"
                    onSubmitForm={updateExpense}
                    onClickNegative={closeModal}
                >
                    <label>Description</label>
                    <input type="text" placeholder="Description de la dépense" defaultValue={expenseInfo.description} name="description"/>
                    <label>Prix</label>
                    <input type="number" name="price" placeholder="Prix de la dépense" defaultValue={expenseInfo.price} />
                </FormModal>
            }

           {expenseInfo.type && expenseInfo.type === 'create' &&
            <FormModal 
                isOpen={isModalOpen}
                content="Créer une dépense"
                onSubmitForm={createExpense}
                onClickNegative={closeModal}
            >
                <label>Description</label>
                <input type="text" placeholder="Description de la dépense" name="description"/>
                <label>Prix</label>
                <input type="number" name="price" placeholder="Prix de la dépense" />
            </FormModal>
           }
        </main>
    );
}

Expenses.propTypes = {
    expenses: PropTypes.array.isRequired,
    getUserData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired
};


export default Expenses;