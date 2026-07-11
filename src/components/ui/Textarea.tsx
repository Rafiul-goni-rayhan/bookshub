interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function Textarea({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 4,
  required = true,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition resize-none ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}