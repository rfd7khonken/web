window.API = {
  async request(action, payload = {}) {
    const base = window.APP_CONFIG.API_URL;
    if (!base || base.includes("PASTE_YOUR")) throw new Error("ยังไม่ได้ตั้งค่า API_URL ใน assets/js/config.js");
    const params = new URLSearchParams({ action, ...payload });
    const response = await fetch(`${base}?${params.toString()}`, { method: "GET" });
    if (!response.ok) throw new Error(`API HTTP ${response.status}`);
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "API error");
    return data;
  },
  async post(action, payload = {}) {
    const base = window.APP_CONFIG.API_URL;
    if (!base || base.includes("PASTE_YOUR")) throw new Error("ยังไม่ได้ตั้งค่า API_URL ใน assets/js/config.js");
    const body = JSON.stringify({ action, ...payload });
    const response = await fetch(base, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body });
    if (!response.ok) throw new Error(`API HTTP ${response.status}`);
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "API error");
    return data;
  }
};
