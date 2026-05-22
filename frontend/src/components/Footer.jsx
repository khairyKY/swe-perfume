import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full py-12 px-12 flex flex-col items-center gap-8 bg-stone-100 border-t border-stone-200 mt-auto">
    <nav className="flex flex-wrap gap-6 justify-center">
      <Link
        className="font-serif text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 underline decoration-stone-300"
        to="/apply"
      >
        Want to be a vendor?
      </Link>
      <a
        className="font-serif text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 underline decoration-stone-300"
        href="#"
      >
        Shipping & Returns
      </a>
      <a
        className="font-serif text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 underline decoration-stone-300"
        href="#"
      >
        Privacy Policy
      </a>
      <a
        className="font-serif text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 underline decoration-stone-300"
        href="#"
      >
        Sustainability
      </a>
      <a
        className="font-serif text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 underline decoration-stone-300"
        href="#"
      >
        Concierge
      </a>
    </nav>
    <p className="font-serif text-[10px] uppercase tracking-widest text-stone-800 text-center">
      2024 L'ESSENCE. The Art of Fragrance.
    </p>
  </footer>
);

export default Footer;
