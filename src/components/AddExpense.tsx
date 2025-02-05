import { IndianRupee, Plus, Receipt, Users, X } from "lucide-react";
import { useRef } from "react";
import { useSplitz } from "../context/useSplitz";

interface AddExpenseProps {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  editingExpenseId: string | null;
  onCancelEdit: () => void;
}

const AddExpense = ({
  amount,
  setAmount,
  selectedNames,
  setSelectedNames,
  item,
  setItem,
  editingExpenseId,
  onCancelEdit,
}: AddExpenseProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { names, addExpense, editExpense } = useSplitz();

  const handleAddOrUpdateExpense = () => {
    if (item && amount && selectedNames.length > 0) {
      const expenseData = {
        item,
        amount: parseFloat(amount),
        splitBetween: selectedNames,
      };

      if (editingExpenseId) {
        editExpense(editingExpenseId, expenseData);
        onCancelEdit();
      } else {
        addExpense(expenseData);
      }

      setItem("");
      setAmount("");
      setSelectedNames([]);
      inputRef.current?.focus();
    }
  };

  const toggleName = (name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const selectAll = () => {
    setSelectedNames(names);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingExpenseId ? "Edit Expense" : "Add Expense"}
          </h2>
          {editingExpenseId && (
            <button
              onClick={onCancelEdit}
              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter item"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee className="w-4 h-4 text-gray-500" />
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddOrUpdateExpense}
              disabled={!item || !amount || selectedNames.length === 0}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              {editingExpenseId ? "Update Expense" : "Add Expense"}
            </button>
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Split Between
        </h3>
        <div className="flex flex-wrap gap-2">
          {names.map((name) => (
            <button
              key={name}
              onClick={() => toggleName(name)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedNames.includes(name)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
