import { Pencil, Trash2 } from "lucide-react";
import useSplitz from "../context/useSplitz";
import { Expense } from "../Interfaces/Interface";

interface ExpenseHistoryProps {
  onEditExpense: (expense: Expense) => void;
}

const ExpenseHistory = ({ onEditExpense }: ExpenseHistoryProps) => {
  const { expenses, deleteExpense } = useSplitz();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Expense History</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {expenses.map((expense) => (
          <div key={expense.id} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="text-lg">{expense.item}</span>
                <span className="text-purple-600 font-semibold ml-4 text-lg">
                  ₹{expense.amount?.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditExpense(expense)}
                  className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Split between: {expense.splitBetween.join(", ")}
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No expenses added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
