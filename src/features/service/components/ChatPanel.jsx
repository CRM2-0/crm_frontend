import { useMemo, useRef, useState } from "react";
import {
  ArrowBack, AttachFile, Check, MoreVert, Search, Send,
} from "@mui/icons-material";
import { Box, Button, IconButton, InputBase, TextField, Typography } from "@mui/material";
import "../styles/chat.css";

const initialMessages = (ticket) => [
  { id: `${ticket.id}-1`, from: "customer", text: ticket.message, time: ticket.time },
  { id: `${ticket.id}-2`, from: "agent", text: `Hello ${ticket.customer.split(" ")[0]}, thanks for contacting us. I’m reviewing your request and will keep you updated here.`, time: "10:15 AM" },
];

export default function ChatPanel({ ticket, onBack }) {
  const [messagesByTicket, setMessagesByTicket] = useState(() => ({ [ticket.id]: initialMessages(ticket) }));
  const [draft, setDraft] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiChoices = ["😀", "😊", "😅", "👍", "🙏", "🎉", "✅", "👏", "❤️", "😮", "🤝", "👀"];
  const messages = messagesByTicket[ticket.id] || initialMessages(ticket);
  const visibleMessages = useMemo(() => messages.filter((message) => !query || message.text.toLowerCase().includes(query.toLowerCase())), [messages, query]);

  const sendMessage = () => {
    const text = draft.trim();
    if ((!text && !attachments.length) || text.length > 4000) return;
    const message = { id: `${ticket.id}-${Date.now()}`, from: "agent", text, files: attachments, time: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) };
    setMessagesByTicket((current) => ({ ...current, [ticket.id]: [...(current[ticket.id] || initialMessages(ticket)), message] }));
    setDraft("");
    setAttachments([]);
    setEmojiOpen(false);
  };

  const insertEmoji = (emoji) => {
    const field = textareaRef.current;
    const start = field?.selectionStart ?? draft.length;
    const end = field?.selectionEnd ?? draft.length;
    const next = `${draft.slice(0, start)}${emoji}${draft.slice(end)}`;
    setDraft(next);
    setEmojiOpen(false);
    requestAnimationFrame(() => {
      field?.focus();
      field?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  return (
    <section className="service-chat" aria-label={`Conversation for ticket ${ticket.id}`}>
      <header className="service-chat__header">
        <IconButton aria-label="Back to complaints" onClick={onBack}><ArrowBack /></IconButton>
        <div className="service-chat__avatar">{ticket.customer.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
        <div className="service-chat__identity">
          <Typography fontWeight={700}>{ticket.customer}</Typography>
          <Typography variant="caption" color="text.secondary">Ticket {ticket.id} · {ticket.phone}</Typography>
        </div>
        <div className="service-chat__actions">
          <Button className="service-chat__status" size="small" variant="outlined">{ticket.status}</Button>
          <IconButton aria-label="Search conversation" onClick={() => { setSearchOpen((open) => !open); setQuery(""); }}><Search /></IconButton>
          <IconButton aria-label="More conversation options"><MoreVert /></IconButton>
        </div>
      </header>

      <div className="service-chat__context">
        <span><b>Assigned to</b> {ticket.assignee}</span><span><b>Branch</b> {ticket.branch}</span><span><b>Priority</b> {ticket.priority}</span>
      </div>
      {searchOpen && <div className="service-chat__search"><Search fontSize="small" /><InputBase autoFocus placeholder="Search in this conversation" value={query} onChange={(event) => setQuery(event.target.value)} /><span>{visibleMessages.length} messages</span><Button onClick={() => { setSearchOpen(false); setQuery(""); }}>Close</Button></div>}

      <div className="service-chat__messages" aria-live="polite">
        <div className="service-chat__day"><span>Today</span></div>
        {visibleMessages.map((message) => {
          const mine = message.from === "agent";
          return <article className={`service-chat__message ${mine ? "is-mine" : ""}`} key={message.id}>
            {!mine && <div className="service-chat__small-avatar">{ticket.customer.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>}
            <div><div className="service-chat__meta">{mine ? "You" : ticket.customer} <span>{message.time}</span></div><div className="service-chat__bubble">{message.text}{message.files?.map((file) => <div className="service-chat__file" key={`${message.id}-${file.name}`}>📎 {file.name}</div>)}</div>{mine && <div className="service-chat__read"><Check fontSize="inherit" /> Sent</div>}</div>
          </article>;
        })}
        {visibleMessages.length === 0 && <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>No messages match your search.</Typography>}
      </div>

      <footer className="service-chat__composer">
        {emojiOpen && <div className="service-chat__emoji-picker" role="group" aria-label="Choose an emoji">{emojiChoices.map((emoji) => <button type="button" key={emoji} onClick={() => insertEmoji(emoji)} aria-label={`Insert ${emoji}`}>{emoji}</button>)}</div>}
        {attachments.length > 0 && <div className="service-chat__pending-files">{attachments.map((file, index) => <span key={`${file.name}-${index}`}>📎 {file.name}<button type="button" aria-label={`Remove ${file.name}`} onClick={() => setAttachments((items) => items.filter((_, itemIndex) => itemIndex !== index))}>×</button></span>)}</div>}
        <TextField inputRef={textareaRef} fullWidth multiline minRows={2} maxRows={6} value={draft} onChange={(event) => setDraft(event.target.value.slice(0, 4000))} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Write a message…" inputProps={{ "aria-label": "Write a message", maxLength: 4000 }} />
        <div className="service-chat__composer-tools"><IconButton aria-label="Attach a file" onClick={() => inputRef.current?.click()}><AttachFile /></IconButton><input ref={inputRef} type="file" multiple hidden onChange={(event) => { setAttachments((items) => [...items, ...Array.from(event.target.files || [])]); event.target.value = ""; }} /><IconButton aria-label="Insert emoji" aria-expanded={emojiOpen} onClick={() => setEmojiOpen((open) => !open)}>☻</IconButton><span>Enter to send · Shift+Enter for a new line</span><Button variant="contained" endIcon={<Send />} onClick={sendMessage} disabled={!draft.trim() && attachments.length === 0} sx={{ textTransform: "none" }}>Send</Button></div>
      </footer>
    </section>
  );
}
