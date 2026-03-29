import Image from "next/image";

export default function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex flex-col items-center justify-center">
        <h1 className="text-[64px] font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text animate-slide-up mt-[-200px] tracking-tight">
              CyberID Project
        </h1>
        <p className="text-white"> idP Provider нового поколения</p>
      </main>
  )
}
