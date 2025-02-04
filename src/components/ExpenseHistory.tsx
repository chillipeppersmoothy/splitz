import { useSplitz } from "../context/useSplitz";

const ExpenseHistory = () => {
  const { expenses } = useSplitz();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Expense History</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {expenses.map((expense) => (
          <div key={expense.id} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{expense.item}</span>
              <span className="text-purple-600 font-semibold">
                ₹{expense.amount.toFixed(2)}
              </span>
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
