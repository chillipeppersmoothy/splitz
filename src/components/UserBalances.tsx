import { memo } from "react";
import { IndianRupee } from "lucide-react";
import { useSplitz } from "../context/useSplitz";
import { getInitials, getRandomColor } from "../utils/utils";

const UserBalances = memo(function UserBalances() {
  const { names, getTotalPerPerson } = useSplitz();
  const totals = getTotalPerPerson();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <IndianRupee className="w-5 h-5" aria-hidden="true" />
        <span>Running Balances</span>
      </h3>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{ minHeight: "100px" }}
      >
        {names.map((name) => (
          <div
            key={name}
            className="bg-purple-50 p-4 rounded-lg"
            style={{ minHeight: "80px" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 sm:w-10 sm:h-10 rounded-full ${getRandomColor()} flex items-center justify-center text-white font-semibold`}
              >
                {getInitials(name)}
              </div>
              <h4 className="font-semibold text-purple-700">{name}</h4>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              <span aria-label="Indian Rupees">₹</span>
              {totals[name].toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default UserBalances;
