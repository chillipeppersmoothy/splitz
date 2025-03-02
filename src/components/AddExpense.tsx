import { IndianRupee, Plus, Receipt, Users, X } from "lucide-react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import useSplitz from "../context/useSplitz";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!names.length) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.length]);

  const handleItem = (e: { target: { value: SetStateAction<string> } }) => {
    setError(false);
    setItem(e.target.value);
  };

  const handleAmount = (e: { target: { value: SetStateAction<string> } }) => {
    setError(false);
    setAmount(e.target.value);
  };

  const handleAddOrUpdateExpense = () => {
    if (item.length > 0 && amount.length > 0 && selectedNames.length > 0) {
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
    if (!item.length || !amount.length) {
      setError(true);
      return;
    }
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
              aria-label="Cancel edit"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={item}
            onChange={(e) => handleItem(e)}
            placeholder="Enter item"
            aria-label="Enter expense item"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
              />
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmount(e)}
              placeholder="Enter amount"
              aria-label="Enter expense amount"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddOrUpdateExpense}
              disabled={!item || !amount || selectedNames.length === 0}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              aria-label={editingExpenseId ? "Update expense" : "Add expense"}
            >
              <Plus className="w-5 h-5 inline mr-2" aria-hidden="true" />
              {editingExpenseId ? "Update Expense" : "Add Expense"}
            </button>
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              aria-label="Select all users"
            >
              <Users className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-600 text-sm" role="alert">
          Please add an expense.
        </div>
      )}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <Receipt className="w-5 h-5" aria-hidden="true" />
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
              aria-pressed={selectedNames.includes(name)}
              aria-label={`Select ${name}`}
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
