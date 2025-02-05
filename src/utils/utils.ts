export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getRandomColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-teal-500",
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index % colors.length];
};
