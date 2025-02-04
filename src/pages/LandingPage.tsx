import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight, UserPlus, Users } from "lucide-react";
import { useSplitz } from "../context/useSplitz";

export default function LandingPage() {
  const [inputName, setInputName] = useState("");
  const { names, setNames } = useSplitz();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      setNames([...names, inputName.trim()]);
      setInputName("");

      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">Splitz</h1>
            <p className="text-gray-600">
              Split expenses effortlessly with friends
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddName()}
                placeholder="Enter name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddName}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold text-gray-700">Added Friends</h2>
            </div>
            {names.length === 0 ? (
              <p className="text-gray-500 text-sm">No names added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {names.map((name, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <button
            onClick={() => names.length >= 2 && navigate("/expenses")}
            disabled={names.length < 2}
            className={`p-4 rounded-full ${
              names.length >= 2
                ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white transition-colors`}
          >
            <MoveRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
