## 核心功能
* express：Node.js 的 Web 應用框架。
* passport：身份驗證中介層。
* passport-jwt：用於處理 JWT 的 Passport 策略。
* jsonwebtoken：用於簽發與驗證 JWT。
* bcrypt：處理密碼雜湊。
* joi：資料驗證工具。
* multer：處理檔案上傳。

## 專案的主要檔案與資料夾包括：​
* index.js：​應用程式的進入點，設定伺服器與中介軟體。
* config/：​儲存設定檔，如資料庫連線資訊或驗證設定。
* models/：​定義資料模型，與資料庫的結構對應。
* routes/：​定義 API 路由，處理各種 HTTP 請求。​

## 應用場景
* 使用 Passport 與 JWT 實作安全的使用者登入系統。
* 透過 Multer 處理使用者上傳的檔案。
* 利用 Joi 進行嚴謹的輸入資料驗證。
* 建立 RESTful API，處理前端與後端的資料交換。
