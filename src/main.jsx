import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const initialReports = [];

function Avatar({ owner=false, creator="♪", letter="T" }) {
  return (
    <div className={"avatar " + (owner ? "owner" : "")}>
      {letter}
      {owner && <div className="crown">♛</div>}
      {creator && <div className="creator">{creator}</div>}
    </div>
  );
}

function App() {
  const [page, setPage] = useState("feed");
  const [playing, setPlaying] = useState({});
  const [reports, setReports] = useState(initialReports);
  const [badges, setBadges] = useState(["♛ Owner Crown", "🔨 Admin Hammer", "♪ Music Creator"]);
  const [gifts, setGifts] = useState(["📼 VHS Tape Gift — 100 Echoes", "✨ Echo Burst — 500 Echoes"]);
  const [chats, setChats] = useState(["Premiere chat waiting..."]);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1700);
  }

  function togglePlay(id) {
    setPlaying(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(playing[id] ? "Paused" : "Playing");
  }

  function report(name) {
    setReports(prev => [{ id: crypto.randomUUID(), name, time: new Date().toLocaleTimeString() }, ...prev]);
    showToast("Report sent to Owner Panel");
  }

  function addBadge() {
    const name = prompt("Badge name?");
    if (!name) return;
    const icon = prompt("Icon?", "⭐") || "⭐";
    setBadges(prev => [...prev, `${icon} ${name}`]);
    showToast("Badge created");
  }

  function sendGift() {
    const input = document.getElementById("giftMsg");
    const msg = input?.value || "This Trail is amazing!";
    setGifts(prev => [`🌅 Super Echo: ${msg}`, ...prev]);
    if (input) input.value = "";
    showToast("Super Echo sent");
  }

  function sendChat() {
    const input = document.getElementById("chatMsg");
    const msg = input?.value || "I am waiting for the premiere!";
    setChats(prev => [...prev, `💬 @trailfan: ${msg}`]);
    if (input) input.value = "";
  }

  function upload() {
    const title = prompt("Upload title?");
    if (title) showToast("Uploaded: " + title);
  }

  return (
    <div>
      {toast && <div className="toast">{toast}</div>}

      <header className="header">
        <div>
          <div className="logo">▶ TrailReels</div>
          <div className="small">Every file leaves a trail.</div>
        </div>
        <button onClick={() => setPage("profile")}>👑 @trailowner</button>
      </header>

      <main className="container">
        {page === "feed" && (
          <section>
            <div className="card">
              <div className="hero">TrailReels</div>
              <p>Dreamy social media with Reels, Trails, Memories, gifts, premieres, Reelers, and owner tools.</p>
              <button className="primary" onClick={upload}>Upload Reel</button>{" "}
              <button className="primary" onClick={() => setPage("live")}>Start Livestream</button>
            </div>

            <div className="grid">
              <VideoCard
                id="reel1"
                playing={playing.reel1}
                togglePlay={togglePlay}
                tag="🎞 REEL · 0:32"
                title="Blissful Memory Loop"
                author="@dreamwaves · Music Reeler"
                text="A soft emotional edit inspired by the Memories vibe."
                avatar={<Avatar letter="D" owner={false} creator="♪" />}
                report={() => report("Blissful Memory Loop")}
                follow={() => showToast("Now following @dreamwaves")}
              />

              <VideoCard
                id="trail1"
                playing={playing.trail1}
                togglePlay={togglePlay}
                tag="📺 TRAIL · PREMIERE"
                title="The First TrailReels Premiere"
                author="@trailowner · Owner"
                text="Upcoming long-form Trail with premiere countdown and live chat."
                avatar={<Avatar letter="T" owner={true} creator="♪" />}
                trail
                report={() => report("The First TrailReels Premiere")}
                follow={() => showToast("Following owner")}
                extra={<>
                  <button onClick={() => setPage("premiere")}>🎬 Watch Trailer</button>
                  <button onClick={() => showToast("Premiere reminder turned on ⏰")}>⏰ Notify Me</button>
                  <button onClick={() => setPage("premiere")}>💬 Premiere Chat</button>
                </>}
              />
            </div>
          </section>
        )}

        {page === "memories" && (
          <section>
            <div className="card">
              <div className="hero">Memories</div>
              <p>The emotional archive section. Later the Memories button can play the Bliss vibe/audio.</p>
              <button className="primary" onClick={() => showToast("Memories vibe button clicked 🎵")}>Play Memories Vibe</button>
            </div>
            <div className="grid">
              <div className="card">🌅 <b>Recovered Reels</b><p>Orange/yellow sunset glow.</p></div>
              <div className="card">🎵 <b>Memory Sounds</b><p>Music-based posts and edits.</p></div>
              <div className="card">📁 <b>Old Drive Files</b><p>Inspired by the school-drive idea.</p></div>
              <div className="card">🌌 <b>Blue Hour</b><p>Some abandoned feeling, but not full horror.</p></div>
            </div>
          </section>
        )}

        {page === "live" && (
          <section>
            <div className="card">
              <div className="hero">Live Trails</div>
              <p>Livestream page with paid gifts and Super Echoes.</p>
              <input id="giftMsg" placeholder="Type Super Echo message" />
              <button className="primary" onClick={sendGift}>Send Super Echo</button>
              {gifts.map((g, i) => <div className="gift" key={i}>{g}</div>)}
            </div>
          </section>
        )}

        {page === "premiere" && (
          <section>
            <div className="card">
              <div className="hero">Premiere</div>
              <p>Trailer + countdown + chat for upcoming Trails.</p>
              <div className="video trail" onClick={() => togglePlay("trailer")}>
                <div className="tag">🎬 TRAILER</div>
                <span>{playing.trailer ? "⏸" : "▶"}</span>
              </div>
              <div className="gift">Countdown: 02:14:59</div>
              <input id="chatMsg" placeholder="Type premiere chat" />
              <button onClick={sendChat}>Send Chat</button>
              <div className="gift">{chats.map((c, i) => <div key={i}>{c}</div>)}</div>
            </div>
          </section>
        )}

        {page === "reelers" && (
          <section>
            <div className="card"><div className="hero">Reelers</div><p>Creators/channels with badge frames.</p></div>
            <div className="grid">
              <div className="card"><Avatar letter="T" owner creator="♪" /><h2>TrailReels Owner</h2><p>@trailowner · owner</p><button onClick={() => showToast("Following owner")}>Follow</button></div>
              <div className="card"><Avatar letter="D" creator="♪" /><h2>DreamWaves</h2><p>@dreamwaves · music creator</p><button onClick={() => showToast("Following DreamWaves")}>Follow</button> <button onClick={() => report("DreamWaves")}>Report</button></div>
              <div className="card"><Avatar letter="O" creator="▣" /><h2>OldTapes94</h2><p>@oldtapes94 · archive creator</p><button onClick={() => showToast("Following OldTapes94")}>Follow</button> <button onClick={() => report("OldTapes94")}>Report</button></div>
            </div>
          </section>
        )}

        {page === "panel" && (
          <section>
            <div className="card"><div className="hero">Owner Panel 👑</div><p>Reports, badge tools, Reeler manager, and moderation.</p></div>
            <div className="grid">
              <div className="card">
                <h2>Reports Inbox</h2>
                {reports.length ? reports.map(r => <div className="report" key={r.id}>⚠ {r.name} was reported · {r.time}</div>) : <p className="small">No reports yet.</p>}
              </div>
              <div className="card">
                <h2>Badge Manager</h2>
                <button className="primary" onClick={addBadge}>Create Badge</button>
                {badges.map((b, i) => <div className="gift" key={i}>{b}</div>)}
              </div>
              <div className="card">
                <h2>Reeler Manager</h2>
                <div className="manage">@dreamwaves <button onClick={() => showToast("Demo: Reeler deleted")}>Delete</button></div>
                <div className="manage">@oldtapes94 <button onClick={() => showToast("Demo: Badge added")}>Add Badge</button></div>
              </div>
            </div>
          </section>
        )}

        {page === "profile" && (
          <section>
            <div className="card profile">
              <div className="banner">OWNER TRAIL</div>
              <div className="profileAvatar"><Avatar letter="T" owner creator="♪" /></div>
              <h1>TrailReels Owner</h1>
              <p>@trailowner · owner · music creator</p>
              <p>Founder of TrailReels. Creator of Reelers, Memories, Archives, and Trails.</p>
              <button className="primary" onClick={upload}>Upload Reel</button>
            </div>
          </section>
        )}
      </main>

      <nav className="nav">
        <button className={page === "feed" ? "active" : ""} onClick={() => setPage("feed")}>🏠 Feed</button>
        <button className={page === "memories" ? "active" : ""} onClick={() => setPage("memories")}>🕰 Memories</button>
        <button className={page === "live" ? "active" : ""} onClick={() => setPage("live")}>🎁 Live</button>
        <button className={page === "reelers" ? "active" : ""} onClick={() => setPage("reelers")}>🎥 Reelers</button>
        <button className={page === "panel" ? "active" : ""} onClick={() => setPage("panel")}>👑 Panel</button>
      </nav>
    </div>
  );
}

function VideoCard({ id, playing, togglePlay, tag, title, author, text, avatar, trail=false, report, follow, extra }) {
  return (
    <div className="card">
      <div className={"video " + (trail ? "trail" : "")} onClick={() => togglePlay(id)}>
        <div className="tag">{tag}</div>
        <span>{playing ? "⏸" : "▶"}</span>
      </div>
      <div className="row">
        {avatar}
        <div><b>{title}</b><br /><span className="small">{author}</span></div>
      </div>
      <p>{text}</p>
      <div className="actions">
        <button onClick={() => alert("Echoed ❤️")}>❤️ Echo</button>
        <button onClick={follow}>➕ Follow</button>
        <button onClick={report}>⚠ Report</button>
        {extra}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
