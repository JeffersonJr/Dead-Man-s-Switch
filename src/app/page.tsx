import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()

  // Check for session manually if middleware isn't working for some reason
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect('/login')
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }

  // This part should technically not be reached due to redirects
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt">
      <div className="text-center space-y-4">
        <img src="/logo.png" alt="Dharma" className="w-32 h-32 mx-auto grayscale invert animate-pulse" />
        <h1 className="text-2xl font-black tracking-[0.5em] uppercase">Redirecting...</h1>
        <p className="text-[10px] opacity-40 uppercase tracking-widest">Station 3: The Swan</p>
      </div>
    </div>
  )
}
