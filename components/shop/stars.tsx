export function Stars({
  rating,
  reviews,
}: {
  rating: number;
  reviews?: number;
}) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="text-accent"
        aria-hidden="true"
        title={`${rating.toFixed(1)} out of 5`}
      >
        {"★★★★★".slice(0, Math.floor(rounded))}
        {rounded % 1 ? "½" : ""}
      </span>
      <span className="font-mono text-[0.68rem] text-muted">
        {rating.toFixed(1)}
        {typeof reviews === "number" && (
          <>
            {" "}
            ({reviews})
          </>
        )}
      </span>
      <span className="sr-only">
        {rating.toFixed(1)} out of 5 stars
        {typeof reviews === "number" ? `, ${reviews} review${reviews === 1 ? "" : "s"}` : ""}
      </span>
    </span>
  );
}
