"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

type Message = {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function ChatBox({ requestId }: { requestId: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const addMessage = (m: Message) =>
    setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api(`/messages/${requestId}`);
        const list = r?.messages ?? r ?? [];
        setMessages(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chat");
      }
    };
    load();
  }, [requestId]);

  useEffect(() => {
    const socket = getSocket();
    const onMessage = (m: Message) => {
      if (m.request_id === requestId) addMessage(m);
    };

    const join = async () => {
      const { data } = await supabase.auth.getSession();
      socket.emit("join_room", {
        requestId,
        token: data.session?.access_token,
      });
    };

    join();
    socket.on("new_message", onMessage);
    return () => {
      socket.off("new_message", onMessage);
    };
  }, [requestId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    setText("");
    setError("");
    try {
      const r = await api(`/messages/${requestId}`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      const saved: Message | undefined = r?.message ?? r;
      if (saved?.id) {
        addMessage(saved);
        getSocket().emit("new_message", saved);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <div className="card flex h-[32rem] flex-col p-0">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-display text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted">No messages yet.</p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === user?.id;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                  mine ? "bg-accent text-white" : "bg-surface-2 text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                <p className="mt-1 text-[10px] opacity-60">
                  {new Date(m.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-5 pb-2 text-sm text-accent">{error}</p>}

      <form onSubmit={send} className="flex gap-3 border-t border-border p-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="input"
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}