import React, { useMemo, useState } from "react";
import type { Ticket } from "./types";
import "./App.css";

// ----------------------
// Utilities
// ----------------------
const uid = () => Math.random().toString(36).slice(2, 9);

const badgeStyle = (priority: Ticket["priority"]) => ({
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  background:
    priority === "High"
      ? "#fee2e2"
      : priority === "Medium"
      ? "#ffedd5"
      : "#e5f3ff",
  color:
    priority === "High"
      ? "#991b1b"
      : priority === "Medium"
      ? "#9a3412"
      : "#1e3a8a",
  border: "1px solid rgba(0,0,0,0.08)",
});


// ----------------------
// TicketCounter (Fixed)
// ----------------------

function TicketCounter({ tickets }: { tickets: Ticket[] }) {
  // Fix: handle tickets without a status → assume "open"
  const openCount = tickets.filter((t) => t.status !== "closed").length;
  return <div className="counter">You have {openCount} open tickets</div>;
}


// ----------------------
// Search Bar
// ----------------------
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      className="search"
      placeholder="Search tickets by title or description..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// ----------------------
// Ticket Form
// ----------------------
function TicketForm({ onCreate }: { onCreate: (t: Ticket) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Ticket["priority"]>("Low");

  const canSave = title.trim().length > 0 && description.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;

    const ticket: Ticket = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "open",
    };
    onCreate(ticket);

    setTitle("");
    setDescription("");
    setPriority("Low");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Can't login to dashboard"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Briefly describe the issue..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button type="submit" disabled={!canSave}>
          Save
        </button>
      </div>
    </form>
  );
}

// ----------------------
// Ticket Item
// ----------------------
function TicketItem({
  ticket,
  onToggleStatus,
}: {
  ticket: Ticket;
  onToggleStatus: (id: string) => void;
}) {
  const shortDesc =
    ticket.description.length > 120
      ? ticket.description.slice(0, 117) + "..."
      : ticket.description;

  return (
    <div className="ticket">
      <div className="ticket-head">
        <h4>{ticket.title}</h4>
        <span style={badgeStyle(ticket.priority)}>{ticket.priority}</span>
      </div>
      <p>{shortDesc}</p>
      <div className="ticket-footer">
        <span
          className={ticket.status === "closed" ? "status closed" : "status open"}
        >
          Status: {ticket.status}
        </span>
        <button onClick={() => onToggleStatus(ticket.id)}>
          {ticket.status === "closed" ? "Reopen" : "Close"}
        </button>
      </div>
    </div>
  );
}

// ----------------------
// Ticket List
// ----------------------
function TicketList({
  tickets,
  onToggleStatus,
}: {
  tickets: Ticket[];
  onToggleStatus: (id: string) => void;
}) {
  if (!tickets.length) {
    return <div className="empty">No tickets yet. Create your first ticket!</div>;
  }

  return (
    <div className="ticket-list">
      {tickets.map((t) => (
        <TicketItem key={t.id} ticket={t} onToggleStatus={onToggleStatus} />
      ))}
    </div>
  );
}

// ----------------------
// App (root)
// ----------------------
export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "Login error",
      description: "User cannot login after password reset.",
      priority: "High",
      status: "open",
    },
  ]);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [tickets, query]);

  function addTicket(ticket: Ticket) {
    setTickets((prev) => [ticket, ...prev]);
  }

  function toggleStatus(id: string) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "closed" ? "open" : "closed" }
          : t
      )
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h2>🎫 Mini Ticketing App</h2>
        <TicketCounter tickets={tickets} />
      </header>

      <section className="main">
        <div className="card">
          <h3>Create Ticket</h3>
          <TicketForm onCreate={addTicket} />
        </div>

        <div className="card">
          <h3>Search</h3>
          <SearchBar value={query} onChange={setQuery} />
          <div className="hint">Searches title & description</div>
        </div>
      </section>

      <section className="card">
        <div className="ticket-headline">
          <h3>Tickets</h3>
          <span>{filtered.length} shown</span>
        </div>
        <TicketList tickets={filtered} onToggleStatus={toggleStatus} />
      </section>

      <footer className="footer">
        Built with React + Hooks • Local state only • No backend
      </footer>
    </div>
  );
}
