'use server'

import { createClient } from '@/utils/supabase/server'

type OnboardingData = {
  username: string
  phone: string
  hostel: string
  room: string
}

/**
 * NEW: Fetches the authenticated user's first name from the session.
 */
export async function getFirstName(): Promise<string> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 'Student' // Fallback

  // Try to get name from metadata
  const fullName = user.user_metadata.full_name || user.user_metadata.name || user.email || ''
  
  // Split by space and take the first part (e.g., "Arjun Kumar" -> "Arjun")
  return fullName.split(' ')[0]
}

export async function checkUsername(username: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()
    return !!data
  } catch (error) {
    console.error('Check Username Error:', error)
    return false // Fail safe
  }
}

export async function completeOnboarding(formData: OnboardingData) {
  try {
    const supabase = await createClient()

    // 1. Get Auth User
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth Error:', authError)
      return { error: 'User not authenticated.' }
    }

    // 2. Safely Extract Metadata (prevent crash if missing)
    const userId = user.id
    const userEmail = user.email
    const meta = user.user_metadata || {} 
    const userName = meta.full_name || meta.name || 'Student'
    const userPhoto = meta.avatar_url || meta.picture || ''

    // 3. Insert Data
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: userEmail,
        name: userName,
        photo_url: userPhoto,
        username: formData.username,
        phone: formData.phone,
        hostel_name: formData.hostel,
        room_number: formData.room,
      })

    if (insertError) {
  console.error('DB Insert Error:', insertError)
  
  if (insertError.code === '23505') {
    // Check specific constraints if known
    if (insertError.message?.includes('username') || insertError.details?.includes('username')) {
      return { error: 'Username is already taken.' }
    }
    if (insertError.message?.includes('phone') || insertError.details?.includes('phone')) {
      return { error: 'Phone number is already registered.' }
    }
  }
  
  return { error: 'Failed to create profile. Please try again.' }
}

    // 4. Success
    return { success: true }

  } catch (error: any) {
    console.error('CRITICAL SERVER ACTION ERROR:', error)
    return { error: error.message || 'Internal Server Error' }
  }
}