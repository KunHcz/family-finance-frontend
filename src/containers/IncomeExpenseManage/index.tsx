import React, { useEffect, useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from "../../store";
import {
  fetchIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  Income,
} from "../../store/slices/income";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  Expense,
} from "../../store/slices/expense";
import "./IncomeExpenseManage.scss";

type FormState = Income | Expense;

const initialFormState: FormState = {
  id: 0,
  tag: "income",
  category: "",
  subCategory: "",
  description: "",
  amount: "",
  date: "",
};

export default function IncomeExpenseManage() {
  const { t } = useTranslation("incomeExpenseManage");
  const dispatch: AppDispatch = useDispatch();
  const { incomes, expenses } = useSelector((state: RootState) => ({
    incomes: state.incomes.incomes,
    expenses: state.expenses.expenses,
  }));

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchIncomes());
      dispatch(fetchExpenses());
    });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      if (formState.tag === "income") {
        dispatch(
          updateIncome({ id: formState.id, income: formState as Income })
        );
      } else {
        dispatch(
          updateExpense({ id: formState.id, expense: formState as Expense })
        );
      }
    } else {
      if (formState.tag === "income") {
        dispatch(createIncome(formState as Income));
      } else {
        dispatch(createExpense(formState as Expense));
      }
    }
    setFormState(initialFormState);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleEdit = (item: FormState) => {
    setFormState(item);
    setIsEditing(true);
  };

  const handleDelete = (id: number, tag: "income" | "expense") => {
    if (tag === "income") {
      dispatch(deleteIncome(id));
    } else {
      dispatch(deleteExpense(id));
    }
  };

  return (
    <div className="income-expense-manage-container">
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <form onSubmit={handleSubmit} className="income-expense-form">
        <label>
          {t("type")}:
          <select name="tag" value={formState.tag} onChange={handleInputChange}>
            <option value="income">{t("income")}</option>
            <option value="expense">{t("expense")}</option>
          </select>
        </label>
        <label>
          {t("category")}:
          <input
            type="text"
            name="category"
            placeholder="车辆维护"
            value={formState.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          {t("subCategory")}:
          <input
            type="text"
            name="subCategory"
            placeholder="汽车保养"
            value={formState.subCategory}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          {t("descriptionLabel")}:
          <input
            type="text"
            name="description"
            placeholder="车顶有坨鸟屎"
            value={formState.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {t("amount")}:
          <input
            type="text"
            name="amount"
            placeholder="100元"
            value={formState.amount}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          {t("date")}:
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">
          {isEditing ? t("updateItem") : t("addItem")}
        </button>
      </form>
      <div className="income-section">
        <h3>{t("incomes")}</h3>
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>
              <div className="income-info">
                <span>{income.category}</span>
                <span>{income.subCategory}</span>
                <span>{income.amount}</span>
                <span>{income.date}</span>
              </div>
              <div className="income-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit({ ...income, tag: "income" })}
                >
                  {t("edit")}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(income.id, "income")}
                >
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="expense-section">
        <h3>{t("expenses")}</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <div className="expense-info">
                <span>{expense.category}</span>
                <span>{expense.subCategory}</span>
                <span>{expense.amount}</span>
                <span>{expense.date}</span>
              </div>
              <div className="expense-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit({ ...expense, tag: "expense" })}
                >
                  {t("edit")}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(expense.id, "expense")}
                >
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
