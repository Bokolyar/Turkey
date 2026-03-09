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

        console.log('--- ADMIN TAB ORDER ---');
        console.log(Object.keys(data.content));

        console.log('\n--- HERO BLOCK IMAGE ---');
        console.log(data.content.HeroBlock.bgImage);

        console.log('\n--- EXPERT PICKS HOTELS ---');
        data.content.ExpertPicksBlock.hotels.forEach(h => {
            console.log(`${h.name}: ${h.image}`);
        });

        console.log('\n--- TRUST BLOCK EXPERTS ---');
        data.content.TrustBlock.experts.forEach(e => {
            console.log(`${e.name}: ${e.image}`);
        });

    } catch (err) {
        console.error('Verification failed:', err);
    }
}

verifySettings();
