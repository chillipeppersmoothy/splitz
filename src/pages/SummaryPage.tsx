import { useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useSplitz } from "../context/useSplitz";
import { getInitials, getRandomColor } from "../utils/utils";

export default function SummaryPage() {
  const { getTotalPerPerson, getTotal } = useSplitz();
  const navigate = useNavigate();
  const totals = getTotalPerPerson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Final Summary</h2>
            <button
              onClick={() => navigate("/expenses")}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div
            className="bg-purple-50 sm:p-6 p-5 rounded-lg space-y-4"
            style={{ minHeight: "80px" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`sm:w-12 sm:h-12 w-8 h-8 text-xs sm:text-base rounded-full ${getRandomColor()} flex items-center justify-center text-white font-semibold`}
              >
                <IndianRupee className="w-5 h-5" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-purple-700 sm:text-2xl text-xl">
                Total Expense
              </h4>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              <span aria-label="Indian Rupees">₹</span>
              {getTotal().toFixed(2)}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(totals).map(([name, amount]) => (
              <div key={name} className="bg-gray-50 p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`sm:w-12 sm:h-12 w-8 h-8 rounded-full ${getRandomColor()} flex items-center justify-center text-white font-semibold text-lg`}
                  >
                    {getInitials(name)}
                  </div>
                  <h3 className="font-semibold text-gray-700">{name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-purple-600" />
                  <p className="text-2xl font-bold text-purple-600">
                    {amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
