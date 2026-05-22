import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import Footer from '../components/Footer';
import TopAppBar from '../components/TopAppBar';
import useCart from '../hooks/useCart';

const fallbackImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCHRbNQtSwZL6y9WfnEDAhLUrlN06GSmXMJXwvlVb9TtpIi6gQAzk5GvVJEt0_bocfrh8ozb_bpwfk6y4OBrmN9p19Lc4qzb8nYuIhWbzaaZePnX2v3IV6TVLFIkVYeJg3MrMw2OsK7oOXB710sCy_uIs2Nlk2jMhS9uASqpslziW3bL6I5tVpva4APLMNQ40oibO2pF2ShX8pibGNYpiZNyfUGZ6V9ETYkAPzMuIJCTHH_bnCH-ld-XsPWXHDzuv5wMWXfmWZ5d8iO';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const resolveProduct = (payload) =>
    payload?.data || payload?.product || payload;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(resolveProduct(data));
      } catch (err) {
        setError('Unable to load this fragrance right now.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const formatPrice = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return '—';
    return numberValue.toFixed(2);
  };

  const handleAddToBag = () => {
    if (!product) return;
    addItem(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <TopAppBar />
      <main className="pt-[120px] pb-stack-lg max-w-container-max mx-auto px-margin-edge">
        <nav className="mb-stack-md flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] uppercase">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-primary">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
          <div className="md:col-span-7 bg-surface-container-low p-stack-md flex items-center justify-center">
            <img
              alt={product.name}
              className="w-full max-w-[500px] object-contain"
              src={product.imageUrl || fallbackImage}
            />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="mb-stack-sm">
              <p className="font-label-caps uppercase text-on-surface-variant mb-unit tracking-widest">
                {product.brandName || "L'Essence"}
              </p>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-unit">
                {product.name}
              </h1>
              <p className="font-body-lg text-on-surface-variant">
                ${formatPrice(product.price)}
              </p>
            </div>
            <div className="mb-stack-md">
              <p className="text-on-surface-variant mb-stack-sm">
                {product.description ||
                  'A study in contrasts that balances luminous top notes with a grounded, mineral heart.'}
              </p>
              <div className="space-y-4 border-t border-b border-outline-variant py-stack-sm mb-stack-sm">
                <div className="flex justify-between">
                  <span className="font-label-caps uppercase">Top Notes</span>
                  <span className="text-on-surface-variant">
                    Bergamot, Sichuan Pepper
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-label-caps uppercase">Heart Notes</span>
                  <span className="text-on-surface-variant">
                    Spices, Galbanum
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center border border-outline-variant px-4 py-3 min-w-[120px] justify-between">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    remove
                  </span>
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)}>
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddToBag}
                className="flex-1 bg-primary text-on-primary font-label-caps uppercase py-3 px-6 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                Add to Bag
                <span className="material-symbols-outlined text-[18px]">
                  shopping_bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
