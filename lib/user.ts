import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Minimal existence check using Supabase client (docs-style).
 * - Uses select('id').eq('id', userId).limit(1) for a low-cost check.
 * - Returns true when a profile row exists for userId.
 *
 * SECURITY: Only pass user.id obtained from supabase.auth.getUser().
 */
export async function checkUserExistsById(
  supabase: SupabaseClient,
  userId: string
): Promise<boolean> {
  if (!userId) return false

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .limit(1)

  if (error) {
    // Log for observability; return false to be safe.
    console.error('checkUserExistsById error:', error)
    return false
  }
  
  return Array.isArray(data) ? data.length > 0 : false
}
