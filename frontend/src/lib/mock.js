let _id = 1; const newId = () => String(_id++);
const store = {
  groups: [{
    id: newId(), name: "Trip to Ella",
    members: [{id:newId(),name:"Sandaru"},{id:newId(),name:"Pathum"},{id:newId(),name:"Himasha"}],
    expenses: []
  }]
};
const findG = id => store.groups.find(g=>g.id===String(id));

export const mock = {
  groups: ()=>store.groups,
  addGroup: (name)=>{ const g={id:newId(), name: name||"Untitled Group", members:[], expenses:[]}; store.groups.push(g); return g; },
  getGroup: (id)=> JSON.parse(JSON.stringify(findG(id))),
  addMember: (gid,name)=>{ if(!name) return; findG(gid).members.push({id:newId(), name}); },
  memberName: (g,id)=> g.members.find(m=>m.id===String(id))?.name || "—",
  addExpense: (gid, f)=>{
    const g=findG(gid); const amt=Number(f.amount||0);
    g.expenses.unshift({ id:newId(), title:f.title||"Untitled", amount:amt, category:f.category||"Misc", payer:String(f.payer), date:f.date||new Date().toISOString().slice(0,10) });
  },
  summary: (g)=>{
    const balances = Object.fromEntries(g.members.map(m=>[m.id,0]));
    g.expenses.forEach(e=>{
      const equal = +(e.amount / Math.max(g.members.length,1)).toFixed(2);
      g.members.forEach(m=>balances[m.id]-=equal);
      balances[e.payer]+=e.amount;
    });
    const list = g.members.map(m=>({ id:m.id, name:m.name, net:+balances[m.id].toFixed(2) }));
    const debt = list.filter(b=>b.net<0).map(b=>({name:b.name, amt:-b.net}));
    const cred = list.filter(b=>b.net>0).map(b=>({name:b.name, amt:b.net}));
    debt.sort((a,b)=>b.amt-a.amt); cred.sort((a,b)=>b.amt-a.amt);
    const transfers=[]; let i=0,j=0;
    while(i<debt.length && j<cred.length){
      const pay=Math.min(debt[i].amt, cred[j].amt);
      transfers.push({from:debt[i].name,to:cred[j].name,amount:+pay.toFixed(2)});
      debt[i].amt=+(debt[i].amt-pay).toFixed(2);
      cred[j].amt=+(cred[j].amt-pay).toFixed(2);
      if(debt[i].amt<=0.01) i++;
      if(cred[j].amt<=0.01) j++;
    }
    return { balances:list, transfers };
  }
};
export const fmt = n => `LKR ${Number(n||0).toFixed(2)}`;
