'use client' // Error components must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{error.message}</h1>
      <Button className='text-4xl p-8'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        try again
        
      </Button>
    </div>
    </main>
  )
}