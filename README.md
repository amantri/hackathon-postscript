# Postscript

An interactive, After Visit Summary (AVS) application with AI features designed to help patients better understand their health data. Inspired by patient portals like Epic MyChart, Postscript takes the complex medical data from a doctor's visit and presents it in a clear, actionable way.

## Features

- **Interactive AVS Dashboard:** View your diagnoses, medications, vital signs, and upcoming appointments in a clean, easy-to-read interface.
- **AI Chat Assistant:** Ask questions about your health data. Powered by Google Gemini, the assistant provides answers in simple layman's terms.
- **Grounded Medical Advice:** The AI is instructed to base its answers on trusted medical sources to reduce hallucinations and ensure reliability.
- **Graph Database Integration:** Logs chat interactions and relationships in FalkorDB for advanced analytics and relationship mapping.
- **FHIR Compatible Data Structure:** Uses mock data structured similarly to Fast Healthcare Interoperability Resources (FHIR) standards.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google GenAI SDK](https://github.com/google/gemini-ai-node) (Gemini 3.6 Flash)
- **Database:** [FalkorDB](https://falkordb.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Google Gemini API Key
- A FalkorDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd postscript2
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   FALKORDB_URL=redis://localhost:6379 # Or your FalkorDB connection string
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components (Dashboard widgets, AI Chat Modal, etc.).
- `src/lib`: Utility functions, database connection (`falkordb.ts`), and FHIR mock data.
- `src/config`: Configuration files, including the list of trusted medical sources for the AI.

