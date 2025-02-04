const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

export default LoadingFallback;
