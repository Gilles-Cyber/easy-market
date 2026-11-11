import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Bike,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Eye,
  EyeOff,
  Heart,
  Home,
  LayoutGrid,
  LocateFixed,
  LockKeyhole,
  LogOut,
  Menu,
  Minus,
  PackageCheck,
  PackagePlus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Trash2,
  TrendingUp,
  Truck,
  Upload,
  UserRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type Page = "home" | "catalog" | "product" | "cart" | "checkout" | "auth" | "seller" | "tracking";
type Category = "Tous" | "Mode" | "Téléphones" | "Alimentation" | "Beauté" | "Accessoires";
type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "Tous">;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A55 5G",
    category: "Téléphones",
    price: 219000,
    oldPrice: 245000,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1757710436034-f1d7372ec1be?auto=format&fit=crop&w=900&q=85",
    seller: "Tech House Douala",
    badge: "-11%",
  },
  {
    id: 2,
    name: "Baskets urbaines Kente",
    category: "Mode",
    price: 18500,
    rating: 4.7,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1761244698434-9510e77b88c2?auto=format&fit=crop&w=900&q=85",
    seller: "Afro Chic Store",
    badge: "Tendance",
  },
  {
    id: 3,
    name: "Casque Bluetooth Pro",
    category: "Accessoires",
    price: 27500,
    oldPrice: 32000,
    rating: 4.6,
    reviews: 64,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=85",
    seller: "Digital Market",
    badge: "-14%",
  },
  {
    id: 4,
    name: "Riz parfumé & poisson braisé",
    category: "Alimentation",
    price: 4500,
    rating: 4.9,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&w=900&q=85",
    seller: "Chez Mama Grâce",
    badge: "Livraison rapide",
  },
  {
    id: 5,
    name: "Sérum naturel éclat",
    category: "Beauté",
    price: 9500,
    rating: 4.7,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1688413467228-296b52dc4a34?auto=format&fit=crop&w=900&q=85",
    seller: "Glow Cameroun",
  },
  {
    id: 6,
    name: "Sac à main floral",
    category: "Mode",
    price: 15900,
    oldPrice: 19000,
    rating: 4.5,
    reviews: 39,
    image:
      "https://images.unsplash.com/photo-1580137009935-79e9440005f2?auto=format&fit=crop&w=900&q=85",
    seller: "Maison Nelly",
    badge: "-16%",
  },
  {
    id: 7,
    name: "Poulet DG familial",
    category: "Alimentation",
    price: 8500,
    rating: 4.8,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?auto=format&fit=crop&w=900&q=85",
    seller: "Saveurs du Mboa",
  },
  {
    id: 8,
    name: "Crème hydratante Karité",
    category: "Beauté",
    price: 7000,
    rating: 4.6,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1770048792338-aaf6a575305f?auto=format&fit=crop&w=900&q=85",
    seller: "Pure Beauty CM",
  },
];

const categories = [
  { name: "Mode", icon: ShoppingBag, color: "bg-[#fdf1e8] text-[#e56b1f]" },
  { name: "Téléphones", icon: Phone, color: "bg-[#e5f4ed] text-[#14794b]" },
  { name: "Alimentation", icon: Sparkles, color: "bg-[#fff4d9] text-[#b97900]" },
  { name: "Beauté", icon: Heart, color: "bg-[#fdebf0] text-[#c7476e]" },
  { name: "Accessoires", icon: Zap, color: "bg-[#eeeafd] text-[#6654c7]" },
] as const;

const formatPrice = (price: number) => `${price.toLocaleString("fr-FR")} FCFA`;

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center gap-2"
      aria-label="Accueil Easy Market"
    >
      <span className="grid size-10 place-items-center rounded-[14px] bg-[#168957] text-white shadow-[0_8px_24px_rgba(22,137,87,.24)]">
        <ShoppingBag size={21} strokeWidth={2.5} />
      </span>
      <span className="text-[21px] font-extrabold tracking-[-.04em] text-[#123b2b]">
        Easy<span className="text-[#f0782b]">Market</span>
      </span>
    </button>
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = useState<Record<number, number>>({ 4: 1 });
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Tous");
  const [maxPrice, setMaxPrice] = useState(250000);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const cartTotal = Object.entries(cart).reduce(
    (sum, [id, qty]) =>
      sum + (products.find((product) => product.id === Number(id))?.price || 0) * qty,
    0,
  );

  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    showToast("Produit ajouté au panier");
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate("product");
  };

  const runSearch = () => navigate("catalog");

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#18352a]">
      <header className="sticky top-0 z-40 border-b border-[#dfe7e2] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo onClick={() => navigate("home")} />
          <div className="relative mx-auto hidden max-w-xl flex-1 md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#708077]" size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && runSearch()}
              placeholder="Que recherchez-vous aujourd’hui ?"
              className="h-11 w-full rounded-full border border-[#dbe5df] bg-[#f4f7f5] pl-11 pr-28 text-sm outline-none transition focus:border-[#168957] focus:bg-white focus:ring-4 focus:ring-[#168957]/10"
            />
            <button
              onClick={runSearch}
              className="absolute right-1.5 top-1.5 h-8 rounded-full bg-[#168957] px-5 text-xs font-bold text-white"
            >
              Rechercher
            </button>
          </div>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <button onClick={() => navigate("seller")} className="nav-link">
              <Store size={18} /> Vendre
            </button>
            <button onClick={() => navigate("tracking")} className="nav-link">
              <PackageCheck size={18} /> Suivi
            </button>
            <button onClick={() => navigate("auth")} className="nav-link">
              <CircleUserRound size={19} /> Compte
            </button>
          </nav>
          <button
            onClick={() => navigate("cart")}
            className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#eef6f1] text-[#146c47]"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-[#f0782b] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-11 place-items-center rounded-full border border-[#dfe7e2] lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#708077]" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && runSearch()}
              placeholder="Rechercher un produit..."
              className="h-11 w-full rounded-full bg-[#f2f5f3] pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#168957]/30"
            />
          </div>
        </div>
        {menuOpen && (
          <div className="absolute right-4 top-[70px] z-50 w-64 rounded-2xl border border-[#e1e7e3] bg-white p-2 shadow-2xl lg:hidden">
            {[
              ["Catalogue", "catalog", LayoutGrid],
              ["Espace vendeur", "seller", Store],
              ["Suivi de commande", "tracking", PackageCheck],
              ["Connexion", "auth", UserRound],
            ].map(([label, target, Icon]) => (
              <button
                key={label as string}
                onClick={() => navigate(target as Page)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-[#f1f7f3]"
              >
                <Icon size={18} /> {label as string}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pb-24 md:pb-8">
        {page === "home" && (
          <HomePage
            navigate={navigate}
            openProduct={openProduct}
            addToCart={addToCart}
            favorites={favorites}
            setFavorites={setFavorites}
            setCategory={setCategory}
          />
        )}
        {page === "catalog" && (
          <CatalogPage
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            openProduct={openProduct}
            addToCart={addToCart}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {page === "product" && (
          <ProductDetail
            product={selectedProduct}
            navigate={navigate}
            addToCart={addToCart}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {page === "cart" && (
          <CartPage cart={cart} setCart={setCart} total={cartTotal} navigate={navigate} />
        )}
        {page === "checkout" && (
          <CheckoutPage total={cartTotal} navigate={navigate} showToast={showToast} />
        )}
        {page === "auth" && <AuthPage navigate={navigate} showToast={showToast} />}
        {page === "seller" && <SellerPage navigate={navigate} showToast={showToast} />}
        {page === "tracking" && <TrackingPage navigate={navigate} />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dfe7e2] bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-sm justify-between">
          <MobileNav
            active={page === "home"}
            icon={Home}
            label="Accueil"
            onClick={() => navigate("home")}
          />
          <MobileNav
            active={page === "catalog" || page === "product"}
            icon={LayoutGrid}
            label="Catalogue"
            onClick={() => navigate("catalog")}
          />
          <MobileNav
            active={page === "cart" || page === "checkout"}
            icon={ShoppingCart}
            label="Panier"
            onClick={() => navigate("cart")}
            badge={cartCount}
          />
          <MobileNav
            active={page === "tracking"}
            icon={PackageCheck}
            label="Suivi"
            onClick={() => navigate("tracking")}
          />
          <MobileNav
            active={page === "auth" || page === "seller"}
            icon={UserRound}
            label="Compte"
            onClick={() => navigate("auth")}
          />
        </div>
      </nav>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#153f30] px-5 py-3 text-sm font-semibold text-white shadow-2xl md:bottom-8">
          <Check size={17} className="text-[#6de4a8]" /> {toast}
        </div>
      )}
    </div>
  );
}

function MobileNav({
  active,
  icon: Icon,
  label,
  onClick,
  badge,
}: {
  active: boolean;
  icon: typeof Home;
  label: string;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold ${active ? "bg-[#e8f5ed] text-[#14794b]" : "text-[#738078]"}`}
    >
      <Icon size={20} strokeWidth={active ? 2.7 : 2} />
      {label}
      {!!badge && (
        <span className="absolute right-1 top-0 grid size-4 place-items-center rounded-full bg-[#f0782b] text-[9px] text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

function HomePage({ navigate, openProduct, addToCart, favorites, setFavorites, setCategory }: any) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#123f2e] text-white shadow-[0_20px_60px_rgba(19,63,46,.18)]">
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <div className="relative grid min-h-[400px] items-center lg:grid-cols-[1.05fr_.95fr]">
            <div className="z-10 px-6 py-10 sm:px-12 lg:px-16">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                <Sparkles size={15} className="text-[#ffc16b]" /> Le marché camerounais, plus proche
                de vous
              </span>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-.045em] sm:text-5xl lg:text-[58px]">
                Tout ce qu’il vous faut, <span className="text-[#ff9d4d]">livré simplement.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Des produits d’ici et d’ailleurs, vendus par des commerçants de confiance près de
                chez vous.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("catalog")}
                  className="btn-primary bg-[#f0782b] hover:bg-[#df681d]"
                >
                  Explorer le catalogue <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("seller")}
                  className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/15"
                >
                  Devenir vendeur
                </button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/75">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-[#74dca9]" /> Paiements sécurisés
                </span>
                <span className="flex items-center gap-2">
                  <Truck size={17} className="text-[#74dca9]" /> Livraison à Douala
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck size={17} className="text-[#74dca9]" /> Vendeurs vérifiés
                </span>
              </div>
            </div>
            <div className="relative hidden h-full min-h-[400px] lg:block">
              <div className="absolute -bottom-12 right-8 h-[420px] w-[430px] rotate-3 overflow-hidden rounded-[40px] border-[10px] border-white/10">
                <img
                  src={products[1].image}
                  className="h-full w-full object-cover"
                  alt="Baskets tendance disponibles sur Easy Market"
                />
              </div>
              <div className="absolute bottom-10 left-3 z-10 rounded-2xl bg-white p-4 text-[#193a2c] shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#e8f6ee] text-[#178455]">
                    <TrendingUp size={20} />
                  </span>
                  <div>
                    <p className="text-xs text-[#758279]">Nouveaux vendeurs</p>
                    <p className="font-extrabold">+120 ce mois</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Tout un marché"
          title="Explorez par catégorie"
          action="Tout voir"
          onAction={() => navigate("catalog")}
        />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-5">
          {categories.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              onClick={() => {
                setCategory(name);
                navigate("catalog");
              }}
              className="group rounded-2xl border border-[#e3e8e5] bg-white p-3 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-5"
            >
              <span
                className={`mx-auto grid size-12 place-items-center rounded-2xl transition group-hover:scale-105 sm:size-16 ${color}`}
              >
                <Icon size={26} />
              </span>
              <span className="mt-3 block text-xs font-bold sm:text-sm">{name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section pt-2">
        <SectionHeading
          eyebrow="Les coups de cœur"
          title="Produits populaires"
          action="Voir le catalogue"
          onAction={() => navigate("catalog")}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openProduct={openProduct}
              addToCart={addToCart}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      </section>

      <section className="section pt-4">
        <div className="grid overflow-hidden rounded-[28px] bg-[#f7d7b7] lg:grid-cols-2">
          <div className="px-7 py-10 sm:px-12 sm:py-14">
            <span className="inline-flex rounded-full bg-[#f0782b] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white">
              Offre de la semaine
            </span>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold tracking-[-.04em] text-[#492512] sm:text-4xl">
              Jusqu’à -30% sur la tech et les accessoires
            </h2>
            <p className="mt-4 text-[#704b36]">
              Équipez-vous sans dépasser votre budget. Offre valable dans la limite des stocks
              disponibles.
            </p>
            <button onClick={() => navigate("catalog")} className="btn-primary mt-7 bg-[#193f30]">
              Profiter de l’offre <ArrowRight size={18} />
            </button>
          </div>
          <div className="relative min-h-64 overflow-hidden">
            <img
              src={products[0].image}
              className="absolute inset-0 h-full w-full object-cover"
              alt="Promotion smartphones"
            />
          </div>
        </div>
      </section>

      <section className="section grid gap-3 pb-16 sm:grid-cols-3">
        {[
          [Bike, "Livraison rapide", "À Douala en 24 à 48h"],
          [WalletCards, "Paiement flexible", "Orange Money, MTN MoMo ou espèces"],
          [ShieldCheck, "Achats sereins", "Vendeurs contrôlés et assistance locale"],
        ].map(([Icon, title, text]) => (
          <div
            key={title as string}
            className="flex items-center gap-4 rounded-2xl border border-[#e2e8e4] bg-white p-5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e8f5ed] text-[#178455]">
              <Icon size={23} />
            </span>
            <div>
              <h3 className="font-extrabold">{title as string}</h3>
              <p className="mt-1 text-sm text-[#718078]">{text as string}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="mb-5 flex items-end justify-between sm:mb-7">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#f0782b]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-[-.035em] sm:text-3xl">{title}</h2>
      </div>
      <button
        onClick={onAction}
        className="flex items-center gap-1 text-xs font-extrabold text-[#14794b] sm:text-sm"
      >
        {action}
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function ProductCard({ product, openProduct, addToCart, favorites, setFavorites }: any) {
  const liked = favorites.includes(product.id);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#e0e7e2] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(31,65,49,.12)]">
      <button
        onClick={() =>
          setFavorites((current: number[]) =>
            current.includes(product.id)
              ? current.filter((id) => id !== product.id)
              : [...current, product.id],
          )
        }
        className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur"
        aria-label="Ajouter aux favoris"
      >
        <Heart size={18} className={liked ? "fill-[#ef6f5e] text-[#ef6f5e]" : "text-[#53675d]"} />
      </button>
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#f0782b] px-2.5 py-1 text-[10px] font-extrabold text-white">
          {product.badge}
        </span>
      )}
      <button
        onClick={() => openProduct(product)}
        className="block aspect-[1/1.03] w-full overflow-hidden bg-[#f0f2ef]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </button>
      <div className="p-3.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#168957]">
          {product.category}
        </p>
        <button
          onClick={() => openProduct(product)}
          className="mt-1.5 line-clamp-2 min-h-10 text-left text-sm font-extrabold leading-5 sm:text-[15px]"
        >
          {product.name}
        </button>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-[#6d7c73]">
          <Star size={13} className="fill-[#f3a83b] text-[#f3a83b]" />
          <b className="text-[#3d4d44]">{product.rating}</b> ({product.reviews})
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-sm font-black text-[#143e2d] sm:text-base">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-[10px] text-[#8c978f] line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#168957] text-white transition hover:bg-[#116d45]"
            aria-label="Ajouter au panier"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CatalogPage({
  search,
  setSearch,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  openProduct,
  addToCart,
  favorites,
  setFavorites,
}: any) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "Tous" || product.category === category) &&
          product.price <= maxPrice &&
          product.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, category, maxPrice],
  );

  return (
    <section className="section min-h-[75vh]">
      <div className="mb-7 rounded-[24px] bg-[#e5f2ea] px-6 py-8 sm:px-10">
        <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#168957]">
          Le marché à portée de main
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
          Découvrez tous nos produits
        </h1>
        <p className="mt-2 text-sm text-[#65776d]">
          Des milliers de bonnes affaires proposées par nos vendeurs camerounais.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-b border-[#dde5e0] pb-5">
        <p className="text-sm">
          <b>{filtered.length} produits</b> trouvés
        </p>
        <div className="flex gap-2">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-small lg:hidden">
            <SlidersHorizontal size={16} /> Filtres
          </button>
          <button className="btn-small">
            Pertinence <ChevronDown size={16} />
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-7 lg:grid-cols-[240px_1fr]">
        <aside
          className={`${filtersOpen ? "block" : "hidden"} h-fit rounded-2xl border border-[#e0e7e2] bg-white p-5 lg:block`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Filtres</h3>
            <button
              onClick={() => {
                setCategory("Tous");
                setMaxPrice(250000);
              }}
              className="text-xs font-bold text-[#f0782b]"
            >
              Réinitialiser
            </button>
          </div>
          <div className="mt-6">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#748279]">
              Catégories
            </h4>
            <div className="mt-3 space-y-1">
              {["Tous", ...categories.map((item) => item.name)].map((name) => (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold ${category === name ? "bg-[#e8f5ed] text-[#14794b]" : "hover:bg-[#f4f6f4]"}`}
                >
                  {name}
                  <span className="text-xs text-[#89948e]">
                    {name === "Tous"
                      ? products.length
                      : products.filter((p) => p.category === name).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-[#e7ebe8] pt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#748279]">
              Prix maximum
            </h4>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-5 w-full accent-[#168957]"
            />
            <div className="mt-2 flex justify-between text-xs font-bold">
              <span>5 000</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>
        </aside>
        <div>
          {(search || category !== "Tous") && (
            <div className="mb-5 flex flex-wrap gap-2">
              {search && (
                <span className="filter-pill">
                  Recherche : “{search}”{" "}
                  <button onClick={() => setSearch("")}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {category !== "Tous" && (
                <span className="filter-pill">
                  {category}{" "}
                  <button onClick={() => setCategory("Tous")}>
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
          {filtered.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openProduct={openProduct}
                  addToCart={addToCart}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#cfdad3] bg-white py-20 text-center">
              <Search className="mx-auto text-[#91a098]" size={35} />
              <h3 className="mt-4 font-extrabold">Aucun produit trouvé</h3>
              <p className="mt-2 text-sm text-[#718078]">
                Essayez un autre mot-clé ou modifiez vos filtres.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductDetail({ product, navigate, addToCart, favorites, setFavorites }: any) {
  const [qty, setQty] = useState(1);
  const liked = favorites.includes(product.id);
  return (
    <section className="section">
      <button
        onClick={() => navigate("catalog")}
        className="mb-5 flex items-center gap-2 text-sm font-bold text-[#607168]"
      >
        <ArrowLeft size={18} /> Retour au catalogue
      </button>
      <div className="grid gap-8 lg:grid-cols-[1.04fr_.96fr]">
        <div>
          <div className="aspect-square overflow-hidden rounded-[28px] bg-[#ecefeb]">
            <img src={product.image} className="h-full w-full object-cover" alt={product.name} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.image, products[2].image, products[4].image, products[5].image].map(
              (image, index) => (
                <button
                  key={image}
                  className={`aspect-square overflow-hidden rounded-xl border-2 ${index === 0 ? "border-[#168957]" : "border-transparent opacity-70"}`}
                >
                  <img src={image} className="h-full w-full object-cover" alt="" />
                </button>
              ),
            )}
          </div>
        </div>
        <div className="lg:py-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-[#e6f4ec] px-3 py-1.5 text-xs font-extrabold text-[#14794b]">
                {product.category}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              onClick={() =>
                setFavorites((current: number[]) =>
                  current.includes(product.id)
                    ? current.filter((id) => id !== product.id)
                    : [...current, product.id],
                )
              }
              className="grid size-11 shrink-0 place-items-center rounded-full border border-[#dce4df] bg-white"
            >
              <Heart size={21} className={liked ? "fill-[#ef6f5e] text-[#ef6f5e]" : ""} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 rounded-lg bg-[#fff3da] px-2 py-1 font-bold">
              <Star size={15} className="fill-[#eea32c] text-[#eea32c]" /> {product.rating}
            </span>
            <span className="text-[#6d7b73]">{product.reviews} avis clients</span>
          </div>
          <div className="mt-7 flex items-end gap-3">
            <p className="text-3xl font-black text-[#168957]">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="pb-1 text-sm text-[#8e9992] line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <div className="my-7 border-y border-[#e1e7e3] py-6">
            <h3 className="font-extrabold">Description</h3>
            <p className="mt-3 leading-7 text-[#64756c]">
              Un produit soigneusement sélectionné pour sa qualité et son excellent rapport
              qualité-prix. Livraison rapide à Douala et emballage sécurisé. Stock limité chez ce
              vendeur.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-[#e1e7e3]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#e7f4ec] font-extrabold text-[#168957]">
                {product.seller.charAt(0)}
              </span>
              <div className="flex-1">
                <p className="text-xs text-[#76847c]">Vendu par</p>
                <p className="font-extrabold">{product.seller}</p>
              </div>
              <BadgeCheck className="text-[#168957]" size={21} />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="flex h-14 items-center rounded-2xl border border-[#dce4df] bg-white p-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid size-11 place-items-center rounded-xl hover:bg-[#f0f4f1]"
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-extrabold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid size-11 place-items-center rounded-xl hover:bg-[#f0f4f1]"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(product.id);
              }}
              className="btn-primary h-14 flex-1 justify-center"
            >
              <ShoppingCart size={20} /> Ajouter au panier
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold text-[#5d7065]">
            <span className="flex items-center gap-2">
              <Truck size={18} className="text-[#168957]" /> Livraison 24–48h
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#168957]" /> Achat protégé
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartPage({ cart, setCart, total, navigate }: any) {
  const entries = Object.entries(cart).filter(([, qty]) => (qty as number) > 0);
  const delivery = total > 0 ? 1500 : 0;
  return (
    <section className="section">
      <div className="mb-7">
        <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#f0782b]">
          Votre sélection
        </p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Mon panier</h1>
      </div>
      {!entries.length ? (
        <div className="rounded-[28px] border border-dashed border-[#cad8cf] bg-white py-20 text-center">
          <ShoppingCart size={44} className="mx-auto text-[#9aaca1]" />
          <h2 className="mt-5 text-xl font-extrabold">Votre panier est vide</h2>
          <p className="mt-2 text-sm text-[#718078]">
            Découvrez les produits de nos vendeurs locaux.
          </p>
          <button onClick={() => navigate("catalog")} className="btn-primary mx-auto mt-6">
            Voir le catalogue
          </button>
        </div>
      ) : (
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {entries.map(([id, quantity]) => {
              const product = products.find((item) => item.id === Number(id))!;
              const qty = quantity as number;
              return (
                <div
                  key={id}
                  className="flex gap-4 rounded-2xl border border-[#e0e7e2] bg-white p-3 sm:p-4"
                >
                  <img
                    src={product.image}
                    className="size-24 rounded-xl object-cover sm:size-28"
                    alt={product.name}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#168957]">
                          {product.category}
                        </p>
                        <h3 className="mt-1 font-extrabold">{product.name}</h3>
                        <p className="mt-1 hidden text-xs text-[#718078] sm:block">
                          Vendu par {product.seller}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setCart((current: any) => {
                            const next = { ...current };
                            delete next[Number(id)];
                            return next;
                          })
                        }
                        className="self-start text-[#92a097] hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center rounded-xl border border-[#dce4df]">
                        <button
                          onClick={() =>
                            setCart((current: any) => ({ ...current, [id]: Math.max(0, qty - 1) }))
                          }
                          className="grid size-8 place-items-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setCart((current: any) => ({ ...current, [id]: qty + 1 }))}
                          className="grid size-8 place-items-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-black text-[#153f30]">
                        {formatPrice(product.price * qty)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <OrderSummary
            total={total}
            delivery={delivery}
            onClick={() => navigate("checkout")}
            label="Passer la commande"
          />
        </div>
      )}
    </section>
  );
}

function OrderSummary({
  total,
  delivery,
  onClick,
  label,
}: {
  total: number;
  delivery: number;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <aside className="h-fit rounded-[22px] bg-[#153f30] p-6 text-white lg:sticky lg:top-24">
      <h2 className="text-xl font-extrabold">Résumé</h2>
      <div className="mt-6 space-y-3 text-sm text-white/70">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <b className="text-white">{formatPrice(total)}</b>
        </div>
        <div className="flex justify-between">
          <span>Livraison</span>
          <b className="text-white">{formatPrice(delivery)}</b>
        </div>
      </div>
      <div className="my-5 border-t border-white/15" />
      <div className="flex items-end justify-between">
        <span className="font-bold">Total</span>
        <b className="text-xl">{formatPrice(total + delivery)}</b>
      </div>
      {onClick && (
        <button
          onClick={onClick}
          className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#f0782b] font-extrabold hover:bg-[#df681d]"
        >
          {label}
          <ArrowRight size={18} />
        </button>
      )}
      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/60">
        <LockKeyhole size={13} /> Paiement 100% sécurisé
      </p>
    </aside>
  );
}

function CheckoutPage({ total, navigate, showToast }: any) {
  const [payment, setPayment] = useState("Orange Money");
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setDone(true);
    showToast("Commande confirmée avec succès");
  };
  if (done)
    return (
      <section className="section max-w-3xl text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#dff4e8] text-[#168957]">
          <Check size={38} strokeWidth={3} />
        </div>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[.15em] text-[#168957]">
          Commande confirmée
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em]">Merci pour votre achat !</h1>
        <p className="mx-auto mt-3 max-w-lg text-[#697970]">
          Votre commande <b>#EM-24058</b> a bien été reçue. Nous vous informerons dès qu’elle sera
          en route.
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#dfe7e2] bg-white p-5 text-left">
          <div className="flex justify-between text-sm">
            <span>Total payé</span>
            <b>{formatPrice(total + 1500)}</b>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span>Mode de paiement</span>
            <b>{payment}</b>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate("tracking")} className="btn-primary">
            <PackageCheck size={18} /> Suivre ma commande
          </button>
          <button onClick={() => navigate("home")} className="btn-secondary">
            Retour à l’accueil
          </button>
        </div>
      </section>
    );
  return (
    <section className="section">
      <button
        onClick={() => navigate("cart")}
        className="mb-5 flex items-center gap-2 text-sm font-bold text-[#607168]"
      >
        <ArrowLeft size={18} /> Retour au panier
      </button>
      <h1 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
        Finaliser ma commande
      </h1>
      <form onSubmit={submit} className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="form-card">
            <div className="form-title">
              <span>1</span>
              <h2>Informations de livraison</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet" placeholder="Ex. Marie Ngo Bika" required />
              <Field label="Téléphone" placeholder="+237 6 99 00 00 00" required />
              <div className="sm:col-span-2">
                <Field
                  label="Adresse de livraison"
                  placeholder="Quartier, rue, repère..."
                  required
                />
              </div>
              <Field label="Ville" placeholder="Douala" required />
              <Field label="Quartier" placeholder="Bonamoussadi" required />
            </div>
          </div>
          <div className="form-card">
            <div className="form-title">
              <span>2</span>
              <h2>Mode de paiement</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Orange Money", "OM", "bg-[#ff7900]"],
                ["MTN MoMo", "MoMo", "bg-[#ffcc00] text-black"],
                ["Espèces", "Cash", "bg-[#168957]"],
              ].map(([name, short, color]) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setPayment(name)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition ${payment === name ? "border-[#168957] bg-[#f0f8f3]" : "border-[#e1e7e3] bg-white"}`}
                >
                  {payment === name && (
                    <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-[#168957] text-white">
                      <Check size={12} />
                    </span>
                  )}
                  <span
                    className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-black text-white ${color}`}
                  >
                    {short}
                  </span>
                  <p className="mt-3 text-sm font-extrabold">
                    {name === "Espèces" ? "À la livraison" : name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <OrderSummary total={total} delivery={1500} />
          <button type="submit" className="btn-primary mt-3 h-14 w-full justify-center">
            Confirmer la commande <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#43574c]">{label}</span>
      <input type={type} placeholder={placeholder} required={required} className="field" />
    </label>
  );
}

function AuthPage({ navigate, showToast }: any) {
  const [register, setRegister] = useState(false);
  const [visible, setVisible] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    showToast(register ? "Compte créé avec succès" : "Connexion réussie");
    navigate("home");
  };
  return (
    <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:grid-cols-2">
      <div className="hidden h-[620px] overflow-hidden rounded-[30px] bg-[#153f30] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo onClick={() => navigate("home")} />
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
            Achetez local, vivez mieux
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-[-.04em]">
            Votre marché, partout avec vous.
          </h2>
          <p className="mt-4 leading-7 text-white/70">
            Retrouvez vos boutiques favorites, suivez vos commandes et profitez d’offres exclusives.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/70">
          <ShieldCheck className="text-[#6ee1a6]" /> Vos données sont protégées
        </div>
      </div>
      <div className="mx-auto w-full max-w-md py-6 lg:px-10">
        <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#f0782b]">
          {register ? "Bienvenue chez Easy Market" : "Ravi de vous revoir"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em]">
          {register ? "Créer un compte" : "Se connecter"}
        </h1>
        <p className="mt-2 text-sm text-[#718078]">
          {register
            ? "Rejoignez des milliers d’acheteurs au Cameroun."
            : "Connectez-vous pour retrouver votre compte."}
        </p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          {register && <Field label="Nom complet" placeholder="Votre nom et prénom" required />}
          <Field
            label={register ? "Téléphone" : "Téléphone ou e-mail"}
            placeholder={register ? "+237 6 99 00 00 00" : "Votre identifiant"}
            required
          />
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold">Mot de passe</span>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="8 caractères minimum"
                required
                className="field pr-12"
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77857d]"
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button type="submit" className="btn-primary h-13 w-full justify-center">
            {register ? "Créer mon compte" : "Se connecter"} <ArrowRight size={18} />
          </button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-[#9aa49e]">
          <span className="h-px flex-1 bg-[#dfe5e1]" /> ou{" "}
          <span className="h-px flex-1 bg-[#dfe5e1]" />
        </div>
        <button
          onClick={() => setRegister(!register)}
          className="btn-secondary h-12 w-full justify-center"
        >
          {register ? "J’ai déjà un compte" : "Créer un nouveau compte"}
        </button>
      </div>
    </section>
  );
}

function SellerPage({ navigate, showToast }: any) {
  const [adding, setAdding] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAdding(false);
    showToast("Produit publié avec succès");
  };
  return (
    <section className="section">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#f0782b]">
            Espace vendeur
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-[-.04em]">Bonjour, Maison Nelly</h1>
          <p className="mt-1 text-sm text-[#718078]">
            Voici l’activité de votre boutique aujourd’hui.
          </p>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary">
          <Plus size={19} /> Ajouter un produit
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            WalletCards,
            "Chiffre d’affaires",
            "486 500 FCFA",
            "+12,4%",
            "bg-[#e4f4ea] text-[#14794b]",
          ],
          [ShoppingBag, "Commandes", "28", "+5 cette semaine", "bg-[#fef0e5] text-[#e76e21]"],
          [Box, "Produits actifs", "42", "3 en rupture", "bg-[#e9edf8] text-[#526da9]"],
          [Star, "Note boutique", "4,8 / 5", "124 avis", "bg-[#fff3d9] text-[#c8840b]"],
        ].map(([Icon, label, value, detail, color]) => (
          <div key={label as string} className="rounded-2xl border border-[#e0e7e2] bg-white p-5">
            <span className={`grid size-11 place-items-center rounded-xl ${color}`}>
              <Icon size={21} />
            </span>
            <p className="mt-5 text-xs font-semibold text-[#76847c]">{label as string}</p>
            <p className="mt-1 text-xl font-black">{value as string}</p>
            <p className="mt-1 text-xs font-semibold text-[#168957]">{detail as string}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
        <div className="rounded-2xl border border-[#e0e7e2] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Ventes des 7 derniers jours</h2>
            <button className="btn-small">
              Cette semaine <ChevronDown size={15} />
            </button>
          </div>
          <div className="mt-8 flex h-52 items-end justify-between gap-3 border-b border-[#dfe5e1] px-2">
            {[42, 58, 38, 76, 62, 90, 72].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-10 rounded-t-lg bg-[#168957]"
                  style={{ height: `${height}%`, opacity: 0.55 + index * 0.06 }}
                />
                <span className="text-[10px] font-bold text-[#829087]">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#153f30] p-6 text-white">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
            <Sparkles />
          </span>
          <h2 className="mt-8 text-2xl font-extrabold">Faites grandir vos ventes</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Ajoutez de belles photos et une description détaillée pour gagner la confiance des
            clients.
          </p>
          <button
            onClick={() => setAdding(true)}
            className="mt-6 flex items-center gap-2 text-sm font-extrabold text-[#ff9d4d]"
          >
            Publier maintenant <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <div className="mt-7 rounded-2xl border border-[#e0e7e2] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Produits récents</h2>
          <button className="text-sm font-bold text-[#168957]">Gérer les produits</button>
        </div>
        <div className="mt-5 space-y-3">
          {products.slice(5, 8).map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border-t border-[#edf0ee] pt-3"
            >
              <img src={product.image} className="size-12 rounded-xl object-cover" alt="" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{product.name}</p>
                <p className="text-xs text-[#76847c]">{formatPrice(product.price)}</p>
              </div>
              <span className="rounded-full bg-[#e6f4ec] px-2.5 py-1 text-[10px] font-bold text-[#168957]">
                En ligne
              </span>
            </div>
          ))}
        </div>
      </div>
      {adding && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0e2a20]/65 p-4 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[26px] bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#168957]">
                  Nouveau produit
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">Ajouter au catalogue</h2>
              </div>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="grid size-10 place-items-center rounded-full bg-[#f2f5f3]"
              >
                <X size={19} />
              </button>
            </div>
            <label className="mt-6 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#bdd1c4] bg-[#f4f8f5] text-center">
              <Upload className="text-[#168957]" />
              <b className="mt-2 text-sm">Ajouter une photo</b>
              <span className="mt-1 text-xs text-[#7b8880]">PNG ou JPG, 5 Mo maximum</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
            <div className="mt-5 space-y-4">
              <Field label="Nom du produit" placeholder="Ex. Sandales artisanales" required />
              <Field label="Prix (FCFA)" placeholder="15 000" type="number" required />
              <label className="block">
                <span className="mb-2 block text-xs font-extrabold">Catégorie</span>
                <select className="field">
                  <option>Mode</option>
                  <option>Téléphones</option>
                  <option>Alimentation</option>
                  <option>Beauté</option>
                  <option>Accessoires</option>
                </select>
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6 h-13 w-full justify-center">
              <PackagePlus size={19} /> Publier le produit
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

function TrackingPage({ navigate }: any) {
  const steps = [
    {
      title: "Commande reçue",
      detail: "Votre commande a été enregistrée",
      time: "Aujourd’hui, 09:15",
      icon: Check,
      done: true,
    },
    {
      title: "Commande confirmée",
      detail: "Le vendeur prépare vos articles",
      time: "Aujourd’hui, 09:42",
      icon: PackageCheck,
      done: true,
    },
    {
      title: "En cours de livraison",
      detail: "Le livreur récupérera bientôt votre colis",
      time: "Prévu demain",
      icon: Truck,
      done: false,
    },
    {
      title: "Commande livrée",
      detail: "Remise à votre adresse",
      time: "Prévu sous 48h",
      icon: Home,
      done: false,
    },
  ];
  return (
    <section className="section max-w-5xl">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#f0782b]">
          Restez informé
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
          Suivre ma commande
        </h1>
        <p className="mt-2 text-sm text-[#718078]">
          Entrez votre référence ou consultez la commande en cours.
        </p>
      </div>
      <div className="mx-auto mt-8 flex max-w-xl gap-2 rounded-2xl border border-[#dce5df] bg-white p-2">
        <input
          defaultValue="EM-24058"
          className="min-w-0 flex-1 px-3 text-sm font-semibold outline-none"
        />
        <button className="btn-primary h-11 px-5">
          <Search size={17} /> <span className="hidden sm:inline">Rechercher</span>
        </button>
      </div>
      <div className="mt-9 grid gap-6 lg:grid-cols-[.62fr_1.38fr]">
        <div className="rounded-[24px] bg-[#153f30] p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#f0782b] px-3 py-1.5 text-[10px] font-extrabold uppercase">
              En préparation
            </span>
            <Bell size={19} className="text-white/70" />
          </div>
          <p className="mt-7 text-xs text-white/60">Commande</p>
          <h2 className="mt-1 text-2xl font-extrabold">#EM-24058</h2>
          <div className="my-6 border-t border-white/15" />
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <Clock3 size={18} className="shrink-0 text-[#76dfa9]" />
              <div>
                <p className="font-bold">Livraison estimée</p>
                <p className="mt-1 text-white/60">Demain, entre 10h et 16h</p>
              </div>
            </div>
            <div className="flex gap-3">
              <LocateFixed size={18} className="shrink-0 text-[#76dfa9]" />
              <div>
                <p className="font-bold">Adresse</p>
                <p className="mt-1 text-white/60">Bonamoussadi, Douala</p>
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
            <img src={products[3].image} className="size-12 rounded-xl object-cover" alt="" />
            <div>
              <p className="text-xs font-bold">{products[3].name}</p>
              <p className="mt-1 text-[11px] text-white/55">
                1 article · {formatPrice(products[3].price)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-[#e0e7e2] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Progression de la livraison</h2>
          <div className="mt-7">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                {index < steps.length - 1 && (
                  <span
                    className={`absolute left-[21px] top-11 h-[calc(100%-32px)] w-0.5 ${steps[index + 1].done ? "bg-[#168957]" : "bg-[#dbe4de]"}`}
                  />
                )}
                <span
                  className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full ${step.done ? "bg-[#168957] text-white" : "bg-[#edf1ee] text-[#95a299]"}`}
                >
                  <step.icon size={19} />
                </span>
                <div className="flex flex-1 flex-wrap justify-between gap-2 pt-1">
                  <div>
                    <h3 className={`font-extrabold ${!step.done && "text-[#738179]"}`}>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#829087]">{step.detail}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#8a9790]">{step.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("home")}
            className="btn-secondary mt-7 w-full justify-center"
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
