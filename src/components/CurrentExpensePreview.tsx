type CurrentExpensePreviewProps = {
  selectedNames: string[];
  amount: string;
};

const CurrentExpensePreview = ({
  selectedNames,
  amount,
}: CurrentExpensePreviewProps) => {
  const getCurrentSplitAmount = () => {
    if (!amount || selectedNames.length === 0) return 0;
    return parseFloat(amount) / selectedNames.length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Current Expense Preview
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {selectedNames.map((name) => (
          <div key={name} className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700">{name}</h4>
            <p className="text-2xl font-bold text-purple-600">
              ₹{getCurrentSplitAmount().toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentExpensePreview;
