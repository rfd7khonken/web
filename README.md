# RFD7 Website MVP
เว็บไซต์ประชาสัมพันธ์และระบบหลังบ้านสำหรับสำนักจัดการทรัพยากรป่าไม้ที่ 7 (ขอนแก่น)

## Stack
- Frontend: HTML5 + Bootstrap 5 + Vanilla JavaScript
- Hosting: GitHub Pages
- Backend/API: Google Apps Script Web App
- Database: Google Sheets
- File storage (ต่อยอด): Google Drive

## โครงสร้าง
```text
rfd7-website/
├── index.html
├── login.html
├── admin/
│   └── dashboard.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── config.js
│       ├── api.js
│       ├── auth.js
│       ├── main.js
│       └── dashboard.js
├── google-apps-script/
│   ├── Code.gs
│   ├── Config.gs
│   └── Database.gs
└── docs/
    └── GOOGLE_SHEETS_SETUP.md
```

## เริ่มต้น
1. สร้าง Google Sheet ใหม่
2. เปิด Extensions > Apps Script
3. สร้างไฟล์ `Config.gs`, `Database.gs`, `Code.gs` แล้วคัดลอกจากโฟลเดอร์ `google-apps-script/`
4. แก้ `SPREADSHEET_ID` ใน `Config.gs`
5. รัน `setupDatabase()` หนึ่งครั้ง เพื่อสร้างชีตและบัญชี Admin เริ่มต้น
6. Deploy > New deployment > Web app
   - Execute as: Me
   - Who has access: Anyone
7. คัดลอก Web App URL ไปใส่ `assets/js/config.js`
8. Push โปรเจกต์ขึ้น GitHub และเปิด GitHub Pages
9. เปิด `login.html` เพื่อเข้าสู่ระบบ

## บัญชีเริ่มต้น
หลังรัน `setupDatabase()`:
- Username: `admin`
- Password: `ChangeMe123!`

**ต้องเปลี่ยนรหัสผ่านทันทีหลังติดตั้งจริง**

## หมายเหตุความปลอดภัย
MVP นี้ใช้ token ที่ฝั่ง browser และ password hash ด้วย SHA-256 + salt ใน Apps Script เพื่อเป็นจุดเริ่มต้นเท่านั้น สำหรับระบบราชการที่มีข้อมูลสำคัญ ควรเพิ่ม HTTPS-only deployment, token expiration/rotation, rate limiting, audit log, least privilege และพิจารณา Identity Provider/ฐานข้อมูลที่เหมาะสมก่อนใช้งานจริง
