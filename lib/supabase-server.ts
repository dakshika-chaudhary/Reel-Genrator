import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // URL is safe
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // SECRET KEY
);
