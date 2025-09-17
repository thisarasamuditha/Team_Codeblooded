
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mock } from "../lib/mock";

export default function Groups(){
  const [name,setName]=useState("");
  const [items,setItems]=useState(mock.groups());
  const nav=useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white shadow p-4">
        <h2 className="font-semibold mb-3">Create a group</h2>
        <div className="flex gap-2">
          <input className="border rounded-lg px-3 py-2 flex-1" placeholder="e.g., Trip to Ella"
                 value={name} onChange={e=>setName(e.target.value)} />
          <button className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
            onClick={()=>{ const g=mock.addGroup(name); setItems(mock.groups()); nav(`/group/${g.id}`); }}>
            Create
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow p-4">
        <h2 className="font-semibold mb-3">Your groups</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map(g=>(
            <li key={g.id} onClick={()=>nav(`/group/${g.id}`)}
                className="border rounded-lg p-4 cursor-pointer hover:border-indigo-400">
              <div className="font-medium">{g.name}</div>
              <div className="text-sm text-gray-500">{g.members.length} members</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
