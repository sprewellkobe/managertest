/**
 * Supabase 客户端配置（单例模式）
 */
const SUPABASE_URL = 'https://ixngnqntlfebtirkhjxh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmducW50bGZlYnRpcmtoanhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NzU5NjIsImV4cCI6MjA4ODI1MTk2Mn0.Mobd6oxRVO3QaaJ_9Uu8D-IWbwAFhgptDgsB_EQhzls';

let _supabaseClient = null;

function getSupabase() {
    if (!_supabaseClient) {
        _supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return _supabaseClient;
}
