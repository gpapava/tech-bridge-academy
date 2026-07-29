"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Megaphone, HandHeart, Gift, Send, Trash2, Pin } from "lucide-react";
import { Badge, OrgTypeBadge, type BadgeVariant } from "@/components/ui/Badge";
import { InlineLoader } from "@/components/ui/LoadingSpinner";
import { formatRelative, cn } from "@/lib/utils";

type PostType = "ANNOUNCEMENT" | "REQUEST" | "OFFER";

interface NetworkingPost {
  id: string;
  authorId: string;
  type: PostType;
  title: string;
  message: string;
  createdAt: string;
  author: {
    name: string | null;
    profile: { name: string; orgType: string } | null;
  };
}

const TYPE_META: Record<PostType, { label: string; icon: typeof Megaphone; variant: BadgeVariant }> = {
  ANNOUNCEMENT: { label: "Announcement", icon: Megaphone, variant: "blue" },
  REQUEST: { label: "Request", icon: HandHeart, variant: "amber" },
  OFFER: { label: "Offer", icon: Gift, variant: "green" },
};

const FILTERS: { label: string; value: PostType | "" }[] = [
  { label: "All Posts", value: "" },
  { label: "Announcements", value: "ANNOUNCEMENT" },
  { label: "Requests", value: "REQUEST" },
  { label: "Offers", value: "OFFER" },
];

export function NetworkingBoard() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<NetworkingPost[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<PostType | "">("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ type: "ANNOUNCEMENT" as PostType, title: "", message: "" });

  const fetchPosts = useCallback(async (filter: PostType | "", currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(currentPage), ...(filter && { type: filter }) });
      const res = await fetch(`/api/networking?${params}`);
      const data = await res.json();
      setPosts(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load the networking board");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(typeFilter, page);
  }, [typeFilter, page, fetchPosts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPosting(true);
    try {
      const res = await fetch("/api/networking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to post");
      toast.success("Posted to the networking board!");
      setForm({ type: "ANNOUNCEMENT", title: "", message: "" });
      setShowForm(false);
      setPage(1);
      fetchPosts(typeFilter, 1);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPosting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/networking/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts((p) => p.filter((post) => post.id !== id));
      toast.success("Post removed");
    } catch {
      toast.error("Failed to delete post");
    }
  }

  return (
    <div>
      {/* New Post */}
      <div className="card p-5 mb-8">
        {!session ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">Sign in to post an announcement, request, or partnership offer.</p>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/auth/login" className="btn-secondary text-sm">Sign In</Link>
              <Link href="/auth/register" className="btn-primary text-sm">Register Free</Link>
            </div>
          </div>
        ) : !showForm ? (
          <button onClick={() => setShowForm(true)} className="btn-primary w-full justify-center">
            <Pin className="h-4 w-4" />
            Post to the Networking Board
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TYPE_META) as PostType[]).map((t) => {
                const meta = TYPE_META[t];
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border transition-colors",
                      form.type === t
                        ? "bg-target-smes text-white border-target-smes"
                        : "bg-white text-slate-600 border-slate-200 hover:border-target-smes/50"
                    )}
                  >
                    <meta.icon className="h-3.5 w-3.5" />
                    {meta.label}
                  </button>
                );
              })}
            </div>
            <div>
              <label className="label">Title <span className="text-red-500">*</span></label>
              <input
                className="input"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Looking for a CNC machining partner in Lombardy"
              />
            </div>
            <div>
              <label className="label">Message <span className="text-red-500">*</span></label>
              <textarea
                className="input min-h-[100px] resize-y"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share the details of your announcement, request, or offer..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={posting} className="btn-primary">
                {posting ? "Posting…" : (<><Send className="h-4 w-4" /> Post</>)}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => { setTypeFilter(f.value); setPage(1); }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
              typeFilter === f.value
                ? "bg-brand-800 text-white border-brand-800"
                : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-slate-400">{total} post{total !== 1 ? "s" : ""}</span>
      </div>

      {/* Feed */}
      {loading ? (
        <InlineLoader />
      ) : posts.length === 0 ? (
        <div className="text-center py-24">
          <Megaphone className="h-12 w-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700">No posts yet</h3>
          <p className="text-slate-400 mt-2">Be the first to share an announcement, request, or offer.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((post) => {
              const meta = TYPE_META[post.type];
              const isOwnerOrAdmin = Boolean(session) && (session?.user?.id === post.authorId || session?.user?.role === "ADMIN");
              return (
                <div key={post.id} className="card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge variant={meta.variant} dot>
                      <meta.icon className="h-3 w-3 mr-1" />
                      {meta.label}
                    </Badge>
                    <span className="text-xs text-slate-400 flex-shrink-0">{formatRelative(post.createdAt)}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{post.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{post.message}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="font-medium">{post.author.profile?.name ?? post.author.name ?? "Member"}</span>
                      {post.author.profile && <OrgTypeBadge type={post.author.profile.orgType} />}
                    </div>
                    {isOwnerOrAdmin && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-secondary px-4 py-2 disabled:opacity-40">
                ← Previous
              </button>
              <span className="text-sm text-slate-500 px-4">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="btn-secondary px-4 py-2 disabled:opacity-40">
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
