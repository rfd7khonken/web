window.AUTH = {
  get token(){ return sessionStorage.getItem("rfd7_token"); },
  get user(){ try{return JSON.parse(sessionStorage.getItem("rfd7_user")||"null")}catch(e){return null} },
  save(result){ sessionStorage.setItem("rfd7_token", result.token); sessionStorage.setItem("rfd7_user", JSON.stringify(result.user)); },
  clear(){ sessionStorage.removeItem("rfd7_token"); sessionStorage.removeItem("rfd7_user"); },
  requireLogin(){
    if(!this.token) window.location.href = "../login.html";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if(form){
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const btn = document.getElementById("loginBtn"), alertBox = document.getElementById("loginAlert");
      btn.disabled = true; btn.textContent = "กำลังตรวจสอบ...";
      alertBox.innerHTML = "";
      try{
        const result = await API.post("login", {
          username: document.getElementById("username").value.trim(),
          password: document.getElementById("password").value
        });
        AUTH.save(result);
        window.location.href = "admin/dashboard.html";
      }catch(err){
        alertBox.innerHTML = `<div class="alert alert-danger">${escapeHtml(err.message)}</div>`;
      }finally{
        btn.disabled = false; btn.textContent = "เข้าสู่ระบบ";
      }
    });
  }
  const logout = document.getElementById("logoutBtn");
  if(logout) logout.addEventListener("click", async()=>{ AUTH.clear(); window.location.href="../login.html"; });
});
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
