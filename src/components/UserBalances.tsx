import { memo } from "react";
import { IndianRupee } from "lucide-react";
import useSplitz from "../context/useSplitz";
import { getInitials, getRandomColor } from "../utils/utils";

const UserBalances = memo(function UserBalances() {
  const { names, getTotalPerPerson, getTotal } = useSplitz();

  return (
    <div className="bg-white rounded-2xl shadow-xl sm:p-6 p-3">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <IndianRupee className="w-5 h-5" aria-hidden="true" />
        <span>Running Balances</span>
      </h3>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 gap-2"
        style={{ minHeight: "80px" }}
      >
        {names.map((name) => (
          <div
            key={name}
            className="bg-purple-50 sm:p-4 p-3 rounded-lg"
            style={{ minHeight: "80px" }}
          >
            <div className="flex items-center gap-1">
              <div
                className={`h-7 w-7 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full ${getRandomColor()} flex items-center justify-center text-white font-semibold`}
              >
                {getInitials(name)}
              </div>
              <h4 className="font-semibold text-purple-700 sm:text-base text-sm flex justify-center">
                {name}
              </h4>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              <span aria-label="Indian Rupees">₹</span>
              {getTotalPerPerson[name].toFixed(2)}
            </p>
          </div>
        ))}
        <div
          className="bg-purple-50 sm:p-4 p-3 rounded-lg"
          style={{ minHeight: "80px" }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-7 w-7 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full ${getRandomColor()} flex items-center justify-center text-white font-semibold`}
            >
              <IndianRupee className="w-5 h-5" aria-hidden="true" />
            </div>
            <h4 className="font-semibold text-purple-700 sm:text-2xl text-xl">
              Total
            </h4>
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            <span aria-label="Indian Rupees">₹</span>
            {getTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
});

export default UserBalances;
