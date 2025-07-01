# ⚖️ Wakeel Saab

**Wakeel Saab** is a modern web platform designed to help users easily connect with legal professionals (lawyers). It provides features like lawyer profile browsing, appointment booking, and account management with a beautiful and responsive user interface.

---

## 📸 Preview 

 **LANDING PAGE**
                                              

![Screenshot 2025-07-02 014220](https://github.com/user-attachments/assets/4247bf6b-4ed4-4a05-a9ab-9326bb6e4fa6)


**CHATBOT**


![Screenshot 2025-07-02 014246](https://github.com/user-attachments/assets/6aa8e795-7ad3-4de4-83c0-a11671e4c2b1)


**LAWYER BOOKING**


![Screenshot 2025-07-02 020417](https://github.com/user-attachments/assets/25edf38f-3d09-4034-996f-c23be7eab068)


 **REAL TIME NEWS**
                                            

![Screenshot 2025-07-02 020530](https://github.com/user-attachments/assets/b179242f-d2bb-48ba-b1d3-e8fe21f89bbf)


**DOCUMENTS**

                                                
![Screenshot 2025-07-02 020809](https://github.com/user-attachments/assets/b0d4bc29-6e1f-4097-8f18-0fb2b1bbc322)


**CONTRACT**


![Screenshot 2025-07-02 020821](https://github.com/user-attachments/assets/2b2035e9-be63-42ad-9fef-08aaf1aeae10)


**CLIENT'S DASHBOARD**


![image](https://github.com/user-attachments/assets/c2f80292-4aad-4080-81ec-c5debd88694d)

## 🚀 Features

- 🧑‍⚖️ Browse lawyer profiles
- 📅 Book legal appointments
- 🔒 User authentication (Supabase)
- 📰 Real-time legal and general news (via News API)
- ⚡ Fast, responsive UI using Next.js & Tailwind CSS
- 💬 Clean code structure using components and TypeScript
- 🌐 Built-in API routes (for secure data fetching)
- 🎨 Dark/light theme-ready 


## 📁 Folder Structure (if using Next.js App Router)

Wakeel-Saab/
├── app/ # Main application pages and routes
├── components/ # Reusable React components (e.g., Navbar, Cards)
├── public/ # Static assets (images, icons)
├── styles/ # Global CSS or Tailwind config
├── .env.local # Environment variables (ignored by Git)
├── .gitignore # Files Git should ignore
├── README.md # Project documentation
└── package.json # Project config and dependencies




## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) – for authentication and database
- [Radix UI](https://www.radix-ui.com/) – accessible UI components
- [Lucide Icons](https://lucide.dev/) – beautiful icons



## 📦 Getting Started

Follow these instructions to get a local copy up and running.

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- Git
- npm or yarn



### 🧱 Installation

#### 1. Clone the Repository

git clone https://github.com/Rishi122005/Wakeel-Saab.git
cd Wakeel-Saab

2. Install Dependencies

npm install
or (if using yarn)

yarn install


🔐 3. Create Environment Variables
Create a file named .env.local in the root folder:

touch .env.local
Then open it and paste your keys (these should never be pushed to GitHub):

GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
Make sure .env.local is listed in .gitignore.

▶️ 4. Start the Development Server

npm run dev
Visit http://localhost:3000 in your browser.

📄 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Made by Rishi Raj and Sachin Singh.

