import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  { id: 7, name: 'Can-Am Outlander 850', trim: 'XT-P · 2025', category: 'ATV', price: 14299, monthly: 187, miles: '12 hrs', fuel: 'Gasoline', transmission: 'Automatic', location: 'Phoenix, AZ', tag: 'Bestseller', color: 'Red', image: 'photo-1558981806-ec527fa84c39' },
  { id: 8, name: 'Specialized Turbo Levo', trim: 'Comp Alloy · 2025', category: 'Bicycle', price: 7499, monthly: 98, miles: 'New', fuel: 'Electric', transmission: '12-speed', location: 'Portland, OR', tag: 'Electric', color: 'Satin black', image: 'photo-1507035895480-2b3156c31fc8' },
  { id: 9, name: 'Sea-Doo Spark', trim: 'Trixx · 2025', category: 'Jet ski', price: 8999, monthly: 118, miles: '6 hrs', fuel: 'Gasoline', transmission: 'Direct drive', location: 'Orlando, FL', tag: 'Bestseller', color: 'Sunrise orange', image: 'photo-1567899378494-47b22a2ae96a' },
  { id: 10, name: 'Yamaha F150', trim: 'Four-stroke outboard · 2025', category: 'Boat engines', price: 16450, monthly: 215, miles: 'New', fuel: 'Gasoline', transmission: '150 hp', location: 'Tampa, FL', tag: 'Just in', color: 'Pearl gray', image: 'photo-1569263979104-865ab7cd8d13' }
];
const imageUrl = (source, width = 900) => source.startsWith('/') || source.startsWith('http') ? source : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=85`;
const money = n => '$' + n.toLocaleString('en-US');

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    cart: <><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    truck: <><path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="17.5" cy="19" r="1.5"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [category, setCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [tracking, setTracking] = useState('');
  const [trackingResult, setTrackingResult] = useState(false);
  const [sort, setSort] = useState('Featured');
  const filtered = useMemo(() => {
    let list = products.filter(c => (category === 'All products' || c.category === category) && `${c.name} ${c.trim} ${c.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'Price: low to high') list = [...list].sort((a,b) => a.price-b.price);
    if (sort === 'Price: high to low') list = [...list].sort((a,b) => b.price-a.price);
    return list;
  }, [category, search, sort]);
  const add = car => setCart(current => current.some(x => x.id === car.id) ? current : [...current, car]);
  const trackOrder = e => { e.preventDefault(); setTrackingResult(Boolean(tracking.trim())); };

  return <>
    <div className="announcement"><span>Thoughtful buying. Doorstep delivery.</span><a href="#delivery">See how delivery works <Icon name="arrow" size={14}/></a></div>
    <header className="nav"><a className="brand" href="#top"><span className="brand-mark">d<span>.</span></span><span>drivehouse</span></a><nav className="nav-links"><a href="#inventory">Shop products</a><a href="#delivery">How it works</a><a href="#tracking">Track delivery</a></nav><div className="nav-actions"><button className="icon-button" aria-label="Search products" onClick={() => document.getElementById('vehicle-search').focus()}><Icon name="search"/></button><button className="cart-button" onClick={() => setShowCart(true)}><Icon name="cart"/><span>Cart</span>{cart.length > 0 && <b className="cart-count">{cart.length}</b>}</button><button className="mobile-menu" onClick={() => document.getElementById('inventory').scrollIntoView({behavior:'smooth'})}>Menu</button></div></header>

    <main id="top">
      <section className="hero"><div className="hero-image"/><div className="hero-content"><div className="eyebrow"><span className="eyebrow-line"/>A better way to buy</div><h1>Good rides.<br/><em>Good to go.</em></h1><p>Find the one that feels like you. We bring it right to your door, with every mile of the journey in view.</p><a className="button button-dark" href="#inventory">Find your next ride <Icon name="arrow"/></a><div className="hero-proof"><div className="avatar-stack"><i>J</i><i>M</i><i>A</i></div><span><strong>4.9 / 5</strong> from 2,400+ happy customers</span></div></div><div className="hero-caption"><span>01 / CURATED COLLECTION</span><span>THE OPEN ROAD, YOUR WAY</span></div></section>

      <section className="trust-row"><div className="trust-item"><span className="trust-icon"><Icon name="check"/></span><span><b>Every ride, inspected</b><small>Quality checked before shipping</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="truck"/></span><span><b>Delivered to your door</b><small>On your schedule</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="check"/></span><span><b>7-day love-it guarantee</b><small>Take the time you need</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="pin"/></span><span><b>Real-time tracking</b><small>From our lot to your lot</small></span></div></section>

      <section className="inventory section" id="inventory"><div className="section-heading"><div><div className="eyebrow">THE DRIVEHOUSE EDIT</div><h2>Our most-loved <em>rides.</em></h2><p>Handpicked, road-tested, and ready for a new story.</p></div><a className="text-link" href="#inventory">Explore all inventory <Icon name="arrow"/></a></div>
        <div className="inventory-controls"><div className="tabs">{['All products','ATV','Bicycle','Jet ski','Boat engines'].map(c => <button className={category === c ? 'tab active' : 'tab'} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><div className="control-right"><label className="searchbox"><Icon name="search"/><input id="vehicle-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products"/></label><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></div></div>
        <div className="car-grid">{filtered.map(car => <article className="car-card" key={car.id}><div className="car-photo"><img src={imageUrl(car.image)} alt={`${car.name} in ${car.color}`} loading="lazy"/><span className={`tag ${car.tag === 'Bestseller' ? 'tag-green' : ''}`}>{car.tag}</span><button className="heart" aria-label={`Save ${car.name}`} onClick={e => e.currentTarget.classList.toggle('saved')}>♡</button></div><div className="car-info"><div className="car-title"><div><h3>{car.name}</h3><p>{car.trim}</p></div><span className="color-dot" title={car.color}/></div><div className="specs"><span>{car.miles}</span><i/><span>{car.fuel}</span><i/><span>{car.transmission}</span></div><div className="car-bottom"><div><strong>{money(car.price)}</strong><small>Est. {money(car.monthly)}/mo</small></div><button className="add-button" onClick={() => add(car)} aria-label={`Add ${car.name} to cart`}>{cart.some(x => x.id === car.id) ? <Icon name="check"/> : '+'}</button></div></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state">No products match that search. Try another name or category.</div>}
        <div className="inventory-foot"><span>Showing {filtered.length} of {products.length} handpicked products</span><a className="text-link" href="#inventory">View all products <Icon name="arrow"/></a></div>
      </section>

      <section className="delivery section" id="delivery"><div className="delivery-image"><img src={imageUrl('photo-1492144534655-ae79c964c9d7', 1100)} alt="A ride ready for delivery" loading="lazy"/><div className="delivery-badge"><span>YOUR ORDER,<br/>YOUR DRIVEWAY.</span><small>Easy as 1, 2, 3.</small></div></div><div className="delivery-copy"><div className="eyebrow">FROM OUR LOT TO YOURS</div><h2>The journey is<br/><em>part of the joy.</em></h2><p>Buying should feel exciting all the way to delivery. We keep you in the loop at every turn, so you know exactly when your new ride is close.</p><div className="steps"><div className="step"><b>01</b><span><strong>Choose your ride</strong><small>Find your match from our handpicked collection.</small></span></div><div className="step"><b>02</b><span><strong>We get it ready</strong><small>Our team handles the details and the paperwork.</small></span></div><div className="step"><b>03</b><span><strong>Follow every mile</strong><small>Get your tracking number and watch it come to you.</small></span></div></div><a href="#tracking" className="text-link">Learn about delivery <Icon name="arrow"/></a></div></section>

      <section className="tracking section" id="tracking"><div className="track-copy"><div className="eyebrow">THE COUNTDOWN STARTS</div><h2>Your order<br/>is <em>on its way.</em></h2><p>Already placed an order? Enter your tracking number to see where it is and when it’s expected to arrive.</p><form className="track-form" onSubmit={trackOrder}><label className="sr-only" htmlFor="tracking-number">Tracking number</label><input id="tracking-number" value={tracking} onChange={e => {setTracking(e.target.value);setTrackingResult(false)}} placeholder="Try DH-2024-01842"/><button className="button button-dark" type="submit">Track order <Icon name="arrow"/></button></form>{trackingResult && <div className="track-result"><span className="status-dot"/><div><b>On the road to you</b><small>Order {tracking.toUpperCase()} · Estimated delivery in 2–3 days</small><div className="progress"><i/></div><div className="track-meta"><span>Picked up</span><span>In transit</span><span>Delivered</span></div></div></div>}<small className="tracking-help">Your tracking number is in your order confirmation email.</small></div><div className="track-art"><div className="route-label"><span className="route-pulse"/> LIVE DELIVERY UPDATE</div><div className="route-map"><svg viewBox="0 0 520 310" preserveAspectRatio="none" aria-label="Illustration of a delivery route"><path className="route-path-bg" d="M54 248 C120 240 98 169 167 180 S215 235 264 171 S325 85 369 121 S414 182 474 65"/><path className="route-path" d="M54 248 C120 240 98 169 167 180 S215 235 264 171 S325 85 369 121 S414 182 474 65"/></svg><span className="map-pin start"><Icon name="pin" size={20}/></span><span className="map-pin end"><Icon name="pin" size={20}/></span><div className="map-car"><Icon name="truck" size={22}/></div><div className="map-card"><div className="map-card-top"><span className="status-dot"/> ON ITS WAY</div><b>Your order is getting closer.</b><small>Last updated just now</small></div></div><div className="map-legend"><span><i className="legend-dot green"/>Your order</span><span><i className="legend-dot muted"/>Destination</span></div></div></section>

      <section className="newsletter"><div><div className="eyebrow">GOOD THINGS, OCCASIONALLY</div><h2>Find the one that <em>moves you.</em></h2><p>New arrivals, thoughtful advice, and the occasional open-road daydream.</p></div><form className="newsletter-form" onSubmit={e => {e.preventDefault();e.currentTarget.innerHTML='<span class="subscribed">You’re on the list. Talk soon!</span>'}}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button type="submit" aria-label="Subscribe"><Icon name="arrow"/></button></form></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">d<span>.</span></span><span>drivehouse</span></a><span>Better rides. Better journeys.</span><div><a href="#inventory">Shop</a><a href="#delivery">Delivery</a><a href="#tracking">Track order</a></div><small>© 2025 Drivehouse Motors, Inc.</small></footer>

    {showCart && <div className="overlay" onClick={e => e.target === e.currentTarget && setShowCart(false)}><aside className="cart-drawer"><div className="drawer-head"><div><div className="eyebrow">YOUR SHORTLIST</div><h2>Your cart <span>({cart.length})</span></h2></div><button className="icon-button" aria-label="Close cart" onClick={() => setShowCart(false)}><Icon name="close"/></button></div>{cart.length ? <><div className="drawer-items">{cart.map(car => <div className="drawer-item" key={car.id}><img src={imageUrl(car.image, 240)} alt=""/><div><b>{car.name}</b><small>{car.trim}</small><strong>{money(car.price)}</strong></div><button aria-label={`Remove ${car.name}`} onClick={() => setCart(cart.filter(x => x.id !== car.id))}><Icon name="close" size={16}/></button></div>)}</div><div className="drawer-total"><span>Estimated total</span><strong>{money(cart.reduce((sum,c) => sum+c.price,0))}</strong></div><button className="button button-dark checkout" onClick={() => {setTracking('DH-2026-01842');setTrackingResult(true);setShowCart(false);document.getElementById('tracking').scrollIntoView({behavior:'smooth'})}}>Place demo order <Icon name="arrow"/></button><small className="checkout-note">Demo checkout · Home delivery included</small></> : <div className="cart-empty"><div className="empty-cart-icon"><Icon name="cart" size={26}/></div><h3>Your next adventure starts here.</h3><p>Save a product to your cart and come back when you’re ready.</p><button className="button button-dark" onClick={() => {setShowCart(false);document.getElementById('inventory').scrollIntoView({behavior:'smooth'})}}>Explore products <Icon name="arrow"/></button></div>}</aside></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
