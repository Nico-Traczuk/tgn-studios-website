'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import WriteHeader from './WriteHeader';

export type EditorDraft = {
  originalSlug: string | null;
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  category: string;
  tags: string;
  excerpt: string;
  date: string;
  author: string;
  ctaLabel: string;
  ctaHref: string;
  episode: string;
  replay: string;
  draft: boolean;
  html: string;
};

const COLORS = [
  { name: 'Ink', value: '#3B2921' },
  { name: 'Stone', value: '#6A5A48' },
  { name: 'Clay', value: '#7E4639' },
  { name: 'Olive', value: '#485242' },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .slice(0, 80);
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  list: 'M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01',
  numbered: 'M10 7h10M10 12h10M10 17h10M4 7h2.2M4 7v3.2M6.2 10.2H4M4 14h2.4c.7 0 1.2.5 1.2 1.1S7.1 16.2 6.4 16.2H4.6L6.6 18H4',
  quote: 'M7 17c2.5 0 4-1.6 4-4V7H6v6h3c0 1.2-.8 2-2 2m8 0c2.5 0 4-1.6 4-4V7h-5v6h3c0 1.2-.8 2-2 2',
  link: 'M10 14a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1.3 1.2M14 10a4 4 0 0 0-5.7 0L6 12.3a4 4 0 0 0 5.7 5.7l1.3-1.2',
  image: 'M4 6.5h16v11H4zM4 14.5l4.2-4 3 3 3.3-3.8L20 14M8.8 9.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0',
  table: 'M4 5.5h16v13H4zM4 10h16M4 14.5h16M10 5.5v13M15.5 5.5v13',
};

export default function PostEditor({ writerName, initial }: { writerName: string; initial: EditorDraft }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.originalSlug));
  const [seoTouched, setSeoTouched] = useState(Boolean(initial.originalSlug));
  const [title, setTitle] = useState(initial.title);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [description, setDescription] = useState(initial.description);
  const [slug, setSlug] = useState(initial.slug);
  const [category, setCategory] = useState(initial.category);
  const [tags, setTags] = useState(initial.tags);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [date, setDate] = useState(initial.date);
  const [author, setAuthor] = useState(initial.author);
  const [ctaLabel, setCtaLabel] = useState(initial.ctaLabel);
  const [ctaHref, setCtaHref] = useState(initial.ctaHref);
  const [episode, setEpisode] = useState(initial.episode);
  const [replay, setReplay] = useState(initial.replay);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [savedSlug, setSavedSlug] = useState(initial.originalSlug);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      TextStyle,
      Color,
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: 'Start the article…' }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initial.html,
    editorProps: {
      attributes: {
        class: 'write-editor',
        'aria-label': 'Article body',
      },
    },
  });

  function setLink() {
    if (!editor) return;
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', previous || 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  async function uploadImage(file: File) {
    if (!editor) return;
    const data = new FormData();
    data.set('file', file);
    const response = await fetch('/api/write/upload', { method: 'POST', body: data });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(typeof payload.error === 'string' ? payload.error : 'The image could not be uploaded.');
      return;
    }
    editor.chain().focus().setImage({ src: payload.url, alt: '' }).run();
    setError('');
  }

  async function save(draft: boolean) {
    if (!editor) return;
    setPending(true);
    setError('');
    setStatus('');
    const response = await fetch('/api/write/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalSlug: savedSlug,
        draft,
        title,
        seoTitle,
        description,
        slug: slug.replace(/-+$/g, ''),
        category,
        tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        excerpt,
        date,
        author,
        ctaLabel,
        ctaHref,
        episode,
        replay,
        html: editor.getHTML(),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    setPending(false);
    if (response.status === 401) {
      window.location.href = '/write';
      return;
    }
    if (!response.ok) {
      setError(typeof payload.error === 'string' ? payload.error : 'The post could not be saved.');
      return;
    }
    setSavedSlug(payload.slug);
    setStatus(payload.via === 'github'
      ? 'Saved. The live site updates after the next deploy.'
      : draft ? 'Draft saved.' : 'Published.');
    if (payload.slug && payload.slug !== initial.originalSlug) {
      router.replace(`/write/${payload.slug}`);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="write-desk">
      <WriteHeader name={writerName} />
      <div className="write-editor-page">
        <div className="write-composer">
          <label className="write-title-field">
            <span>Title</span>
            <input
              value={title}
              placeholder="Title"
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);
                if (!slugTouched) setSlug(slugify(value).replace(/-+$/g, ''));
                if (!seoTouched) setSeoTitle(value);
              }}
            />
          </label>

          <div className="write-toolbar" role="toolbar" aria-label="Formatting">
            <button type="button" aria-label="Bold" title="Bold" className={editor?.isActive('bold') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleBold().run()}><b>B</b></button>
            <button type="button" aria-label="Italic" title="Italic" className={editor?.isActive('italic') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleItalic().run()}><i>I</i></button>
            <button type="button" aria-label="Underline" title="Underline" className={editor?.isActive('underline') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></button>
            <button type="button" aria-label="Strikethrough" title="Strikethrough" className={editor?.isActive('strike') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleStrike().run()}><s>S</s></button>
            <span className="write-toolbar-gap" />
            <button type="button" aria-label="Heading" title="Heading" className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
            <button type="button" aria-label="Subheading" title="Subheading" className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
            <span className="write-toolbar-gap" />
            <button type="button" aria-label="Bulleted list" title="Bulleted list" className={editor?.isActive('bulletList') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleBulletList().run()}><Icon d={ICONS.list} /></button>
            <button type="button" aria-label="Numbered list" title="Numbered list" className={editor?.isActive('orderedList') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><Icon d={ICONS.numbered} /></button>
            <button type="button" aria-label="Quote" title="Quote" className={editor?.isActive('blockquote') ? 'is-active' : ''} onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Icon d={ICONS.quote} /></button>
            <span className="write-toolbar-gap" />
            <button type="button" aria-label="Link" title="Link" className={editor?.isActive('link') ? 'is-active' : ''} onClick={setLink}><Icon d={ICONS.link} /></button>
            <button type="button" aria-label="Image" title="Image" onClick={() => fileRef.current?.click()}><Icon d={ICONS.image} /></button>
            <button type="button" aria-label="Table" title="Table" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()}><Icon d={ICONS.table} /></button>
            <span className="write-toolbar-gap" />
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                className="write-swatch"
                style={{ background: color.value }}
                aria-label={`${color.name} text`}
                title={color.name}
                onClick={() => editor?.chain().focus().setColor(color.value).run()}
              />
            ))}
            <button type="button" aria-label="Clear color" title="Clear color" onClick={() => editor?.chain().focus().unsetColor().run()}>A</button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (file) uploadImage(file);
              }}
            />
          </div>

          <EditorContent editor={editor} />

          <div className="write-composer-bar">
            {error ? <p className="write-error">{error}</p> : null}
            {status ? <p className="write-status">{status}</p> : null}
            <div>
              {savedSlug ? <Link href={`/write/preview/${savedSlug}`}>Preview</Link> : null}
              <button type="button" disabled={pending} onClick={() => save(true)}>Save draft</button>
              <button type="button" className="is-primary" disabled={pending} onClick={() => save(false)}>Publish</button>
            </div>
          </div>
        </div>

        <details className="write-details">
          <summary>Post details</summary>
          <div className="write-fields">
            <label>
              Slug
              <input
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugify(event.target.value));
                }}
              />
            </label>
            <label>
              Excerpt
              <textarea value={excerpt} rows={3} onChange={(event) => setExcerpt(event.target.value)} />
            </label>
            <label>
              SEO title
              <input value={seoTitle} onChange={(event) => { setSeoTouched(true); setSeoTitle(event.target.value); }} />
            </label>
            <label>
              Meta description
              <textarea value={description} rows={3} onChange={(event) => setDescription(event.target.value)} />
            </label>
            <div className="write-field-row">
              <label>
                Category
                <input value={category} onChange={(event) => setCategory(event.target.value)} />
              </label>
              <label>
                Date
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
            </div>
            <label>
              Tags
              <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="MVP, User Feedback" />
            </label>
            <label>
              Author
              <input value={author} onChange={(event) => setAuthor(event.target.value)} />
            </label>
            <div className="write-field-row">
              <label>
                Button label
                <input value={ctaLabel} onChange={(event) => setCtaLabel(event.target.value)} />
              </label>
              <label>
                Button link
                <input value={ctaHref} onChange={(event) => setCtaHref(event.target.value)} />
              </label>
            </div>
            <div className="write-field-row">
              <label>
                Episode
                <input value={episode} onChange={(event) => setEpisode(event.target.value)} />
              </label>
              <label>
                Replay link
                <input value={replay} onChange={(event) => setReplay(event.target.value)} />
              </label>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
