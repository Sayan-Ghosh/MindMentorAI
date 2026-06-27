# MindMentor AI 🧠✨

MindMentor AI is an intelligent, highly personalized wellness companion for students facing high-stakes exams. Built for the PromptWar Hackathon, it leverages the power of Google Gemini 2.5 to deeply analyze student journals, identify hidden emotional patterns, and track emotional growth over time. 

Unlike generic chatbots, MindMentor does not act like a conversational AI. It behaves as a deeply analytical mentor that *remembers* your journey.

## 🚀 Features
- **Deep AI Reasoning & Memory:** Retrieves relevant past journals using a dedicated memory service to generate contextual insights.
- **Explainable AI (XAI):** Every score is fully transparent, accompanied by an AI-generated explanation detailing *why* the score was given.
- **Growth Score Tracking:** A unique metric that quantifies your emotional growth based on confidence, stress, and burnout trends.
- **Guided Onboarding:** A beautiful onboarding flow to encourage authentic journaling (no fake mock data used).
- **Personalized Weekly Reports:** Dynamic AI-generated narrative reports celebrating wins, highlighting challenges, and establishing actionable goals.

## 🏗 Architecture
The application follows a strictly modular, production-ready architecture.

- **UI Layer:** Next.js App Router, Tailwind CSS, shadcn/ui.
- **Services Layer:** Modular business logic encapsulating Gemini interactions (`services/gemini.ts`), memory retrieval (`services/memory.ts`), growth scoring (`services/growth-score.service.ts`), and AI JSON parsing (`services/ai-parser.service.ts`).
- **Storage Layer:** Prisma ORM with SQLite (using stringified JSON representations for complex arrays to adhere to SQLite limits).

## 🗂 Folder Structure
```text
/app                # Next.js App Router (Pages, Layouts, API routes)
/components         # Reusable UI components & Dashboard features
/lib                # Constants, prompt templates, and validation schemas
/prisma             # Database schema and SQLite db
/services           # Core business logic (AI, Memory, DB operations)
/tests              # Comprehensive Vitest suite for all core logic
/types              # Shared TypeScript definitions
/utils              # Helper functions (trend analysis, etc.)
```

## 🛠 Tech Stack
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS + shadcn/ui
- **AI/LLM:** Google Gen AI SDK (`gemini-2.5-pro`)
- **Database:** Prisma + SQLite
- **Validation:** Zod + React Hook Form
- **Testing:** Vitest + React Testing Library

## ⚙️ Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables. Create a `.env` file:
   ```env
   GEMINI_API_KEY="your-google-gemini-key"
   DATABASE_URL="file:./dev.db"
   ```
4. Push the schema to generate the database:
   ```bash
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Running Tests
The project features a dedicated testing suite validating all complex business logic, parsing, and memory layer functionality. To run the tests:
```bash
npm run test
```

## 🔮 Future Improvements
- Replace recency-based memory retrieval with Pinecone/Weaviate for vector similarity search.
- Integrate user authentication (NextAuth/Clerk) for multi-tenant support.
- Add real-time push notifications for wellness check-ins.
