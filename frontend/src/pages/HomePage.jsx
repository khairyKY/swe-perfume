import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import Footer from '../components/Footer';
import TopAppBar from '../components/TopAppBar';

const fallbackImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLakPm6JhpvmlN55HFWK63sUOPsd4MUBw8lx-5j-xi-Vvl33BxGz-uyhivT1CqVIG42QwFd1gST-bOB73i_FwDRijccQLhHRGjx1qYswhfGPE1e3RHO61jSr6J9iSt6Vsm1aHA_r_zdo9LwtPlx8i3mi2isQrn4LGQlHF9QvHl72GU7iTRoptD8bGMAwKXIDs6t0lTYokAY3WYdEEAKfZ6xsZibB_lGffzZlQf8rYNvIu1I5P1TIXWXLXpNW6FWsEsQqA9QsZaV1_7';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts({ page: 1, limit: 6 });
        const list = data?.products || data?.items || data?.data || data || [];
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        setError('Unable to load products right now.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formatPrice = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return '—';
    return numberValue.toFixed(2);
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <TopAppBar />
      <header className="relative w-full h-[720px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA8zAB70rgNHGedARqHToSoLlLPzdqnALDk-GIEQ60ie2q9WAd8SM8uOWHNi0YnnEiuKKovjM8pS4iNLbf3oG3QZkHPRGnCcbZgxjNNpANt0764yJWDmLTldZjgU7tDbWvwKyCgujc4032QEqVXp7zJ08N8-mCFp3VLWKIdqbt8IZfD0KsGx9NKhW2ZhhQ6nbgFO-96KdxrGdr2sQWyYUcX5FBPbXSCSxnfuUGKjzES6WMuIAIFShQd0CZDsmPhE7ANaLl0JzT_K8C"
          alt=""
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-stack-sm tracking-tight">
            THE ART OF FRAGRANCE
          </h1>
          <p className="font-body-lg text-on-surface-variant mb-stack-md max-w-xl mx-auto">
            Discover a curated collection of the world's most exquisite niche
            and heritage perfumes.
          </p>
          <Link
            to="/"
            className="bg-primary text-on-primary font-label-caps uppercase px-8 py-4 hover:bg-stone-800 transition-colors inline-flex"
          >
            Discover the Collection
          </Link>
        </div>
      </header>
      <section className="max-w-container-max mx-auto px-margin-edge py-stack-lg">
        <div className="flex justify-between items-end mb-stack-md">
          <h2 className="font-headline-lg text-primary">Featured Fragrances</h2>
          <Link
            className="font-label-caps uppercase text-primary border-b border-primary pb-1"
            to="/"
          >
            View All
          </Link>
        </div>
        {loading ? (
          <p className="text-on-surface-variant">Loading products...</p>
        ) : error ? (
          <p className="text-error">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {items.map((product) => {
              const id = product.id || product._id;
              return (
                <Link to={`/product/${id}`} className="group" key={id}>
                  <div className="aspect-[3/4] bg-surface-container-low mb-unit overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={product.imageUrl || fallbackImage}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <div>
                      <span className="font-label-caps text-on-surface-variant uppercase mb-1 block">
                        {product.brandName || product.brand || "L'Essence"}
                      </span>
                      <h3 className="font-headline-md text-primary">
                        {product.name}
                      </h3>
                    </div>
                    <span className="font-body-md text-primary">
                      ${formatPrice(product.price)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
