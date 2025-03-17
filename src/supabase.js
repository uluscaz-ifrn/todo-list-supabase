import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://seu-projeto.supabase.co';
const supabaseKey = 'sua-chave-anon';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
