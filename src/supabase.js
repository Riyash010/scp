import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ityvfcfvxntlzgocauuj.supabase.co';
const supabaseKey = 'sb_publishable_w_g5N9PBHFYLShzz60Kpdg_ru4R4WS7';

export const supabase = createClient(supabaseUrl, supabaseKey);