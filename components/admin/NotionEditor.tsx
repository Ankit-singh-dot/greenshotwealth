"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ToastContainer, ToastMessage } from "@/components/ui/NotificationModal";

export interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  type: string;
  author: string;
  authorRole: string;
  readTime: string;
  published: boolean;
  featured: boolean;
}

interface NotionEditorProps {
  initialData?: Partial<BlogFormData>;
  onSave: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

const CATEGORIES = [
  "Investing",
  "Wealth Architecture",
  "Global & GIFT City",
  "Women & Wealth",
  "Tax Planning",
  "Retirement & Protection",
  "Market Perspectives",
];

export default function NotionEditor({
  initialData,
  onSave,
  onCancel,
  saving,
}: NotionEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || "/img_insights_1.jpg"
  );
  const [category, setCategory] = useState(initialData?.category || "Investing");
  const [postType, setPostType] = useState(initialData?.type || "BLOG");
  const [author, setAuthor] = useState(initialData?.author || "Saloni Mehta");
  const [authorRole, setAuthorRole] = useState(
    initialData?.authorRole || "Founder & Wealth Architect"
  );
  const [published, setPublished] = useState(
    initialData?.published !== undefined ? initialData.published : true
  );
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [activeView, setActiveView] = useState<"write" | "preview" | "split">(
    "write"
  );

  // Content editable state
  const editorRef = useRef<HTMLDivElement>(null);
  const [contentHtml, setContentHtml] = useState(
    initialData?.content ||
      `<h2>Why Strategic Patience Defines Lasting Wealth</h2><p>In a world captivated by rapid market fluctuations, enduring financial resilience is rarely forged in haste. It is the result of continuous, disciplined execution over long horizons.</p><div class="notion-callout">💡 <strong>Core Wealth Principle:</strong> The market is a device for transferring wealth from the impatient to the patient. Knowing what you own is the first line of defense.</div><h3>1. Clarifying Your Underlying Asset Architecture</h3><p>Every allocation must serve a measurable purpose—whether that is liquidity preservation, tax shielding via GIFT City, or long-term compounding through diversified equity.</p><blockquote>"Wealth is not about how much you make, but how thoughtfully you shelter and deploy what you retain."</blockquote>`
  );

  // Link modal state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const savedSelection = useRef<Range | null>(null);

  // Cover image modal state
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [coverUrlInput, setCoverUrlInput] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  // In-app Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: "success" | "error" | "info" = "info", title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Auto-slugify title if slug wasn't manually typed
  const [slugManual, setSlugManual] = useState(Boolean(initialData?.slug));
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);
      setSlug(generated);
    }
  };

  // Sync contentHtml into contentEditable on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== contentHtml) {
      editorRef.current.innerHTML = contentHtml;
    }
  }, []); // Only once on mount

  // Sync back from contentEditable
  const handleEditorInput = () => {
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  // Word count & read time
  const stats = useCallback(() => {
    const text = contentHtml.replace(/<[^>]+>/g, " ").trim();
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, readTime: `${minutes} min read` };
  }, [contentHtml]);

  // Execute formatting commands with execCommand or block insertion
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  // Insert a custom block HTML at cursor position
  const insertBlockHtml = (htmlString: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = htmlString;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else {
      editorRef.current.innerHTML += htmlString;
    }
    handleEditorInput();
  };

  // Insert Notion-style Heading
  const insertHeading = (level: "h1" | "h2" | "h3") => {
    execCmd("formatBlock", `<${level}>`);
  };

  // Insert Callout Box
  const insertCallout = (type: "insight" | "warning" | "note") => {
    const icons = {
      insight: "💡",
      warning: "⚠️",
      note: "📌",
    };
    const html = `<div class="notion-callout">${icons[type]} <strong>Key Takeaway:</strong> Add your important financial insight or rule here.</div><p><br></p>`;
    insertBlockHtml(html);
  };

  // Insert Blockquote
  const insertQuote = () => {
    const html = `<blockquote>"Your thoughtful quote or financial philosophy goes here."</blockquote><p><br></p>`;
    insertBlockHtml(html);
  };

  // Insert Divider
  const insertDivider = () => {
    const html = `<hr class="notion-hr" /><p><br></p>`;
    insertBlockHtml(html);
  };

  // Open Link Modal
  const openLinkModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
      setLinkText(sel.toString());
    }
    setShowLinkModal(true);
  };

  // Apply Link
  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) return;

    if (savedSelection.current && editorRef.current) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(savedSelection.current);

      let formattedUrl = linkUrl.trim();
      if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://") && !formattedUrl.startsWith("/")) {
        formattedUrl = `https://${formattedUrl}`;
      }

      if (linkText && savedSelection.current.collapsed) {
        insertBlockHtml(`<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
      } else {
        execCmd("createLink", formattedUrl);
      }
    }
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  // Client-side image compressor (browser canvas - zero server disk dependence)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target?.result as string;
        img.onload = () => {
          const maxWidth = 1600;
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = () => resolve(event.target?.result as string);
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Handle Cover Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      // 1. Immediately compress client-side
      const compressedDataUrl = await compressImage(file);
      if (compressedDataUrl) {
        setCoverImage(compressedDataUrl);
        setShowCoverModal(false);
        addToast("Cover image processed and attached!", "success", "Cover Ready");
      } else {
        // Fallback to API upload
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setCoverImage(data.url);
          setShowCoverModal(false);
          addToast("Cover image attached successfully!", "success", "Cover Updated");
        } else {
          addToast(data.error || "Failed to process image.", "error", "Upload Failed");
        }
      }
    } catch (err) {
      console.error("Cover upload error:", err);
      addToast("Error processing image file.", "error", "Upload Error");
    } finally {
      setUploadingCover(false);
    }
  };

  // Save handler
  const handleSubmit = async (isPub = published) => {
    if (!title.trim()) {
      addToast("Please enter a title for your blog post before saving.", "error", "Title Required");
      return;
    }

    const { readTime } = stats();
    await onSave({
      id: initialData?.id,
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: contentHtml,
      coverImage: coverImage.trim(),
      category: category.trim(),
      type: postType,
      author: author.trim(),
      authorRole: authorRole.trim(),
      readTime,
      published: isPub,
      featured,
    });
  };

  return (
    <div className="w-full bg-[#fcfaf7] min-h-screen text-[#1F3A2C] font-sans pb-24">
      {/* 1. TOP STICKY CONTROL BAR */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5dfd3] px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 text-sm flex items-center gap-1 transition-colors"
          >
            ← <span className="hidden sm:inline">Back</span>
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1 text-xs">
            <span className="font-semibold text-[#1F3A2C]">
              {initialData?.id ? "Edit Post" : "New Post"}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{stats().readTime}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{stats().words} words</span>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-[#f0ede6] rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveView("write")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeView === "write"
                  ? "bg-white text-[#1F3A2C] shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveView("preview")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeView === "preview"
                  ? "bg-white text-[#1F3A2C] shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveView("split")}
              className={`hidden md:inline px-3 py-1 rounded-md transition-all ${
                activeView === "split"
                  ? "bg-white text-[#1F3A2C] shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Split View
            </button>
          </div>

          {/* Draft Button */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(false)}
            className="px-3.5 py-1.5 rounded-lg border border-[#ded8cb] hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Save Draft
          </button>

          {/* Publish Button */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(true)}
            className="px-4 py-1.5 rounded-lg bg-[#1F3A2C] hover:bg-[#14281e] disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>{saving ? "Publishing..." : "Publish Post"}</span>
            <span>↗</span>
          </button>
        </div>
      </div>

      {/* 2. NOTION FORMATTING TOOLBAR */}
      <div className="sticky top-[53px] z-20 bg-[#FAF7F2] border-b border-[#e8e2d4] px-4 sm:px-8 py-2 overflow-x-auto flex items-center gap-1 text-xs">
        {/* Headings */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#e0dad0]">
          <button
            type="button"
            onClick={() => insertHeading("h1")}
            className="px-2.5 py-1 rounded hover:bg-white text-gray-700 font-bold transition-colors"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertHeading("h2")}
            className="px-2.5 py-1 rounded hover:bg-white text-gray-700 font-semibold transition-colors"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertHeading("h3")}
            className="px-2.5 py-1 rounded hover:bg-white text-gray-700 font-medium transition-colors"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<p>")}
            className="px-2.5 py-1 rounded hover:bg-white text-gray-700 transition-colors"
            title="Regular Text"
          >
            ¶
          </button>
        </div>

        {/* Text Styles */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[#e0dad0]">
          <button
            type="button"
            onClick={() => execCmd("bold")}
            className="w-7 h-7 rounded hover:bg-white font-bold flex items-center justify-center text-gray-700 transition-colors"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCmd("italic")}
            className="w-7 h-7 rounded hover:bg-white italic flex items-center justify-center text-gray-700 transition-colors"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCmd("underline")}
            className="w-7 h-7 rounded hover:bg-white underline flex items-center justify-center text-gray-700 transition-colors"
            title="Underline"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => execCmd("strikeThrough")}
            className="w-7 h-7 rounded hover:bg-white line-through flex items-center justify-center text-gray-700 transition-colors"
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Lists & Notion Blocks */}
        <div className="flex items-center gap-1 px-2 border-r border-[#e0dad0]">
          <button
            type="button"
            onClick={() => execCmd("insertUnorderedList")}
            className="px-2 py-1 rounded hover:bg-white text-gray-700 flex items-center gap-1 transition-colors"
            title="Bulleted List"
          >
            <span>• List</span>
          </button>
          <button
            type="button"
            onClick={() => execCmd("insertOrderedList")}
            className="px-2 py-1 rounded hover:bg-white text-gray-700 flex items-center gap-1 transition-colors"
            title="Numbered List"
          >
            <span>1. List</span>
          </button>
          <button
            type="button"
            onClick={insertQuote}
            className="px-2 py-1 rounded hover:bg-white text-gray-700 flex items-center gap-1 transition-colors"
            title="Editorial Quote"
          >
            <span>&ldquo; Quote</span>
          </button>
          <button
            type="button"
            onClick={() => insertCallout("insight")}
            className="px-2 py-1 rounded hover:bg-white text-gray-700 flex items-center gap-1 transition-colors"
            title="Notion Callout Box"
          >
            <span>💡 Callout</span>
          </button>
          <button
            type="button"
            onClick={insertDivider}
            className="px-2 py-1 rounded hover:bg-white text-gray-700 transition-colors"
            title="Horizontal Divider"
          >
            ― Divider
          </button>
        </div>

        {/* Links & Quick Inserts */}
        <div className="flex items-center gap-1 pl-2">
          <button
            type="button"
            onClick={openLinkModal}
            className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-[#ded8cb] text-[#1F3A2C] font-medium flex items-center gap-1 transition-colors shadow-2xs"
            title="Insert Link"
          >
            <span>🔗 Add Link</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCoverModal(true)}
            className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-[#ded8cb] text-[#1F3A2C] font-medium flex items-center gap-1 transition-colors shadow-2xs"
            title="Change Cover Banner"
          >
            <span>🖼️ Cover</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN EDITOR CANVAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className={`grid gap-8 ${
            activeView === "split"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {/* LEFT: WRITER CANVAS */}
          {(activeView === "write" || activeView === "split") && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e5dfd3] shadow-sm space-y-6">
              {/* Cover Image Preview & Banner */}
              <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-neutral-100 group border border-[#e5dfd3]">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    unoptimized={Boolean(coverImage?.startsWith("data:") || coverImage?.startsWith("http"))}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Cover Image Selected
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCoverModal(true)}
                    className="px-3 py-1.5 bg-white text-[#1F3A2C] text-xs font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    Change Cover
                  </button>
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg shadow-md hover:bg-rose-700 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Document Meta Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs text-[#1F3A2C] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Content Type
                  </label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs text-[#1F3A2C] focus:outline-none"
                  >
                    <option value="BLOG">Blog Post</option>
                    <option value="ARTICLE">In-depth Article</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Featured
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded accent-[#1F3A2C]"
                    />
                    <span>Highlight at Top</span>
                  </label>
                </div>
              </div>

              {/* Title Input (H1 Notion Style) */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Untitled Document..."
                  className="w-full font-serif text-3xl sm:text-4xl text-[#1F3A2C] placeholder:text-gray-300 font-normal focus:outline-none border-b border-transparent focus:border-[#ded8cb] pb-2 leading-tight"
                />
              </div>

              {/* Excerpt / Subtitle */}
              <div>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Add an executive summary or subtitle (shown on article cards and search engines)..."
                  className="w-full p-3 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs text-[#495c51] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1F3A2C] leading-relaxed resize-none"
                />
              </div>

              {/* URL Slug */}
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#f7f5ef] p-2.5 rounded-xl border border-[#ded8cb]">
                <span className="font-mono text-gray-400 shrink-0">/insights/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="post-url-slug"
                  className="w-full bg-transparent font-mono text-xs text-[#1F3A2C] focus:outline-none"
                />
              </div>

              {/* NOTION CONTENT-EDITABLE CANVAS */}
              <div className="pt-2">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Document Body (Notion Canvas)
                </label>
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  suppressContentEditableWarning
                  className="notion-editor-canvas min-h-[420px] p-6 rounded-2xl border border-[#ded8cb] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C]/20 text-[#243d30] font-sans text-base leading-relaxed space-y-4"
                />
              </div>
            </div>
          )}

          {/* RIGHT: LIVE PREVIEW CANVAS */}
          {(activeView === "preview" || activeView === "split") && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e5dfd3] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#bda15f]">
                  Live Reader Preview
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF0D9] text-[#1F3A2C] font-semibold">
                  {postType}
                </span>
              </div>

              {/* Cover */}
              {coverImage && (
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xs">
                  <Image
                    src={coverImage}
                    alt={title}
                    fill
                    unoptimized={Boolean(coverImage?.startsWith("data:") || coverImage?.startsWith("http"))}
                    className="object-cover"
                  />
                </div>
              )}

              {/* Title & Metadata */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8fa868]">
                  {category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1F3A2C] font-normal leading-tight">
                  {title || "Untitled Document"}
                </h1>
                {excerpt && (
                  <p className="text-sm text-[#5d7064] italic font-sans leading-relaxed">
                    {excerpt}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2 text-xs text-gray-500 border-t border-gray-100">
                  <span className="font-semibold text-[#1F3A2C]">{author}</span>
                  <span>·</span>
                  <span>{new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>·</span>
                  <span>{stats().readTime}</span>
                </div>
              </div>

              {/* Formatted Content Render */}
              <div
                className="notion-rendered-content pt-4 border-t border-gray-100 space-y-4 text-sm sm:text-base text-[#2c4236] leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. MODAL: INSERT LINK */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-[#ded8cb]">
            <h3 className="font-serif text-lg text-[#1F3A2C]">Attach Hyperlink</h3>
            <form onSubmit={handleApplyLink} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Anchor Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Visit GIFT City Portal"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/report"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1F3A2C] text-xs text-white font-medium shadow-xs"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: COVER IMAGE */}
      {showCoverModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#ded8cb]">
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-lg text-[#1F3A2C]">Set Cover Image</h3>
              <button
                onClick={() => setShowCoverModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option A: Upload File */}
              <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-[#1F3A2C] transition-colors">
                <label className="cursor-pointer block">
                  <span className="text-gray-500 block mb-1">
                    {uploadingCover ? "Uploading file..." : "Upload image from computer"}
                  </span>
                  <span className="text-[11px] text-gray-400 block mb-2">
                    JPG, PNG, WebP up to 5MB
                  </span>
                  <span className="px-3 py-1.5 bg-[#1F3A2C] text-white rounded-lg font-medium inline-block shadow-xs">
                    Choose File
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingCover}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option B: Direct URL */}
              <div>
                <label className="block text-gray-600 mb-1 font-medium">
                  Or Paste Image URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverUrlInput}
                    onChange={(e) => setCoverUrlInput(e.target.value)}
                    placeholder="https://... or /img_insights_1.jpg"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (coverUrlInput.trim()) {
                        setCoverImage(coverUrlInput.trim());
                        setShowCoverModal(false);
                      }
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-[#1F3A2C] rounded-xl font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Preset Brand Covers */}
              <div>
                <label className="block text-gray-600 mb-1.5 font-medium">
                  Brand Editorial Presets:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["/img_insights_1.jpg", "/img_insights_2.jpg", "/img_insights_3.jpg", "/img_insights_4.jpg", "/img_insights_5.jpg", "/img_insights_6.jpg"].map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setCoverImage(url);
                        setShowCoverModal(false);
                      }}
                      className="relative h-16 rounded-lg overflow-hidden border hover:border-[#1F3A2C] transition-all group"
                    >
                      <Image src={url} alt={`Preset ${i}`} fill className="object-cover" />
                      <span className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating In-App Toast Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}

