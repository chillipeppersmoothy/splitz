import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight, ArrowLeft } from "lucide-react";
import { useSplitz } from "../context/useSplitz";
import UserBalances from "../components/UserBalances";
import CurrentExpensePreview from "../components/CurrentExpensePreview";
import ExpenseHistory from "../components/ExpenseHistory";
import AddExpense from "../components/AddExpense";
import { Expense } from "../Interfaces/Interface";

export default function ExpensePage() {
  const { expenses } = useSplitz();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [item, setItem] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const handleEditExpense = (expense: Expense) => {
    setItem(expense.item);
    setAmount(expense.amount.toString());
    setSelectedNames(expense.splitBetween);
    setEditingExpenseId(expense.id);
  };

  const handleCancelEdit = () => {
    setItem("");
    setAmount("");
    setSelectedNames([]);
    setEditingExpenseId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex  justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <button
            onClick={() => navigate("/summary")}
            disabled={expenses.length === 0}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              expenses.length > 0
                ? "bg-white text-purple-600 rounded-lg hover:bg-purple-100 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } transition-colors`}
          >
            <span className="hidden sm:inline">View Summary</span>
            <MoveRight className="w-5 h-5" />
          </button>
        </div>

        <UserBalances />

        <div className="grid md:grid-cols-2 gap-6">
          <AddExpense
            amount={amount}
            setAmount={setAmount}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            item={item}
            setItem={setItem}
            editingExpenseId={editingExpenseId}
            onCancelEdit={handleCancelEdit}
          />

          <ExpenseHistory onEditExpense={handleEditExpense} />
        </div>

        {(amount || selectedNames.length > 0) && (
          <CurrentExpensePreview
            selectedNames={selectedNames}
            amount={amount}
          />
        )}
      </div>
    </div>
  );
}
