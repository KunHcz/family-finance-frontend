import React, { useEffect, useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from "../../store";
import {
  fetchIncomes,
  deleteIncome,
  updateIncome,
  Income,
} from "../../store/slices/income";
import {
  fetchExpenses,
  deleteExpense,
  updateExpense,
  Expense,
} from "../../store/slices/expense";
import "./IncomeExpenseOverview.scss";

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

export default function IncomeExpenseOverview() {
  const { t } = useTranslation("incomeExpenseOverview");
  const dispatch: AppDispatch = useDispatch();
  const { incomes, expenses } = useSelector((state: RootState) => ({
    incomes: state.incomes.incomes,
    expenses: state.expenses.expenses,
  }));
  const user = useSelector((state: RootState) => state.user);

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchIncomes());
      dispatch(fetchExpenses());
    });
  }, [dispatch]);

  const totalIncome = incomes.reduce(
    (sum, income) => sum + parseFloat(income.amount),
    0
  );
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const netIncome = totalIncome - totalExpense;

  const handleDeleteIncome = (id: number) => {
    dispatch(deleteIncome(id));
  };

  const handleDeleteExpense = (id: number) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (item: FormState) => {
    setFormState(item);
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.tag === "income") {
      dispatch(updateIncome({ id: formState.id, income: formState as Income }));
    } else {
      dispatch(
        updateExpense({ id: formState.id, expense: formState as Expense })
      );
    }
    setFormState(initialFormState);
    setIsEditing(false);
  };

  const groupByCategory = (items: (Income | Expense)[]) => {
    return items.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, (Income | Expense)[]>);
  };

  const groupedIncomes = groupByCategory(incomes);
  const groupedExpenses = groupByCategory(expenses);

  return (
    <div className="income-expense-overview-container">
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <div className="summary">
        <div className="summary-item">
          <h3>{t("totalIncome")}</h3>
          <p>¥{totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>{t("totalExpense")}</h3>
          <p>¥{totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>{t("netIncome")}</h3>
          <p>¥{netIncome.toFixed(2)}</p>
        </div>
      </div>
      <div className="details">
        <h3>{t("incomes")}</h3>
        {Object.keys(groupedIncomes).map((category) => (
          <div key={category}>
            <h4>{category}</h4>
            <ul>
              {groupedIncomes[category].map((income) => (
                <li key={income.id}>
                  <span>{income.subCategory}</span>
                  <span>¥{income.amount}</span>
                  <span>{income.date}</span>
                  {user.user?.username === "admin" && (
                    <>
                      <div className="actions">
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit({ ...income, tag: "income" })
                          }
                        >
                          {t("edit")}
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteIncome(income.id)}
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h3>{t("expenses")}</h3>
        {Object.keys(groupedExpenses).map((category) => (
          <div key={category}>
            <h4>{category}</h4>
            <ul>
              {groupedExpenses[category].map((expense) => (
                <li key={expense.id}>
                  <span>{expense.subCategory}</span>
                  <span>¥{expense.amount}</span>
                  <span>{expense.date}</span>
                  {user.user?.username === "admin" && (
                    <>
                      <div className="actions">
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit({ ...expense, tag: "expense" })
                          }
                        >
                          {t("edit")}
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit} className="edit-form">
          <h3>
            {formState.tag === "income" ? t("editIncome") : t("editExpense")}
          </h3>
          <label>
            {t("category")}:
            <input
              type="text"
              name="category"
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
              value={formState.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            {t("amount")}:
            <input
              type="text"
              name="amount"
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
          <button type="submit">{t("update")}</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            {t("cancel")}
          </button>
        </form>
      )}
    </div>
  );
}
