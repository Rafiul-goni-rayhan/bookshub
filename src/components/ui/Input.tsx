interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = true,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}