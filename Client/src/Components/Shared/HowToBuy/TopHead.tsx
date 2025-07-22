import { Link } from "react-router-dom";
function TopHead() {
  return (
    <>
      <section className=" bg-gray-100">
        <div className="content container mx-auto py-2 text-sm">
          <Link to="/">Home</Link> /{" "}
          <span className="text-[#C62828] font-semibold">How To Buy ?</span>
        </div>
      </section>
    </>
  );
}

export default TopHead;
