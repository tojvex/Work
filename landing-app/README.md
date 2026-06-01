                                                                                             
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
                                                                                                
  ### Current Production Setup (cPanel / agrohubjobs.ge)                                        
                                                                                                
  This project is currently deployed on cPanel as a Node.js app using Next.js standalone output.
                                                                                                
  cPanel settings:                                                                              
  - Application root: `agrohubjobs`                                                             
  - Application startup file: `server.js`                                                       
                                                                                                
  Monthly update flow for enabled/disabled positions:                                           
  1. Update `src/data/applicationOptions.ts` and/or `src/data/heroItems.ts`.                   
  2. Run `npm run build` locally.                                                               
  3. Upload the contents of `.next/standalone` so they land directly in `~/agrohubjobs`.       
     The correct result is `~/agrohubjobs/server.js`, not `~/agrohubjobs/landing-app/server.js`.
  4. Upload `.next/static` to `~/agrohubjobs/.next/static`.                                    
  5. Upload `public` to `~/agrohubjobs/public`.                                                 
  6. Restart the existing cPanel Node.js app.                                                   
                                                                                                
  Important notes:                                                                              
  - Do not switch the startup file back to `app.js`.                                            
  - This deployment uses a local build, not `npm run build` on cPanel.                         
  - If you zip files for cPanel upload, zip the contents of `.next/standalone`, not the parent 
    folder.                                                                                     
  - Keep `.next/static` and `public` in sync with each deploy.                                 
  - Do not upload `.env.local`.                                                                 
  - The homepage is forced to render dynamically so a monthly update should return             
    `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`.                   
                                                                                                
  ### Replacing a Stale `.next` Folder                                                          
                                                                                                
  If a normal upload does not update production, stop the cPanel Node.js app and replace        
  `.next` cleanly instead of merging new files into the old folder:                             
                                                                                                
  1. Rename `~/agrohubjobs/.next` to a temporary backup such as                                
     `~/agrohubjobs/.next-before-update`.                                                       
  2. Create a fresh `~/agrohubjobs/.next`.                                                      
  3. Copy the contents of local `.next/standalone/.next` into `~/agrohubjobs/.next`.            
  4. Copy the contents of local `.next/static` into `~/agrohubjobs/.next/static`.               
  5. Copy local `.next/standalone/server.js`, `package.json`, and `node_modules` directly into  
     `~/agrohubjobs`.                                                                           
  6. Restart the cPanel Node.js app and confirm the startup file is still `server.js`.          
  7. Keep the backup folder temporarily until production has been verified.                     
                                                                                                
  `public` can be skipped when its files did not change. If extraction reports permission       
  errors for existing files in `public`, check file ownership with `ls -ld ~/agrohubjobs/public`
  and ask hosting support to restore ownership if needed. Do not use `chmod 777`.               
                                                                                                
  ### Stale Homepage Cache Recovery                                                             
                                                                                                
  A server cache can occasionally keep serving the previous month's homepage after the new     
  standalone build has been uploaded and the Node.js app has been restarted. This was observed  
  on the bare domain while the same deployed build worked with a query string and on the `www`  
  hostname.                                                                                     
                                                                                                
  Check the bare domain and a unique URL from cPanel Terminal:                                  
                                                                                                
  ```bash                                                                                       
  curl -I https://agrohubjobs.ge/                                                               
  URL="https://agrohubjobs.ge/?cachefix=$(date +%s)"                                           
  echo "$URL"                                                                                   
  curl -I "$URL"                                                                                
  curl -I https://www.agrohubjobs.ge/                                                           
  ```                                                                                           
                                                                                                
  A stale root response can include:                                                            
                                                                                                
  ```text                                                                                       
  x-nextjs-cache: HIT                                                                           
  x-nextjs-prerender: 1                                                                         
  cache-control: s-maxage=31536000                                                              
  x-turbo-charged-by: LiteSpeed                                                                 
  ```                                                                                           
                                                                                                
  The corrected dynamic homepage should return:                                                 
                                                                                                
  ```text                                                                                       
  cache-control: private, no-cache, no-store, max-age=0, must-revalidate                        
  ```                                                                                           
                                                                                                
  Try purging the cached bare-domain page:                                                      
                                                                                                
  ```bash                                                                                       
  curl -i -X PURGE https://agrohubjobs.ge/                                                      
  curl -i -X PURGE -H "X-LiteSpeed-Purge: *" https://agrohubjobs.ge/                           
  /usr/local/lsws/admin/misc/purge_cache_by_url -p https://agrohubjobs.ge/                      
  /usr/local/lsws/admin/misc/purge_cache_by_url -r https://agrohubjobs.ge/                      
  ```                                                                                           
                                                                                                
  If the bare domain remains stale but `https://www.agrohubjobs.ge/` returns the correct build, 
  add a cPanel redirect under **Domains** -> **Redirects**:                                      
                                                                                                
  ```text                                                                                       
  Type: Temporary (302)                                                                         
  Domain: agrohubjobs.ge                                                                        
  Redirects to: https://www.agrohubjobs.ge/                                                     
  www option: Do Not Redirect www.                                                              
  Wild Card Redirect: enabled                                                                   
  ```                                                                                           
                                                                                                
  Use `302`, not `301`, while testing. Verify the workaround with:                              
                                                                                                
  ```bash                                                                                       
  curl -I https://agrohubjobs.ge/                                                               
  ```                                                                                           
                                                                                                
  The expected result is `HTTP/1.1 302 Found` with                                              
  `location: https://www.agrohubjobs.ge/`. If the redirect cannot bypass the stale cache,       
  contact hosting support and ask them to purge the nginx reverse-proxy cache for               
  `https://agrohubjobs.ge/`.                                                                     
                                                                                                
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
