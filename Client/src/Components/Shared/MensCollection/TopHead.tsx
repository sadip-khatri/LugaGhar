import { Link } from "react-router-dom";
function TopHead() {
  return (
    <>
      <section className="bg-[var(--color-bg)]">
        <div className="content container mx-auto py-2 text-sm text-[var(--color-secondary)]">
          <Link to="/" className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors">Home</Link> /{" "}
          <span className="text-[var(--color-accent)] font-semibold">Mens Collections</span>
        </div>
      </section>
    </>
  );
}

export default TopHead;
