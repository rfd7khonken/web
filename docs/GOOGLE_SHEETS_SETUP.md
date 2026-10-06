# Google Sheets / Apps Script Setup

## 1. สร้าง Spreadsheet
สร้าง Google Sheet ใหม่ เช่น `RFD7_DATABASE`

คัดลอก Spreadsheet ID จาก URL:
`https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`

นำไปใส่ใน `Config.gs`

## 2. Apps Script
เปิด:
Extensions > Apps Script

สร้างไฟล์:
- Config.gs
- Database.gs
- Code.gs

คัดลอกโค้ดจากโฟลเดอร์ `google-apps-script`

## 3. สร้างฐานข้อมูล
เลือกฟังก์ชัน `setupDatabase` แล้วกด Run ครั้งแรก

ระบบจะสร้าง:
- Users
- News
- Documents
- ActivityLogs

และสร้าง Admin เริ่มต้น

## 4. Deploy API
Deploy > New deployment > Web app

ตั้งค่า:
- Execute as: Me
- Who has access: Anyone

คัดลอก Web App URL เช่น:
`https://script.google.com/macros/s/XXXXXXXX/exec`

นำไปใส่:
`assets/js/config.js`

## 5. ทดสอบ
เปิด:
`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO/`

จากนั้น Login:
- admin
- ChangeMe123!

## 6. ก่อนใช้งานจริง
- เปลี่ยน password
- จำกัดข้อมูลที่ API เปิดเผย
- เพิ่ม CSRF/CORS policy ตามสถาปัตยกรรมที่เลือก
- เพิ่ม rate limiting
- เพิ่ม token expiry/refresh
- ตรวจสอบสิทธิ์ทุก endpoint
- เพิ่ม audit log ให้ครบ
- ไม่เก็บข้อมูลลับหรือข้อมูลส่วนบุคคลสำคัญในชีตแบบเปิดเผย
