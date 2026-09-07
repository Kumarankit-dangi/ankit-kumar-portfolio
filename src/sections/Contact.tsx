import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { SocialLinks } from '@/components/SocialLinks';
import { supabase } from '@/lib/supabase';
import { PROJECT_TYPES, BUDGET_OPTIONS } from '@/types';
import type { ProjectEnquiryInput } from '@/types';

interface ContactProps {
  presetProjectType: string | null;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact({ presetProjectType }: ContactProps) {
  const [form, setForm] = useState<ProjectEnquiryInput>({
    name: '',
    email: '',
    project_type: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Partial<ProjectEnquiryInput>>({});
  const projectTypeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (presetProjectType) {
      setForm((prev) => ({ ...prev, project_type: presetProjectType }));
      setTimeout(() => {
        projectTypeRef.current?.focus();
      }, 500);
    }
  }, [presetProjectType]);

  const validate = (): boolean => {
    const newErrors: Partial<ProjectEnquiryInput> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.project_type) newErrors.project_type = 'Please select a project type';
    if (!form.budget) newErrors.budget = 'Please select a budget range';
    if (!form.message.trim()) {
      newErrors.message = 'Please tell me about your project';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('project_enquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        project_type: form.project_type,
        budget: form.budget,
        message: form.message.trim(),
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', project_type: '', budget: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email me directly.'
      );
    }
  };

  const handleChange = (
    field: keyof ProjectEnquiryInput,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-padding">
        <SectionHeading
          badge="Contact"
          title="Start a Project"
          subtitle="Tell me about your project and I'll get back to you as soon as possible."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 space-y-5">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Let's Talk</h3>
                <p className="text-navy-400 text-sm leading-relaxed">
                  Whether you have a project in mind or just want to say hello, I'd love to hear
                  from you. Fill out the form and I'll respond as soon as I can.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-navy-300">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-500">Email</p>
                    <p className="text-sm text-navy-200">[Your email will be added here]</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-navy-300">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-500">Location</p>
                    <p className="text-sm text-navy-200">India</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-navy-500 mb-3 uppercase tracking-wider">
                  Find me on
                </p>
                <SocialLinks />
              </div>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 sm:p-8 space-y-5"
              noValidate
            >
              {/* Name */}
              <Field label="Name" error={errors.name} required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className="form-input"
                  aria-invalid={!!errors.name}
                />
              </Field>

              {/* Email */}
              <Field label="Email" error={errors.email} required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                  aria-invalid={!!errors.email}
                />
              </Field>

              {/* Project Type + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Project Type" error={errors.project_type} required>
                  <select
                    ref={projectTypeRef}
                    value={form.project_type}
                    onChange={(e) => handleChange('project_type', e.target.value)}
                    className="form-input"
                    aria-invalid={!!errors.project_type}
                  >
                    <option value="">Select type...</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget" error={errors.budget} required>
                  <select
                    value={form.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    className="form-input"
                    aria-invalid={!!errors.budget}
                  >
                    <option value="">Select budget...</option>
                    {BUDGET_OPTIONS.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label="Message" error={errors.message} required>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="form-input resize-none"
                  aria-invalid={!!errors.message}
                />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-lg hover:shadow-accent-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Project Enquiry
                  </>
                )}
              </button>

              {/* Success */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <p className="text-sm text-green-300">
                    Thank you! Your enquiry has been sent. I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {/* Error */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-300">{errorMessage}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-200 mb-2">
        {label}
        {required && <span className="text-accent-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
