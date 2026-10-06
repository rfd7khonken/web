document.addEventListener("DOMContentLoaded", async () => {
  try {
    const news = await API.request("getNews");
    document.getElementById("newsList").innerHTML = news.items.length ? news.items.map(n => `
      <div class="col-md-6 col-lg-4"><article class="card border-0 shadow-sm news-card">
        <div class="card-body"><span class="badge text-bg-success mb-2">${escapeHtml(n.category||"ข่าว")}</span>
        <h5 class="fw-bold">${escapeHtml(n.title)}</h5><p class="text-secondary small">${escapeHtml(n.summary||"")}</p>
        <small class="text-secondary">${escapeHtml(n.publish_date||"")}</small></div>
      </article></div>`).join("") : `<div class="col-12"><div class="alert alert-light border">ยังไม่มีข่าว</div></div>`;
    const docs = await API.request("getDocuments");
    document.getElementById("documentList").innerHTML = docs.items.length ? docs.items.map(d => `
      <div class="col-md-6"><div class="card border-0 shadow-sm"><div class="card-body d-flex gap-3 align-items-center">
        <div class="doc-icon">PDF</div><div class="flex-grow-1"><h6 class="fw-bold mb-1">${escapeHtml(d.title)}</h6><small class="text-secondary">${escapeHtml(d.category||"เอกสาร")}</small></div>
        ${d.file_url ? `<a class="btn btn-sm btn-outline-success" href="${escapeAttr(d.file_url)}" target="_blank">เปิด</a>`:""}
      </div></div></div>`).join("") : `<div class="col-12"><div class="alert alert-light border">ยังไม่มีเอกสาร</div></div>`;
  } catch(err) {
    document.getElementById("newsList").innerHTML = `<div class="col-12"><div class="alert alert-warning">ไม่สามารถโหลดข้อมูล API: ${escapeHtml(err.message)}</div></div>`;
    document.getElementById("documentList").innerHTML = "";
  }
});
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function escapeAttr(s){return String(s??"").replace(/"/g,"&quot;")}
