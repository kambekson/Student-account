import "./style.css";

const CircularLoading = () => {
  return (
    <div className="circular-loading flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
    </div>
  );
};

export default CircularLoading;
