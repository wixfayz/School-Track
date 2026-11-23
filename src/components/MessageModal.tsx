import { FormEvent, useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import { StudentProfile } from '../data/schoolData';

interface MessageModalProps {
  isOpen: boolean;
  student: StudentProfile;
  onClose: () => void;
  onSendMessage: (topic: string, message: string) => void;
}

export function MessageModal({
  isOpen,
  student,
  onClose,
  onSendMessage,
}: MessageModalProps) {
  const [topic, setTopic] = useState('Homework Question');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(topic, message.trim());
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="message-modal-title"
              className="font-display text-xl font-bold text-slate-900"
            >
              Message {student.homeroomTeacher}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Regarding {student.name} · {student.grade} ({student.room})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="message-topic"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Topic
            </label>
            <select
              id="message-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
            >
              <option value="Homework Question">Homework Question</option>
              <option value="Attendance / Pick-Up Note">Attendance / Pick-Up Note</option>
              <option value="Class Progress">Class Progress</option>
              <option value="General Note">General Note</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message-body"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Your Message
            </label>
            <textarea
              id="message-body"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write a quick message about ${student.firstName}...`}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
