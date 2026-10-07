"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { getSocket } from "@/lib/socket";

interface Message {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function ChatBox({ requestId }: { requestId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const addMessage = (m: Message) => {
    setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
  };

  useEffect(() => {
    let active = true;

    api
      .get<{ user: { id: string } }>("/auth/me")
      .then((d) => active && setMyId(d.user.id))
      .catch(() => {});

    api
      .get<{ messages: Message[] }>(`/messages/${requestId}`)
      .then((d) => active && setMessages(d.messages))
      .catch((err) => active && setError(err.message));

    const socket = getSocket();

    const join = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) socket.emit("join_room", { requestId, token });
    };

    const onNew = (m: Message) => {
      if (m.request_id === requestId) addMessage(m);
    };

    if (socket.connected) join();
    socket.on("connect", join);
    socket.on("new_message", onNew);

    return () => {
      active = false;
      socket.off("connect", join);
      socket.off("new_message", onNew);
    };
  }, [requestId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;

    setSending(true);
    setError("");

    try {
      const data = await api.post<{ message: Message }>(
        `/messages/${requestId}`,
        { content }
      );
      addMessage(data.message);
      setText("");
    } catch (err: any) {
      setError(err.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card flex h-[480px] flex-col">
      <div className="border-b border-border px-5 py-3">
        <h2 className="font-display text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">No messages yet.</p>
        ) : (
          messages.map((m) => {
            const mine = m.sender_id === myId;
            return (
              <div
                key={m.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    mine ? "bg-accent text-white" : "bg-surface-2 text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.content}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      mine ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {new Date(m.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-5 pb-2 text-sm text-accent">{error}</p>}

      <form onSubmit={send} className="flex gap-3 border-t border-border p-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2 text-foreground placeholder:text-muted outline-none focus:border-accent"
        />
        <button type="submit" disabled={sending} className="btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}