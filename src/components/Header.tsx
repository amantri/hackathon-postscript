import { Menu } from "lucide-react";

export function Header({ userName }: { userName?: string }) {
  const initial = userName ? userName.charAt(0).toUpperCase() : "A";

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-primary font-bold text-xl tracking-tight">
            <span className="text-2xl mr-1">❖</span>
            Apex Health
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-md">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Right Side: Profile / MyChart */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-gray-800">MyChart</span>
            <span className="text-[10px] text-red-600 font-bold -mt-1 tracking-wider uppercase">Epic</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}
