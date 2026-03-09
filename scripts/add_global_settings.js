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

async function addGlobalSettings() {
    try {
        console.log('Fetching existing settings...');
        const { data: existing, error: fetchError } = await supabase
            .from('settings')
            .select('content')
            .eq('key', 'landing_page')
            .single();

        if (fetchError) throw fetchError;

        const updatedContent = {
            ...existing.content,
            GlobalSettings: {
                visible: true,
                scrollProgressColor: 'linear-gradient(to right, #14b8a6, #10b981, #0d9488)',
                scrollProgressHeight: '6px'
            }
        };

        console.log('Updating settings with GlobalSettings...');
        const { error: updateError } = await supabase
            .from('settings')
            .upsert({ key: 'landing_page', content: updatedContent }, { onConflict: 'key' });

        if (updateError) throw updateError;
        console.log('✅ GlobalSettings added successfully!');

    } catch (err) {
        console.error('Update failed:', err);
    }
}

addGlobalSettings();
