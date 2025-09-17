import { Link } from "react-router-dom";

export default function Landing(){
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold">Split expenses without the math.</h1>
        <p className="mt-3 text-gray-600">Create a group, add friends, and see who owes whom.</p>
        <Link to="/groups" className="inline-block mt-6 px-4 py-2 rounded-lg bg-indigo-600 text-white">
          Start a group
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="rounded-2xl bg-white shadow p-6">Preview</div>
      </div>
    </section>
  );
}
