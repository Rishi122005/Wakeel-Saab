import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqoebxajtauhwehpksje.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxb2VieGFqdGF1aHdlaHBrc2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDM0ODcsImV4cCI6MjA2NjE3OTQ4N30.Vcz7ldWU_ULbiC7CQVBeDi0cmXQhXJ7_4CTy8Ro_T3Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
