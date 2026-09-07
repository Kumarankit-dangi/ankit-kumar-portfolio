import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut,
  Mail,
  Trash2,
  Inbox,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ENQUIRY_STATUSES } from '@/types';
import type { ProjectEnquiry, EnquiryStatus } from '@/types';

interface AdminDashboardProps {
  onSignOut: () => void;
}

type LoadState = 'loading' | 'success' | 'error';

export function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ProjectEnquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoadState('loading');
    try {
      const { data, error } = await supabase
        .from('project_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEnquiries((data as ProjectEnquiry[]) || []);
      setLoadState('success');
    } catch (err) {
      setLoadState('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to load enquiries.'
      );
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('project_enquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to update enquiry status.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('project_enquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to delete enquiry.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSignOut();
  };

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="section-padding py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-bold text-lg">
              AK
            </span>
            <div>
              <h1 className="text-white font-semibold">Admin Dashboard</h1>
              <p className="text-navy-500 text-xs">Project Enquiries</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-300 hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="section-padding py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            icon={<Inbox className="w-5 h-5" />}
            label="Total Enquiries"
            value={totalEnquiries}
            color="accent"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="New Enquiries"
            value={newEnquiries}
            color="green"
          />
        </div>

        {/* Error banner */}
        {loadState === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-300">{errorMessage}</p>
          </div>
        )}

        {/* Enquiries table */}
        {loadState === 'loading' ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-400" />
          </div>
        ) : loadState === 'success' && enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Inbox className="w-12 h-12 text-navy-600 mb-4" />
            <p className="text-navy-400 text-lg">No enquiries yet.</p>
            <p className="text-navy-600 text-sm mt-1">
              New project enquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Email</th>
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Project Type</th>
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Budget</th>
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Date</th>
                    <th className="text-left text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-right text-xs font-medium text-navy-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="text-sm font-medium text-white hover:text-accent-300 transition-colors text-left"
                        >
                          {enquiry.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-300">{enquiry.email}</td>
                      <td className="px-6 py-4 text-sm text-navy-300">{enquiry.project_type}</td>
                      <td className="px-6 py-4 text-sm text-navy-300">{enquiry.budget}</td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <StatusSelect
                          value={enquiry.status}
                          onChange={(status) => handleStatusChange(enquiry.id, status)}
                          disabled={updatingId === enquiry.id}
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="p-2 text-navy-400 hover:text-accent-400 hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="View enquiry"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(enquiry.id)}
                            disabled={deletingId === enquiry.id}
                            className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            aria-label="Delete enquiry"
                          >
                            {deletingId === enquiry.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-white/5">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="text-sm font-medium text-white hover:text-accent-300 transition-colors text-left"
                      >
                        {enquiry.name}
                      </button>
                      <p className="text-xs text-navy-400 mt-0.5">{enquiry.email}</p>
                    </div>
                    <span className="text-xs text-navy-500">
                      {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-navy-300">{enquiry.project_type}</span>
                    <span className="text-navy-600">•</span>
                    <span className="text-navy-300">{enquiry.budget}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <StatusSelect
                      value={enquiry.status}
                      onChange={(status) => handleStatusChange(enquiry.id, status)}
                      disabled={updatingId === enquiry.id}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-2 text-navy-400 hover:text-accent-400 hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="View enquiry"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(enquiry.id)}
                        disabled={deletingId === enquiry.id}
                        className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        aria-label="Delete enquiry"
                      >
                        {deletingId === enquiry.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Enquiry detail modal */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onStatusChange={(status) => handleStatusChange(selectedEnquiry.id, status)}
          onDelete={() => handleDelete(selectedEnquiry.id)}
          updating={updatingId === selectedEnquiry.id}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'accent' | 'green';
}) {
  const colorClasses = {
    accent: 'bg-accent-500/10 text-accent-400',
    green: 'bg-green-500/10 text-green-400',
  };

  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-navy-400">{label}</p>
      </div>
    </div>
  );
}

function StatusSelect({
  value,
  onChange,
  disabled,
}: {
  value: EnquiryStatus;
  onChange: (status: EnquiryStatus) => void;
  disabled?: boolean;
}) {
  const statusColors: Record<EnquiryStatus, string> = {
    New: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    Contacted: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
    Completed: 'text-green-300 bg-green-500/10 border-green-500/20',
    Archived: 'text-navy-300 bg-white/5 border-white/10',
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as EnquiryStatus)}
      disabled={disabled}
      className={`text-xs font-medium px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500/20 disabled:opacity-50 ${statusColors[value]}`}
    >
      {ENQUIRY_STATUSES.map((status) => (
        <option key={status} value={status} className="bg-navy-900 text-white">
          {status}
        </option>
      ))}
    </select>
  );
}

function EnquiryDetailModal({
  enquiry,
  onClose,
  onStatusChange,
  onDelete,
  updating,
}: {
  enquiry: ProjectEnquiry;
  onClose: () => void;
  onStatusChange: (status: EnquiryStatus) => void;
  onDelete: () => void;
  updating: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-navy-900 border border-white/10 rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Enquiry Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-navy-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <DetailRow label="Name" value={enquiry.name} />
          <DetailRow label="Email" value={enquiry.email} />
          <DetailRow label="Project Type" value={enquiry.project_type} />
          <DetailRow label="Budget" value={enquiry.budget} />
          <DetailRow
            label="Date"
            value={new Date(enquiry.created_at).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
          <div>
            <p className="text-xs text-navy-500 uppercase tracking-wider mb-2">Message</p>
            <div className="p-4 bg-navy-950/50 rounded-xl text-sm text-navy-200 leading-relaxed">
              {enquiry.message}
            </div>
          </div>
          <div>
            <p className="text-xs text-navy-500 uppercase tracking-wider mb-2">Status</p>
            <StatusSelect
              value={enquiry.status}
              onChange={onStatusChange}
              disabled={updating}
            />
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-between">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-navy-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-navy-200">{value}</p>
    </div>
  );
}
