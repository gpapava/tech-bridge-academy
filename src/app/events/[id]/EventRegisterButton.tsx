"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
  eventId: string;
  isRegistered: boolean;
  isFull: boolean;
}

export default function EventRegisterButton({ eventId, isRegistered, isFull }: Props) {
  const [registered, setRegistered] = useState(isRegistered);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: registered ? "DELETE" : "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setRegistered(!registered);
      toast.success(registered ? "Registration cancelled." : "You are now registered!");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (isFull && !registered) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm font-medium cursor-not-allowed">
        Event Full
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={registered ? "btn-secondary" : "btn-primary"}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : registered ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Registered — Cancel
          </>
        ) : (
          "Register for this Event"
        )}
      </button>
      {registered && (
        <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4" />
          You&apos;re registered
        </p>
      )}
    </div>
  );
}
