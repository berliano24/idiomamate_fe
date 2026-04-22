'use client';

export default function ExploreButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById('features');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#2B2B2B] font-bold underline decoration-2 underline-offset-4 hover:text-[#434CE6] hover:decoration-[#434CE6] transition-all cursor-pointer bg-transparent border-none p-0"
    >
      Explore Platform
    </button>
  );
}
