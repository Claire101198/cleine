import { useState, type FormEvent } from 'react'
import { Loader2, Send, CheckCircle2, AlertTriangle } from 'lucide-react'
import { serviceOptions, preferredContactMethods, type ServiceRequired } from '../data/company'

type FormState = {
  fullName: string
  companyName: string
  email: string
  phone: string
  serviceRequired: ServiceRequired | ''
  projectDescription: string
  preferredContact: (typeof preferredContactMethods)[number] | ''
  // honeypot field: real visitors never fill this in; bots often do
  website: string
}

const initialState: FormState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  serviceRequired: '',
  projectDescription: '',
  preferredContact: '',
  website: '',
}

type Errors = Partial<Record<keyof FormState, string>>

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!PHONE_RE.test(form.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!form.serviceRequired) errors.serviceRequired = 'Select the service you need.'
  if (!form.projectDescription.trim()) {
    errors.projectDescription = 'Tell us a little about the project.'
  } else if (form.projectDescription.trim().length < 10) {
    errors.projectDescription = 'Please add a bit more detail (10+ characters).'
  }
  if (!form.preferredContact) errors.preferredContact = 'Select how we should reach you.'
  return errors
}

/**
 * INTEGRATION POINT
 * -----------------
 * No email backend is wired up by default, so submissions do not go
 * anywhere yet. To connect one, set the matching variable in .env
 * (copy .env.example) and this function will use it automatically:
 *
 *  - Formspree:  VITE_FORMSPREE_ENDPOINT
 *  - EmailJS:    VITE_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY
 *                (install the "emailjs-com" package first)
 *  - Custom API / Resend-backed route: VITE_CONTACT_API_URL
 *
 * If none are set, the form validates normally but reports that it
 * is not yet connected, instead of pretending to send.
 */
async function submitInquiry(form: FormState): Promise<'sent' | 'not-configured'> {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL

  const payload = {
    fullName: form.fullName,
    companyName: form.companyName,
    email: form.email,
    phone: form.phone,
    serviceRequired: form.serviceRequired,
    projectDescription: form.projectDescription,
    preferredContact: form.preferredContact,
  }

  if (formspreeEndpoint) {
    const res = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Formspree request failed')
    return 'sent'
  }

  if (contactApiUrl) {
    const res = await fetch(contactApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Contact API request failed')
    return 'sent'
  }

  // EmailJS would be called here once its client is installed and configured.

  return 'not-configured'
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const field =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Honeypot: if it's filled in, silently drop the submission.
    if (form.website) {
      setStatus('success')
      return
    }

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      const result = await submitInquiry(form)
      if (result === 'sent') {
        setStatus('success')
        setForm(initialState)
      } else {
        setStatus('not-configured')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-sm border border-steel-200 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-steel-400 focus:border-cyan-500'
  const labelClass = 'block text-sm font-medium text-navy-950 mb-1.5'
  const errorClass = 'mt-1 text-xs text-red-600'

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-cyan-600" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-navy-950">Request received</h3>
        <p className="mt-2 text-sm text-steel-500">
          Thank you &mdash; we&rsquo;ll get back to you using the contact method you selected.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'not-configured' && (
        <div className="flex gap-3 rounded-sm border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-navy-950">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <p>
            Your details passed validation, but this form isn&rsquo;t connected to an email
            service yet, so nothing was sent. See{' '}
            <code className="font-mono text-xs bg-white px-1 py-0.5 rounded-sm">.env.example</code>{' '}
            for how to connect Formspree, EmailJS, or a custom endpoint. In the meantime, please
            call or email us directly using the details on this page.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex gap-3 rounded-sm border border-red-400/40 bg-red-50 p-4 text-sm text-navy-950">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
          <p>Something went wrong sending your request. Please try again, or contact us directly.</p>
        </div>
      )}

      {/* Honeypot field — hidden from sighted users, present for bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => field('website')(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-cyan-600">*</span>
          </label>
          <input
            id="fullName"
            className={inputClass}
            value={form.fullName}
            onChange={(e) => field('fullName')(e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass}>
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className={labelClass}>
            Company Name
          </label>
          <input
            id="companyName"
            className={inputClass}
            value={form.companyName}
            onChange={(e) => field('companyName')(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-cyan-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => field('email')(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-cyan-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={form.phone}
            onChange={(e) => field('phone')(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="serviceRequired" className={labelClass}>
          Service Required <span className="text-cyan-600">*</span>
        </label>
        <select
          id="serviceRequired"
          className={inputClass}
          value={form.serviceRequired}
          onChange={(e) => field('serviceRequired')(e.target.value as ServiceRequired)}
          aria-invalid={Boolean(errors.serviceRequired)}
          aria-describedby={errors.serviceRequired ? 'serviceRequired-error' : undefined}
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.serviceRequired && (
          <p id="serviceRequired-error" className={errorClass}>
            {errors.serviceRequired}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="projectDescription" className={labelClass}>
          Project Description <span className="text-cyan-600">*</span>
        </label>
        <textarea
          id="projectDescription"
          rows={4}
          className={inputClass}
          value={form.projectDescription}
          onChange={(e) => field('projectDescription')(e.target.value)}
          aria-invalid={Boolean(errors.projectDescription)}
          aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
        />
        {errors.projectDescription && (
          <p id="projectDescription-error" className={errorClass}>
            {errors.projectDescription}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={labelClass}>
          Preferred Contact Method <span className="text-cyan-600">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {preferredContactMethods.map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm text-navy-950">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={form.preferredContact === method}
                onChange={() => field('preferredContact')(method)}
                className="h-4 w-4 accent-cyan-600"
              />
              {method}
            </label>
          ))}
        </div>
        {errors.preferredContact && <p className={errorClass}>{errors.preferredContact}</p>}
      </fieldset>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-cyan-400 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending&hellip;
          </>
        ) : (
          <>
            Submit Request
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
