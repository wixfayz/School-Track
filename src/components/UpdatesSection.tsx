import { FormEvent, useState } from 'react';
import { Check, MessageSquare, Send } from 'lucide-react';
import { SchoolAnnouncement, StudentProfile } from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface UpdatesSectionProps {
  student: StudentProfile;
  announcements: SchoolAnnouncement[];
  onToggleFeedbackRead: (feedbackId: string) => void;
  onReplyToFeedback: (feedbackId: string, replyText: string) => void;
  onToggleAnnouncementAck: (announcementId: string) => void;
}

export function UpdatesSection({
  student,
  announcements,
  onToggleFeedbackRead,
  onReplyToFeedback,
  onToggleAnnouncementAck,
}: UpdatesSectionProps) {
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const visibleAnnouncements = showUnreadOnly
    ? announcements.filter((a) => !a.acknowledged)
    : announcements;

  const handleReplySubmit = (e: FormEvent, feedbackId: string) => {
    e.preventDefault();
    if (!replyDraft.trim()) return;
    onReplyToFeedback(feedbackId, replyDraft.trim());
    setReplyDraft('');
    setReplyingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Teacher Feedback */}
      <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-5 border-b border-slate-100">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Teacher Feedback
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Daily notes from {student.firstName}’s teachers. You can send a short reply right below any note.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {student.feedback.map((item) => {
            const isReplying = replyingId === item.id;
            return (
              <article key={item.id} className="py-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <SafeImage
                      src={item.teacherAvatar}
                      alt={item.teacherName}
                      fallbackInitials={item.teacherName
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-slate-900">
                        {item.teacherName}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {item.subject} · {item.date}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleFeedbackRead(item.id)}
                    className="text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {item.isRead ? 'Read' : 'Mark as read'}
                  </button>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.message}
                </p>

                {item.parentReply ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 space-y-1">
                    <p className="text-xs font-medium text-slate-500">
                      Your reply · {item.parentReply.sentAt}
                    </p>
                    <p className="text-sm text-slate-800">
                      {item.parentReply.text}
                    </p>
                  </div>
                ) : isReplying ? (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, item.id)}
                    className="space-y-3"
                  >
                    <label htmlFor={`reply-${item.id}`} className="sr-only">
                      Write a reply to {item.teacherName}
                    </label>
                    <textarea
                      id={`reply-${item.id}`}
                      rows={2}
                      required
                      value={replyDraft}
                      onChange={(e) => setReplyDraft(e.target.value)}
                      placeholder="Write a short note back, e.g., Thank you for sharing!"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 resize-none"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        Send Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingId(null);
                          setReplyDraft('');
                        }}
                        className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingId(item.id);
                        setReplyDraft('');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      Reply to teacher
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Right Column: School Announcements */}
      <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              School Announcements
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Upcoming events and reminders from {student.schoolName}.
            </p>
          </div>
        </div>

        <div className="pt-4 pb-2 flex items-center gap-1 p-1 bg-slate-100 rounded-lg mt-4 w-fit">
          <button
            type="button"
            onClick={() => setShowUnreadOnly(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              !showUnreadOnly
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Notices ({announcements.length})
          </button>
          <button
            type="button"
            onClick={() => setShowUnreadOnly(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              showUnreadOnly
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New ({announcements.filter((a) => !a.acknowledged).length})
          </button>
        </div>

        {visibleAnnouncements.length === 0 ? (
          <div className="py-8 text-center space-y-1">
            <p className="text-sm font-semibold text-slate-900">
              You’re all caught up!
            </p>
            <p className="text-xs text-slate-500">
              All school announcements have been noted.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 mt-2">
            {visibleAnnouncements.map((notice) => (
              <article key={notice.id} className="py-5 space-y-2.5">
                <p className="text-xs text-slate-500">
                  {notice.category} · {notice.date}
                </p>
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {notice.title}
                </h3>
                <p className="text-xs font-medium text-blue-700">
                  When: {notice.eventDate}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {notice.summary}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleAnnouncementAck(notice.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      notice.acknowledged
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {notice.acknowledged && (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {notice.acknowledged ? 'Noted' : 'Got it'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
