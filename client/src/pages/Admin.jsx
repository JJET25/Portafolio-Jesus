import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Plus, Save, Trash2, Pencil, X, Check, AlertCircle } from 'lucide-react';

const EMPTY_DRAFT = {
  id: '',
  date: new Date().toISOString().slice(0, 10),
  title: '',
  body: '',
  tags: '',
  mediaType: 'none',
  mediaSrc: '',
  mediaAlt: '',
  linkHref: '',
  linkLabel: '',
};

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'entry';

function toEntry(draft) {
  const tags = draft.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const media =
    draft.mediaType === 'none' || !draft.mediaSrc
      ? null
      : { type: draft.mediaType, src: draft.mediaSrc.trim(), alt: draft.mediaAlt || '' };
  const link =
    draft.linkHref && draft.linkLabel
      ? { href: draft.linkHref.trim(), label: draft.linkLabel.trim() }
      : null;
  const id = draft.id || `${draft.date}-${slugify(draft.title)}`;
  return { id, date: draft.date, title: draft.title.trim(), body: draft.body.trim(), tags, media, link };
}

function fromEntry(e) {
  return {
    id: e.id,
    date: e.date,
    title: e.title,
    body: e.body,
    tags: (e.tags || []).join(', '),
    mediaType: e.media?.type || 'none',
    mediaSrc: e.media?.src || '',
    mediaAlt: e.media?.alt || '',
    linkHref: e.link?.href || '',
    linkLabel: e.link?.label || '',
  };
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [storage, setStorage] = useState(null);

  const [list, setList] = useState([]);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ kind: 'idle', msg: '' });

  useEffect(() => {
    if (!authed) return;
    fetch('/api/updates')
      .then((r) => r.json())
      .then((data) => {
        setList(Array.isArray(data?.updates) ? data.updates : []);
        setStorage(data?.storage || null);
      })
      .catch(() => setStatus({ kind: 'error', msg: 'Failed to load updates.' }));
  }, [authed]);

  const login = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unauthorized');
      }
      setAuthed(true);
    } catch (err) {
      setAuthError(err.message || 'Login failed.');
    }
  };

  const save = async (nextList, successMsg) => {
    setStatus({ kind: 'loading', msg: '' });
    try {
      const res = await fetch('/api/updates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ updates: nextList }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Save failed');
      }
      const data = await res.json();
      setList(data.updates);
      setStorage(data.storage || storage);
      setStatus({ kind: 'success', msg: successMsg });
    } catch (err) {
      setStatus({ kind: 'error', msg: err.message || 'Save failed.' });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.body.trim()) {
      setStatus({ kind: 'error', msg: 'Title and body are required.' });
      return;
    }
    const entry = toEntry(draft);
    const next = editingId
      ? list.map((x) => (x.id === editingId ? { ...entry, id: editingId } : x))
      : [entry, ...list.filter((x) => x.id !== entry.id)];
    await save(next, editingId ? 'Entry updated.' : 'Entry added.');
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
  };

  const onEdit = (entry) => {
    setDraft(fromEntry(entry));
    setEditingId(entry.id);
    setStatus({ kind: 'idle', msg: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return;
    const next = list.filter((x) => x.id !== id);
    await save(next, 'Entry deleted.');
    if (editingId === id) {
      setDraft(EMPTY_DRAFT);
      setEditingId(null);
    }
  };

  const resetDraft = () => {
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
    setStatus({ kind: 'idle', msg: '' });
  };

  if (!authed) {
    return (
      <main className="pt-32 md:pt-40 pb-28">
        <div className="container-content max-w-md">
          <Link
            to="/updates"
            className="inline-flex items-center gap-2 text-sm muted hover:text-ink-light-primary dark:hover:text-ink-dark-primary"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to updates
          </Link>

          <header className="mt-10">
            <p className="section-eyebrow section-eyebrow-dot mb-4">Admin</p>
            <h1 className="display text-4xl md:text-5xl">Sign in to manage updates.</h1>
          </header>

          <form onSubmit={login} className="card bg-bg-light-secondary dark:bg-bg-dark-secondary mt-10 space-y-5">
            <label htmlFor="password" className="block text-sm font-medium">
              <Lock className="inline mr-1.5 -mt-0.5" size={14} aria-hidden="true" /> Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-4 py-3 text-base outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary transition-colors"
            />
            {authError && (
              <p role="alert" className="text-sm text-red-500">
                <AlertCircle className="inline mr-1 -mt-0.5" size={14} aria-hidden="true" />
                {authError}
              </p>
            )}
            <button type="submit" className="btn-primary w-full">
              Continue
            </button>
            <p className="text-xs muted">
              Set <code className="font-mono text-[11px] bg-bg-light dark:bg-bg-dark px-1.5 py-0.5 rounded border border-edge-light dark:border-edge-dark">ADMIN_PASSWORD</code>{' '}
              as an environment variable (locally and on Vercel).
            </p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 md:pt-40 pb-28">
      <div className="container-content">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link
            to="/updates"
            className="inline-flex items-center gap-2 text-sm muted hover:text-ink-light-primary dark:hover:text-ink-dark-primary"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to updates
          </Link>
          {storage && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] muted">
              Storage · {storage}
              {storage === 'memory' && ' (non-persistent — add Vercel KV to persist)'}
            </span>
          )}
        </div>

        <header className="mt-8">
          <p className="section-eyebrow section-eyebrow-dot mb-4">Admin</p>
          <h1 className="display text-4xl md:text-5xl">Dev log admin.</h1>
          <p className="mt-4 muted">Add, edit, or remove updates. Changes appear live on /updates.</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <section className="lg:col-span-2">
            <div className="card bg-bg-light-secondary dark:bg-bg-dark-secondary">
              <h2 className="text-xl font-semibold tracking-tight">
                {editingId ? 'Edit entry' : 'New entry'}
              </h2>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">Title</label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                      required
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">Date</label>
                    <input
                      type="date"
                      value={draft.date}
                      onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                      required
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider muted mb-1.5">Body</label>
                  <textarea
                    value={draft.body}
                    onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider muted mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. gummy-blast, milestone"
                    value={draft.tags}
                    onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
                    className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">Media</label>
                    <select
                      value={draft.mediaType}
                      onChange={(e) => setDraft((d) => ({ ...d, mediaType: e.target.value }))}
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                    >
                      <option value="none">None</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">
                      Media URL
                    </label>
                    <input
                      type="url"
                      placeholder="/updates/thing.jpg or https://…"
                      value={draft.mediaSrc}
                      onChange={(e) => setDraft((d) => ({ ...d, mediaSrc: e.target.value }))}
                      disabled={draft.mediaType === 'none'}
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">
                      External link URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://…"
                      value={draft.linkHref}
                      onChange={(e) => setDraft((d) => ({ ...d, linkHref: e.target.value }))}
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider muted mb-1.5">
                      Link label
                    </label>
                    <input
                      type="text"
                      placeholder="See it live"
                      value={draft.linkLabel}
                      onChange={(e) => setDraft((d) => ({ ...d, linkLabel: e.target.value }))}
                      className="w-full rounded-lg border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-3 py-2 text-sm outline-none focus:border-ink-light-primary dark:focus:border-ink-dark-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button type="submit" disabled={status.kind === 'loading'} className="btn-primary flex-1">
                    {editingId ? <Save size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
                    {status.kind === 'loading' ? 'Saving…' : editingId ? 'Save changes' : 'Add entry'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetDraft} className="btn-ghost">
                      <X size={14} aria-hidden="true" /> Cancel
                    </button>
                  )}
                </div>

                {status.kind === 'success' && (
                  <p role="status" className="text-sm text-accent-hover">
                    <Check className="inline mr-1 -mt-0.5" size={14} aria-hidden="true" />
                    {status.msg}
                  </p>
                )}
                {status.kind === 'error' && (
                  <p role="alert" className="text-sm text-red-500">
                    <AlertCircle className="inline mr-1 -mt-0.5" size={14} aria-hidden="true" />
                    {status.msg}
                  </p>
                )}
              </form>
            </div>
          </section>

          <section className="lg:col-span-3">
            <h2 className="text-xl font-semibold tracking-tight mb-6">Entries ({list.length})</h2>
            {list.length === 0 ? (
              <p className="muted text-sm">No entries yet. Add one on the left.</p>
            ) : (
              <ul className="space-y-4">
                {list
                  .slice()
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  .map((e) => (
                    <li
                      key={e.id}
                      className="card bg-bg-light-secondary dark:bg-bg-dark-secondary flex items-start gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <time
                          dateTime={e.date}
                          className="font-mono text-[10px] uppercase tracking-[0.2em] muted"
                        >
                          {e.date}
                        </time>
                        <h3 className="mt-1 font-semibold tracking-tight text-lg leading-snug">
                          {e.title}
                        </h3>
                        <p className="mt-1 text-sm muted line-clamp-2">{e.body}</p>
                        {e.tags?.length > 0 && (
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {e.tags.map((t) => (
                              <li key={t} className="pill">
                                #{t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(e)}
                          className="icon-btn"
                          aria-label={`Edit ${e.title}`}
                        >
                          <Pencil size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(e.id)}
                          className="icon-btn hover:!border-red-500 hover:!text-red-500"
                          aria-label={`Delete ${e.title}`}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
