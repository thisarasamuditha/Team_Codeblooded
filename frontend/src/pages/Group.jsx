import { useParams } from "react-router-dom";
import { useState } from "react";
import { mock, fmt } from "../lib/mock";

const TABS = ["Expenses","Members","Summary"];

export default function Group(){
  const { id } = useParams();
  const [tab,setTab]=useState(TABS[0]);
  const [g,setG]=useState(()=>mock.getGroup(id));
  const refresh = ()=> setG({...mock.getGroup(id)});

  if(!g) return <div className="text-sm text-gray-500">Group not found.</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{g.name}</h1>
        <div className="flex gap-2">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`px-3 py-1.5 rounded-lg border ${tab===t?'bg-indigo-600 text-white border-indigo-600':'bg-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {tab==="Expenses" && (
        <section className="rounded-xl bg-white shadow p-4 space-y-4">
          <ExpenseForm g={g} onAdded={refresh}/>
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr><th className="text-left py-2">Title</th><th>Category</th><th>Amount</th><th>Payer</th><th>Date</th></tr>
            </thead>
            <tbody>
              {g.expenses.map(e=>(
                <tr key={e.id} className="border-t">
                  <td className="py-2">{e.title}</td>
                  <td className="text-gray-500">{e.category}</td>
                  <td className="font-medium">{fmt(e.amount)}</td>
                  <td className="text-gray-600">{mock.memberName(g, e.payer)}</td>
                  <td className="text-gray-500">{e.date}</td>
                </tr>
              ))}
              {!g.expenses.length && (
                <tr><td colSpan="5" className="py-6 text-center text-sm text-gray-500">No expenses yet. Add your first one.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {tab==="Members" && (
        <section className="rounded-xl bg-white shadow p-4">
          <Members g={g} onChange={refresh}/>
        </section>
      )}

      {tab==="Summary" && (
        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white shadow p-4">
            <h3 className="font-semibold mb-2">Balances</h3>
            <ul className="space-y-2">
              {mock.summary(g).balances.map(b=>(
                <li key={b.id} className="flex items-center justify-between">
                  <span>{b.name}</span>
                  <span className={b.net>0?'text-green-600':b.net<0?'text-red-600':''}>{fmt(b.net)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white shadow p-4">
            <h3 className="font-semibold mb-2">Who pays whom</h3>
            <ul className="space-y-2">
              {mock.summary(g).transfers.map((t,i)=>(
                <li key={i} className="flex justify-between">
                  <span>{t.from} → {t.to}</span><span className="font-medium">{fmt(t.amount)}</span>
                </li>
              ))}
              {!mock.summary(g).transfers.length && <div className="text-sm text-gray-500">All settled! 🎉</div>}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

function ExpenseForm({ g, onAdded }){
  const [f,setF]=useState({
    title:"", amount:"", category:"Food",
    payer:g.members[0]?.id, date:new Date().toISOString().slice(0,10)
  });
  return (
    <div className="grid md:grid-cols-5 gap-2">
      <input className="border rounded-lg px-3 py-2" placeholder="Title" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
      <input className="border rounded-lg px-3 py-2" placeholder="Amount" type="number" value={f.amount} onChange={e=>setF({...f,amount:e.target.value})}/>
      <input className="border rounded-lg px-3 py-2" placeholder="Category" value={f.category} onChange={e=>setF({...f,category:e.target.value})}/>
      <select className="border rounded-lg px-3 py-2" value={f.payer} onChange={e=>setF({...f,payer:e.target.value})}>
        {g.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <div className="flex gap-2">
        <input className="border rounded-lg px-3 py-2 flex-1" type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})}/>
        <button
          onClick={()=>{ mock.addExpense(g.id, f); onAdded(); setF({...f,title:"",amount:""}); }}
          className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Add</button>
      </div>
    </div>
  );
}

function Members({ g, onChange }){
  const [name,setName]=useState("");
  return (
    <>
      <div className="flex gap-2 mb-3">
        <input className="border rounded-lg px-3 py-2 flex-1" placeholder="Add member name" value={name} onChange={e=>setName(e.target.value)}/>
        <button onClick={()=>{ mock.addMember(g.id,name); setName(""); onChange();}}
                className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Add</button>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2">
        {g.members.map(m=>(
          <li key={m.id} className="border rounded-lg p-3">{m.name}</li>
        ))}
      </ul>
    </>
  );
}
