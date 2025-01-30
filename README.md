# Azure Policy Generator

A simple tool to generate Azure Policies based on resource naming conventions.

## 🚀 Features
- Add multiple resource types and naming patterns
- Generates Azure Policy JSON format
- Clean UI with Tailwind CSS

## 🛠 Installation

### Backend
1. Go to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend
1. Go to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```

## 📜 Example Naming Pattern
Use a format like:
```
vm-{workload}(max-6)-{env}(3)-{instance}(3)
```
Where:
- `{workload}(max-6)` → Alphanumeric, max 6 chars
- `{env}(3)` → Exactly 3 chars
- `{instance}(3)` → Exactly 3 chars

## 📂 Project Structure
```
azure-naming-enforcer/
│── backend/                     
│   ├── controllers/              
│   │   ├── policyController.js  
│   ├── routes/                  
│   │   ├── policyRoutes.js      
│   ├── utils/                    
│   │   ├── regexConverter.js    
│   │   ├── policyGenerator.js   
│   ├── server.js                
│── frontend/                    
│   ├── public/                  
│   ├── src/                     
│   │   ├── components/          
│   │   │   ├── PolicyViewer.js  
│   │   │   ├── ResourceTable.js 
│   │   ├── App.js               
│   ├── tailwind.config.js       
│   ├── index.css                
│── docker-compose.yml           
│── package.json                  
│── README.md                                      
```

## ⚡ License
MIT License
