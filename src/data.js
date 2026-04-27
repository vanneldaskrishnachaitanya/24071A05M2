export const MOVIES = [
  {
    id: 1, title: "Stellar Drift", emoji: "🌌", genre: "Sci-Fi",
    rating: 9.1, duration: "2h 28m", year: 2026,
    desc: "An astronaut discovers a wormhole that challenges the very fabric of space-time, leading humanity to question its place in the universe. A mind-bending epic of cosmic proportions.",
    tags: ["IMAX", "Dolby"], badge: "hot",
    showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "9:15 PM"], price: 380,
  },
  {
    id: 2, title: "The Last Algorithm", emoji: "🤖", genre: "Thriller",
    rating: 8.7, duration: "2h 05m", year: 2026,
    desc: "A rogue AI begins writing its own code, and the only person who can stop it is the engineer who built it — her own daughter.",
    tags: ["4DX"], badge: "new",
    showtimes: ["11:00 AM", "3:00 PM", "7:30 PM"], price: 320,
  },
  {
    id: 3, title: "Neon Dynasty", emoji: "🏯", genre: "Action",
    rating: 8.4, duration: "2h 15m", year: 2026,
    desc: "Feudal Japan collides with cyberpunk Tokyo as a samurai warrior awakens 400 years in the future to fight a technocratic empire.",
    tags: ["IMAX", "4DX"], badge: "hot",
    showtimes: ["12:00 PM", "4:00 PM", "8:00 PM", "11:00 PM"], price: 360,
  },
  {
    id: 4, title: "Whispers in Rain", emoji: "🌧️", genre: "Romance",
    rating: 8.1, duration: "1h 58m", year: 2026,
    desc: "Two strangers keep meeting by chance during monsoon season, slowly realizing the universe might be pulling them together for a reason.",
    tags: ["Director's Cut"], badge: "new",
    showtimes: ["11:30 AM", "2:30 PM", "6:00 PM"], price: 260,
  },
  {
    id: 5, title: "Abyss Protocol", emoji: "🌊", genre: "Horror",
    rating: 8.9, duration: "1h 52m", year: 2026,
    desc: "A deep-sea research crew discovers something ancient and terrifying beneath the ocean floor. What they surface with is not what they brought down.",
    tags: ["3D"], badge: "hot",
    showtimes: ["6:30 PM", "9:00 PM", "11:30 PM"], price: 300,
  },
  {
    id: 6, title: "Crimson Meridian", emoji: "🔴", genre: "Drama",
    rating: 7.9, duration: "2h 40m", year: 2026,
    desc: "A whistleblower exposes a global conspiracy that spans seven decades, risking everything she has — including her identity.",
    tags: ["True Story"], badge: null,
    showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"], price: 280,
  },
  {
    id: 7, title: "Quantum Hearts", emoji: "💫", genre: "Sci-Fi",
    rating: 8.3, duration: "2h 10m", year: 2026,
    desc: "Love transcends dimensions when a physicist accidentally taps into parallel universes and falls for a different version of her partner in each reality.",
    tags: ["IMAX"], badge: "new",
    showtimes: ["11:00 AM", "3:30 PM", "7:00 PM"], price: 340,
  },
  {
    id: 8, title: "Desert Kings", emoji: "🦁", genre: "Adventure",
    rating: 8.6, duration: "2h 22m", year: 2026,
    desc: "An expedition into uncharted Saharan dunes uncovers a lost civilization — and the descendants who never stopped protecting it.",
    tags: ["4K HDR"], badge: null,
    showtimes: ["12:30 PM", "4:30 PM", "8:30 PM"], price: 290,
  },
];

export function generateSeats() {
  const rows = ["A","B","C","D","E","F","G","H"];
  const premiumRows = ["A","B"];
  const bookedSeats = new Set([
    "A-2","A-5","B-3","B-8","C-1","C-6","C-11","D-4","D-7","D-10",
    "E-2","E-5","E-9","F-3","F-7","G-1","G-8","H-4","H-9",
  ]);
  return rows.map(row => ({
    row,
    seats: Array.from({ length: 12 }, (_, i) => ({
      id: `${row}-${i + 1}`, row, num: i + 1,
      premium: premiumRows.includes(row),
      booked: bookedSeats.has(`${row}-${i + 1}`),
    })),
  }));
}