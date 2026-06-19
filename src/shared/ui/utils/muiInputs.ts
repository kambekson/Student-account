export const outlinedInputStyle = (error?: boolean) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "var(--color-background)",
    borderRadius: "6px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "var(--color-alert)" : "var(--color-inactive)",
    transition: "border-color 0.3s ease",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "var(--color-alert)" : "var(--color-accent)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "var(--color-alert)" : "var(--color-accent)",
  },
  "& .MuiInputBase-input": {
    color: "var(--color-text)",
  },
  "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-inactive)",
  },
  "&.Mui-disabled .MuiInputBase-input": {
    color: "var(--color-inactive)",
    WebkitTextFillColor: "var(--color-inactive)",
  },
});

export const inputLabelStyle = (error?: boolean) => ({
  color: error ? "var(--color-alert) !important" : "var(--color-text-2) !important",
  "&.Mui-focused": {
    color: error ? "var(--color-alert) !important" : "var(--color-accent) !important",
  },
});
