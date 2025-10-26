'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner' // Import Sonner instead of useToast

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.projectDetails) {
      toast.error('Please fill out all required fields.', {
        style: { background: '#f44336', color: '#fff' },
      })
      setIsSubmitting(false)
      return
    }

    // Placeholder for server-side submission (e.g., API call)
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      console.log('Form submitted:', formData)
      toast.success('Your request has been submitted! We’ll get back to you soon.', {
        style: { background: '#10b981', color: '#fff' },
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        projectDetails: '',
      })
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        style: { background: '#f44336', color: '#fff' },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Request a Free Quote
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-12">
          Tell us about your project, and we’ll provide a tailored quote for your
          design and construction needs.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700"
        >
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="projectType" className="text-sm font-medium">
              Project Type
            </Label>
            <Input
              id="projectType"
              name="projectType"
              type="text"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="e.g., Solid Surface, Alucobond, CNC Cutting"
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="projectDetails" className="text-sm font-medium">
              Project Details *
            </Label>
            <Textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              placeholder="Describe your project (e.g., dimensions, materials, timeline)"
              required
              className="mt-1 rounded-xl min-h-[120px]"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-base py-6"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </div>
    </main>
  )
}