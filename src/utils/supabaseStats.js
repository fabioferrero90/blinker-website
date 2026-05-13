/**
 * Wrapper minimale per chiamare la RPC pubblica `get_global_stats` su
 * Supabase. Niente client `@supabase/supabase-js`: aggiungere quella dep
 * (~120KB) per UNA sola POST sarebbe spreco — usiamo fetch nativo.
 *
 * La RPC e' SECURITY DEFINER, espone solo 4 numeri aggregati e ha GRANT
 * EXECUTE per anon. Schema del wrapper allineato a quello della dashboard
 * (`blinker-web-dashboard/src/utils/dbconn/statsFetch.js`) per coerenza
 * cross-progetto.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const RPC_URL = SUPABASE_URL
    ? `${SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/rpc/get_global_stats`
    : null

/**
 * Recupera i conteggi globali (utenti, crew, veicoli, eventi).
 *
 * @param {{ signal?: AbortSignal }} [opts]
 * @returns {Promise<{ users: number, crews: number, vehicles: number, events: number }>}
 */
export async function fetchGlobalStats(opts = {}) {
    if (!RPC_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Supabase env non configurato (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)')
    }

    const res = await fetch(RPC_URL, {
        method: 'POST',
        // Accept singolare: tell PostgREST to return a JSON object instead
        // of a 1-element array. Risparmia un check `Array.isArray` lato client.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.pgrst.object+json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: '{}',
        signal: opts.signal,
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`get_global_stats HTTP ${res.status}: ${text.slice(0, 200)}`)
    }

    const row = await res.json()
    return {
        users: Number(row?.users_count) || 0,
        crews: Number(row?.crews_count) || 0,
        vehicles: Number(row?.vehicles_count) || 0,
        events: Number(row?.events_count) || 0,
    }
}
