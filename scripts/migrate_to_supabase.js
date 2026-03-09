import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function migrate() {
    try {
        console.log('Connecting to Supabase...');

        // 1. Initial data from data.json
        const dataPath = path.join(__dirname, '../server/data.json');
        if (!fs.existsSync(dataPath)) {
            console.error('No data.json found at', dataPath);
            return;
        }

        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // 2. We can't run raw CREATE TABLE via the client easily without the SQL API 
        // which isn't available in the standard client. 
        // For now, let's try to upsert. If the table doesn't exist, this will fail.
        // I will assume the user handles table creation or I will try to use a simple approach.

        console.log('Upserting settings to Supabase table "settings"...');
        const { error } = await supabase
            .from('settings')
            .upsert({ key: 'landing_page', content: data }, { onConflict: 'key' });

        if (error) {
            if (error.code === 'PGRST116' || error.message.includes('relation "public.settings" does not exist')) {
                console.error('\nERROR: The table "settings" does not exist in your Supabase project.');
                console.log('Please run this SQL in your Supabase SQL Editor:');
                console.log(`
CREATE TABLE settings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
                `);
            } else {
                throw error;
            }
        } else {
            console.log('✅ Data successfully migrated!');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrate();
