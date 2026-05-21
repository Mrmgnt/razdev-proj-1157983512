import { useMemo, useState } from "react";

const features = [
  "Mempercepat proses booking kamar kos.",
  "Mengurangi chat bolakbalik untuk cek ketersediaan.",
  "Membantu admin kelola data kamar dan order.",
  "Meningkatkan jumlah booking masuk.",
  "Menyimpan data kamar dan order secara rapi.",
  "Katalog kamar kos dengan status ketersediaan."
];
const designNotes = [
  "Putih bersih dominan. Kamar terasa terang, rapi, aman.",
  "Foto kamar besar. Keputusan sewa banyak dari visual.",
  "Card kamar besar. Mobile satu tangan, scan cepat.",
  "CTA hijau sticky bawah. Booking cepat tanpa cari tombol.",
  "Badge status jelas. Cegah salah pilih kamar penuh.",
  "Teal dan hijau jadi sinyal tersedia/aksi. Oranye jadi pending DP/perhatian."
];
const initialTasks = [
  { id: 1, title: "Riset kebutuhan", status: "Berjalan", due: "Hari ini" },
  { id: 2, title: "Buat prioritas", status: "Selesai", due: "Besok" },
  { id: 3, title: "Review hasil", status: "Pending", due: "Minggu ini" }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const doneCount = useMemo(() => tasks.filter((task) => task.status === "Selesai").length, [tasks]);
  const addTask = (event) => {
    event.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    setTasks([{ id: Date.now(), title: clean, status: "Berjalan", due: "Baru" }, ...tasks]);
    setTitle("");
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Dashboard aplikasi</p>
        <h1>Order Kos"an</h1>
        <p className="hero-copy">
          Kelola daftar tugas, status, ringkasan, dan prioritas harian dalam satu layar responsif.
        </p>
        <div className="hero-actions">
          <a href="#tasks" className="button primary">Kelola tugas</a>
          <a href="#features" className="button secondary">Lihat fitur</a>
        </div>
      </section>

      <section id="tasks" className="panel">
        <div>
          <p className="eyebrow">Task manager</p>
          <h2>Ringkasan: {doneCount}/{tasks.length} selesai</h2>
        </div>
        <form className="task-form" onSubmit={addTask}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Tambah tugas baru" aria-label="Tambah tugas" />
          <button className="button primary" type="submit">Tambah</button>
        </form>
        <div className="task-list">
          {tasks.map((task) => (
            <article className="task-row" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <p>Due: {task.due}</p>
              </div>
              <span className={"badge " + task.status.toLowerCase()}>{task.status}</span>
            </article>
          ))}
        </div>
        <p className="success">Data siap dipakai sebagai prototype lokal dengan validasi input sederhana.</p>
      </section>

      <section id="features" className="grid-section">
        <div>
          <p className="eyebrow">Fitur utama</p>
          <h2>Alur produk</h2>
        </div>
        <div className="card-grid">
          {features.map((item, index) => (
            <article className="card" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
              <p>Alur ini siap dipakai user untuk input, monitoring status, dan review daftar.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="design" className="panel">
        <div>
          <p className="eyebrow">Design direction</p>
          <h2>Domain & Design Rationale</h2>
        </div>
        <ul className="note-list">
          {designNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </section>
    </main>
  );
}
