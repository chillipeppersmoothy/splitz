type CurrentExpensePreviewProps = {
  selectedNames: string[];
  amount: string;
};

const CurrentExpensePreview = ({
  selectedNames,
  amount,
}: CurrentExpensePreviewProps) => {
  const getSplitAmounts = () => {
    if (!amount || selectedNames.length === 0) return {};

    const peopleCount = selectedNames.length;
    const totalCents = Math.round(parseFloat(amount) * 100);
    const baseCents = Math.floor(totalCents / peopleCount);
    const remainder = totalCents - baseCents * peopleCount;

    const splitAmounts: Record<string, number> = {};
    selectedNames.forEach((name) => {
      splitAmounts[name] = baseCents / 100;
    });

    const shuffledNames = [...selectedNames].sort(() => Math.random() - 0.5);
    for (let i = 0; i < remainder; i++) {
      splitAmounts[shuffledNames[i]] =
        Math.round((splitAmounts[shuffledNames[i]] + 0.01) * 100) / 100;
    }

    return splitAmounts;
  };

  const splitAmounts = getSplitAmounts();

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
              ₹{splitAmounts[name]?.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentExpensePreview;
