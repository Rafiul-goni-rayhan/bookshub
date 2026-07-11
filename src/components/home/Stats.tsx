const stats = [
  { value: "৫,০০০+", label: "বই তালিকাভুক্ত" },
  { value: "২,৫০০+", label: "সক্রিয় ইউজার" },
  { value: "১,২০০+", label: "সফল বিনিময়" },
  { value: "৪.৮/৫", label: "গড় রেটিং" },
];

export default function Stats() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">
              {s.value}
            </p>
            <p className="text-gray-200 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}