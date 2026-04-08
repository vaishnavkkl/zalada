'use client'


export function Footer() {
  const year = new Date().getFullYear()
  const links = {
    Shop: ['Green Glow Bowl', 'Citrus Crunch Salad', 'Herb Protein Bowl', 'Seasonal Specials'],
    Company: ['Our Story', 'Sustainability', 'Press', 'Careers'],
    Support: ['Delivery Promise', 'Freshness Guarantee', 'Customer Care', 'FAQ'],
  }

  return (
    <footer className="border-t border-[rgba(47,107,63,0.1)] bg-[#EDEDEB]">
      {/* Top */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">

          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6B3F] shadow-[0_6px_18px_rgba(47,107,63,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6 2 2 8 2 14c0 4 2 8 10 9 8-1 10-5 10-9 0-6-4-12-10-12z" />
                </svg>
              </div>
              <span className="display-font text-3xl text-[#122018] tracking-tight">Zalada</span>
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-[#3a5e48]/70 font-medium">
              Luxury salad compositions architected for vibrancy and culinary intent. Farm-sourced, chef-assembled, delivered cold.
            </p>

            {/* Socials */}
            <div className="mt-8 flex gap-4">
              {['instagram', 'twitter', 'linkedin'].map((n) => (
                <a key={n} href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(47,107,63,0.1)] bg-white text-[#2F6B3F] transition-all hover:bg-[#2F6B3F] hover:text-white hover:border-transparent hover:-translate-y-1 shadow-sm"
                >
                  <span className="sr-only">{n}</span>
                  <div className="h-4 w-4 rounded-sm border-2 border-current opacity-40" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="label-font mb-6 text-[#AC624B]">{heading}</p>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-semibold text-[#3a5e48]/75 transition-colors duration-200 hover:text-[#AC624B]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:hidden lg:block">
            <p className="label-font mb-6 text-[#AC624B]">Newsletter</p>
            <p className="mb-5 text-sm text-[#3a5e48]/70 leading-relaxed">Join the circle for seasonal menu drops, botanical notes, and exclusive invitations.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="email@example.com"
                className="rounded-full border border-[rgba(36,66,46,0.12)] bg-white px-5 py-3 text-sm text-[#122018] outline-none placeholder:text-[#3a5e48]/30 focus:border-[#AC624B] focus:ring-4 focus:ring-[#AC624B]/5 transition-all shadow-sm"
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-full bg-[#24422E] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1f3828] hover:shadow-lg active:scale-95"
              >
                Join Circle
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(47,107,63,0.06)] bg-[#EDEDEB]/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] font-bold uppercase tracking-widest text-[#3a5e48]/40 md:flex-row md:px-10">
          <p>© {year} Zalada Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#AC624B] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#AC624B] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#AC624B] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
