import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySettings() {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'landing_page')
            .single();

        if (error) throw error;
        console.log('--- SUPABASE CONTENT KEYS ---');
        console.log(Object.keys(data.content));
        console.log('--- GLOBAL SETTINGS VALUES ---');
        console.log(JSON.stringify(data.content.GlobalSettings, null, 2));
    } catch (err) {
        console.error('Verification failed:', err);
    }
}

verifySettings();
