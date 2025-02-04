import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useSplitz } from "../context/useSplitz";
import UserBalances from "../components/UserBalances";
import CurrentExpensePreview from "../components/CurrentExpensePreview";
import ExpenseHistory from "../components/ExpenseHistory";
import AddExpense from "../components/AddExpense";

export default function ExpensePage() {
  const { expenses } = useSplitz();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <UserBalances />

        <div className="grid md:grid-cols-2 gap-6">
          <AddExpense
            amount={amount}
            setAmount={setAmount}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
          />

          <ExpenseHistory />
        </div>

        {(amount || selectedNames.length > 0) && (
          <CurrentExpensePreview
            selectedNames={selectedNames}
            amount={amount}
          />
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/summary")}
            disabled={expenses.length === 0}
            className={`px-8 py-3 rounded-lg flex items-center gap-2 ${
              expenses.length > 0
                ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white transition-colors`}
          >
            View Summary
            <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
