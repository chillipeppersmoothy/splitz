import { useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useSplitz } from "../context/useSplitz";

export default function SummaryPage() {
  const { getTotalPerPerson } = useSplitz();
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(totals).map(([name, amount]) => (
              <div key={name} className="bg-gray-50 p-6 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-700">{name}</h3>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
