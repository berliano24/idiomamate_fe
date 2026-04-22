Fase 1: Pondasi Tech Stack & Global Layout
Tujuan: Menyiapkan struktur Next.js, Tailwind, dan navigasi utama.

Prompt AI:
"Buatlah struktur aplikasi Next.js (App Router) dengan Tailwind CSS untuk aplikasi bernama IdiomaMate. Gunakan desain modern, bersih, dan berpusat pada pengguna.

Implementasikan Global Layout dengan Sidebar navigasi: Dashboard, Find Partner, Lobbies, Friends, Messages, dan Profile.

Tambahkan Navbar atas yang berisi profil user, bell notifikasi, dan indikator status koneksi WebSocket (Connected/Disconnected).

Gunakan Lucide React untuk icon dan pastikan layout responsif."

🔐 Fase 2: Autentikasi & Onboarding Terpandu
Tujuan: Membuat alur masuk yang menangkap data bahasa pengguna.

Prompt AI:
"Buatlah halaman Register dan Login sesuai spesifikasi.

Tambahkan tombol 'Sign in with Google'.

Buat halaman Profile Setup (Onboarding) sebagai gatekeeper. Jika user belum mengisi native_language, target_language, dan proficiency_level, mereka harus diarahkan ke sini.

Gunakan komponen dropdown yang rapi untuk pemilihan bahasa dan radio group untuk level (Beginner, Intermediate, Advanced)."

🤝 Fase 3: Matchmaking & Dashboard
Tujuan: Mengimplementasikan state mesin untuk pencarian partner.

Prompt AI:
"Buatlah halaman Dashboard dengan Quick Action Cards (Find Partner, Browse Lobbies, Create Lobby).
Setelah itu, buat halaman 1-on-1 Matchmaking dengan 3 State UI:

State 1 (Idle): Input pertanyaan icebreaker dan tombol 'Find Partner'.

State 2 (Searching): Animasi radar/pulsing dengan tombol 'Cancel'.

State 3 (Match Found): Tampilkan info partner (username & icebreaker) sebelum masuk ke video call."

📹 Fase 4: Core Feature - Video Call & Interaction Design (Paling Penting!)
Tujuan: Mengimplementasikan fitur skripsi Anda untuk mencegah conversation breakdown.

Prompt AI:
"Bangunlah Video Call Room Interface menggunakan Grid System.

Video Area: Layar utama untuk partner dan PiP (Picture-in-Picture) untuk diri sendiri. Tambahkan 'Active Speaker Highlight'.

Scaffolding Sidebar: Buat panel chat yang menyatu dengan fitur:

Topic Suggestion: Tombol '💡 Suggest a Topic' yang memunculkan kartu bantuan saat percakapan macet.

AI Truth or Dare: Tombol '🎲 Truth or Dare' untuk memicu pertanyaan dari AI.

Quick Translation: Tombol terjemahan pada setiap bubble chat.

Control Bar: Mute, Camera Toggle, dan tombol 'End Call' yang mengarah ke Post-Call Screen (Rating & Report)."

🏛️ Fase 5: Public Lobbies (Group Room)
Tujuan: Fitur kolaborasi kelompok.

Prompt AI:
"Implementasikan sistem Public Lobbies.

Lobby List: Halaman grid berisi kartu lobby dengan indikator kapasitas (misal: 3/5) dan filter bahasa.

Lobby Room: Layout video untuk 5 orang. Khusus Lobby Master, tambahkan kontrol untuk Kick User dan Close Room.

Implementasikan sistem Join Request di mana Master harus menyetujui (Accept/Decline) sebelum user baru bisa masuk."

💬 Fase 6: Real-time Friends & Messaging
Tujuan: Fitur retensi pengguna.

Prompt AI:
"Buatlah fitur Friends System dan Direct Messages (DM).

Friends Page: List teman dengan status online dan tab untuk 'Pending Requests'.

DM Interface: Chat real-time dengan header profil teman dan indikator pesan belum dibaca (unread badge).

Tambahkan Global Toast Notification yang muncul ketika ada permintaan pertemanan atau pesan masuk baru."