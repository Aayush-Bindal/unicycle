import { createClient } from '@/utils/supabase/client'

export const signOutUser = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
    return false
  }

  setTimeout(() => {
    window.location.reload()
  }, 500)
  return true
}
