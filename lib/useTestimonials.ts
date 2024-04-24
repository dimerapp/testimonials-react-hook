import { useEffect, useState } from 'react'

type Testimonial = {
  id: number
  authorName: string
  content: string
  authorRole?: string
  authorAvatarUrl?: string
}

export const useTestimonials = (baseUrl: string, groupId: string) => {
  const [data, setData] = useState<{ [id: string]: Testimonial[] }>()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<number>()
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    setIsLoading(true)
    const response = await fetch(`${baseUrl}/api/groups/${groupId}/testimonials`)
    const data = await response.json()
    setStatus(response.status)
    if (response.status === 200) {
      setData({
        [groupId]: data.data
      })
    } else if (response.status > 400) {
      setError(response.statusText)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  return {
    items: data?.[groupId],
    isLoading,
    status,
    error,
    refetch: fetchTestimonials
  }
}