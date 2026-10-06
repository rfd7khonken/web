document.addEventListener("DOMContentLoaded", async()=>{
  AUTH.requireLogin();
  const u=AUTH.user;
  if(u) document.getElementById("currentUser").textContent=`${u.fullname} (${u.role})`;
  try{
    const result=await API.post("dashboard",{token:AUTH.token});
    document.getElementById("statNews").textContent=result.stats.news;
    document.getElementById("statDocs").textContent=result.stats.documents;
    document.getElementById("statUsers").textContent=result.stats.users;
    document.getElementById("latestNews").innerHTML=result.latestNews.map(n=>`<tr><td>${escapeHtml(n.title)}</td><td><span class="badge text-bg-success">${escapeHtml(n.status)}</span></td><td>${escapeHtml(n.publish_date)}</td></tr>`).join("")||`<tr><td colspan="3" class="text-secondary">ยังไม่มีข้อมูล</td></tr>`;
  }catch(err){
    document.getElementById("dashboardAlert").innerHTML=`<div class="alert alert-danger">${escapeHtml(err.message)}</div>`;
    if(/token|login|auth/i.test(err.message)){AUTH.clear();setTimeout(()=>location.href="../login.html",800)}
  }
});
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
