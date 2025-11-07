                                                                                             
  # Agrohub Careers Landing App                                                                 
                                                                                                
  Interactive marketing site that lets candidates explore open supermarket roles through an     
  immersive hero scene and submit applications that flow into Google Sheets. Built with Next.js 
  16, React 19, and Tailwind CSS 4, the experience supports light/dark themes, localized        
  Georgian copy, and a polished onboarding animation.                                           
                                                                                                
  ## Key Features                                                                               
                                                                                                
  - **Immersive hero scene** – Job areas (service, bakery, delivery, etc.) render with          
  responsive artwork and tooltips; clicking reveals a modal card with role details and a deep   
  link into the application form.
  - **Application workflow** – Multi-step form validates Georgian names, phone numbers, and     
  city/street choices before POSTing to `/api/application`, which appends rows to a spreadsheet.  - **Theme + animation system** – `ThemeProvider` persists light/dark preference in            
  `localStorage`, while an intro “door” animation controls initial scroll locking.              
  - **Media/data separation** – Role metadata, options, and localized strings live in `src/data`
  and `src/utils`, keeping components lean.                                                     

  ## Tech Stack                                                                                 
                                                                                                
  | Layer            | Details                                   |                              
  | ---------------- | ----------------------------------------- |                              
  | Framework        | Next.js 16 (App Router, React Server Components) |                       
  | UI               | React 19, Tailwind CSS 4, `next/image` asset optimization |              
  | Fonts            | `next/font` (local FiraGO + Google Noto Sans Georgian) |                 
  | Backend bridge   | Next.js Route Handler → Google Sheets API (`googleapis`) |               
  | Tooling          | TypeScript 5, ESLint 9 core-web-vitals config |                          
                                                                                                
  ## Project Structure                                                                          
                                                                                                
                                                                                                
  src/                                                                                          
  app/                                                                                          
  page.tsx               # Landing page                                                         
  application/page.tsx   # Application form route                                               
  api/application/route.ts                                                                      
  components/              # UI building blocks (HeroScene, CardModal, ApplicationForm, etc.)   
  data/                    # heroItems, applicationOptions, dropdown data                       
  lib/                     # Google Sheets client                                               
  utils/                   # Georgian casing helpers                                            
  public/                                                                                       
  media/                   # Scene artwork & cards                                              
  fonts/                   # FiraGO + DejaVu Sans files                                         
                                                                                                
                                                                                                
  ## Prerequisites                                                                              
                                                                                                
  - Node.js 18.18+ (Next.js 16 requirement)                                                     
  - npm 9+ (or pnpm/bun if you prefer, but scripts assume npm)                                  
  - A Google Cloud project with a Service Account that has access to the target spreadsheet.    
                                                                                                
  ## Environment Variables                                                                      
                                                                                                
  Create `.env.local` with the following keys:                                                  
                                                                                                
  | Variable | Description |                                                                    
  | --- | --- |                                                                                 
  | `GOOGLE_SPREADSHEET_ID` | The Sheet ID receiving application rows. |
  | `GOOGLE_SPREADSHEET_RANGE` | Optional. Defaults to `Sheet1!A:G`; override to change the     
  target columns. |                                                                             
  | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service Account email with edit access to the sheet. |     
  | `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Private key string (escape newlines as `\n` in       
  `.env`). |                                                                                    
  | `APPLICATION_TIME_ZONE` | Optional. Defaults to `Asia/Tbilisi`; used when stamping          
  submission timestamps. |                                                                      
                                                                                                
  > Tip: if you plan to expose public config, prefix it with `NEXT_PUBLIC_`. Nothing in this    
  project currently needs client-side env vars.                                                 
                                                                                                
  ## Getting Started                                                                            
                                                                                                
  ```bash                                                                                       
  npm install          # install dependencies                                                   
  npm run dev          # start Next.js dev server at http://localhost:3000                      
  npm run lint         # eslint core-web-vitals rules                                           
  npm run build        # production build (runs next build)                                     
  npm start            # serve production build locally                                         
                                                                                                
  ## Running Locally                                                                            
                                                                                                
  1. Ensure .env.local is populated.                                                            
  2. npm run dev and open http://localhost:3000.                                                
  3. Use the hero cards to trigger the modal and “Apply” button; this navigates to /application 
     with the correct ?card= query parameter.                                                   
  4. Submit the form; check your configured spreadsheet for a new row (timestamp, name, phone,  
     position, schedule, location).                                                             
                                                                                                
  ### Testing / QA Ideas                                                                        
                                                                                                
  There are no automated tests yet. Recommended next steps:                                     
                                                                                                
  - Add integration tests around src/app/api/application/route.ts (e.g., Vitest + MSW or        
    Next.js’ app-router-test-utils).                                                            
  - Snapshot-test the hero scene or modal state transitions with React Testing Library.         
  - Lint + type-check in CI (npm run lint, tsc --noEmit).                                       
                                                                                                
  ## Deployment                                                                                 
                                                                                                
  - Vercel is the easiest path; push to a Git repository and import it in Vercel.               
  - Set the environment variables above in the Vercel dashboard (Project Settings → Environment 
    Variables).                                                                                 
  - Configure the Service Account email as an editor on the target Google Sheet.                
  - Optionally configure an Image Optimization loader if hosting assets on a CDN other than     
    Vercel.                                                                                     
                                                                                                
  ## Maintenance Notes                                                                          
                                                                                                
  - src/data/heroItems.ts and src/data/applicationOptions.ts centralize content; marketing      
    updates usually only touch these files.                                                     
  - New media should go in public/media and imported via module paths; Next’s static import     
    ensures automatic optimization.                                                             
  - Consider trimming public/fonts/Firago to the weights actually used to reduce repo size.     
  - Large intro-door PNGs (~1.2 MB each) can be converted to WebP/AVIF to improve Time To       
    Interactive.                                                                                
                                                                                                
  ## Troubleshooting                                                                            
                                                                                                
  | Symptom | Likely Cause | Fix |                                                              
  | --- | --- | --- |                                                                           
  | “Missing GOOGLE_SPREADSHEET_ID environment variable.” | .env.local not loaded or typo. |    
  Copy .env.local.example (if created) or set the variable in your environment. |               
  | API response 500 with “Failed to submit the form.” | Service Account lacks sheet access or  
  private key format invalid. | Share the sheet with the Service Account and ensure \n sequences  are newline characters. |                                                                     
  | Modal button text shows garbled glyphs. | Missing Georgian font on system. | Confirm        
  @fontsource/dejavu-sans installed and globals.css imports are intact. |                       
                                                                                                
  ———      