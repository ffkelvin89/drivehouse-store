import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './contact.css';

const products = [
  { id: 1, name: 'Can-Am Outlander 850', trim: 'XT-P · 2025', category: 'ATV', price: 14299, monthly: 187, miles: '12 hrs', fuel: 'Gasoline', transmission: 'Automatic', location: 'Phoenix, AZ', tag: 'Bestseller', color: 'Red', image: 'photo-1558981806-ec527fa84c39', description: 'A trail-ready ATV built for confident handling and weekend adventures.' },
  { id: 2, name: 'Specialized Turbo Levo', trim: 'Comp Alloy · 2025', category: 'Bicycle', price: 7499, monthly: 98, miles: 'New', fuel: 'Electric', transmission: '12-speed', location: 'Portland, OR', tag: 'Electric', color: 'Satin black', image: 'photo-1507035895480-2b3156c31fc8', description: 'An electric mountain bike with smooth assistance for longer rides and steeper trails.' },
  { id: 3, name: 'Sea-Doo Spark', trim: 'Trixx · 2025', category: 'Jet ski', price: 8999, monthly: 118, miles: '6 hrs', fuel: 'Gasoline', transmission: 'Direct drive', location: 'Orlando, FL', tag: 'Bestseller', color: 'Sunrise orange', image: 'photo-1567899378494-47b22a2ae96a', description: 'A lightweight personal watercraft designed for playful, easy-to-learn riding.' },
  { id: 4, name: 'Yamaha F150', trim: 'Four-stroke outboard · 2025', category: 'Boat engines', price: 16450, monthly: 215, miles: 'New', fuel: 'Gasoline', transmission: '150 hp', location: 'Tampa, FL', tag: 'Just in', color: 'Pearl gray', image: 'photo-1569263979104-865ab7cd8d13', description: 'A 150-horsepower four-stroke outboard for dependable power on the water.' }
];

const imageUrl = (source, width = 900) => source.startsWith('/') || source.startsWith('http')
  ? source
  : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=85`;
const money = n => '$' + n.toLocaleString('en-US');

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    truck: <><path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="17.5" cy="19" r="1.5"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [category, setCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState('');
  const [tracking, setTracking] = useState('');
  const [trackingResult, setTrackingResult] = useState(false);
  const [sort, setSort] = useState('Featured');

  const filtered = useMemo(() => {
    let list = products.filter(product => (category === 'All products' || product.category === category) && `${product.name} ${product.trim} ${product.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const contactAbout = product => {
    setSelectedProduct(product);
    setContactSent(false);
    setContactError('');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendContact = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    setContactSending(true);
    setContactError('');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error('Message could not be sent. Please try again.');
      setContactSent(true);
      form.reset();
      setSelectedProduct(null);
    } catch {
      setContactError('We could not send your message just now. Please try again.');
    } finally {
      setContactSending(false);
    }
  };

  const trackOrder = event => {
    event.preventDefault();
    setTrackingResult(Boolean(tracking.trim()));
  };

  return <>
    <div className="announcement"><span>Thoughtful buying. Doorstep delivery.</span><a href="#delivery">See how delivery works <Icon name="arrow" size={14}/></a></div>
    <header className="nav">
      <a className="brand" href="#top"><span className="brand-mark">d<span>.</span></span><span>drivehouse</span></a>
      <nav className="nav-links"><a href="#inventory">Shop products</a><a href="#delivery">How it works</a><a href="#tracking">Track delivery</a><a href="#contact">Contact us</a></nav>
      <div className="nav-actions"><button className="icon-button" aria-label="Search products" onClick={() => document.getElementById('vehicle-search').focus()}><Icon name="search"/></button><button className="mobile-menu" onClick={() => document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' })}>Shop</button></div>
    </header>

    <main id="top">
      <section className="hero"><div className="hero-image"/><div className="hero-content"><div className="eyebrow"><span className="eyebrow-line"/>A better way to buy</div><h1>Good rides.<br/><em>Good to go.</em></h1><p>Find the one that feels like you. We bring it right to your door, with every mile of the journey in view.</p><a className="button button-dark" href="#inventory">Find your next ride <Icon name="arrow"/></a><div className="hero-proof"><div className="avatar-stack"><i>J</i><i>M</i><i>A</i></div><span><strong>4.9 / 5</strong> from 2,400+ happy customers</span></div></div><div className="hero-caption"><span>01 / CURATED COLLECTION</span><span>THE OPEN ROAD, YOUR WAY</span></div></section>

      <section className="trust-row"><div className="trust-item"><span className="trust-icon"><Icon name="check"/></span><span><b>Every ride, inspected</b><small>Quality checked before shipping</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="truck"/></span><span><b>Delivered to your door</b><small>On your schedule</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="check"/></span><span><b>7-day love-it guarantee</b><small>Take the time you need</small></span></div><div className="trust-item"><span className="trust-icon"><Icon name="pin"/></span><span><b>Real-time tracking</b><small>From our lot to your lot</small></span></div></section>

      <section className="inventory section" id="inventory"><div className="section-heading"><div><div className="eyebrow">THE DRIVEHOUSE EDIT</div><h2>Our most-loved <em>rides.</em></h2><p>Handpicked, road-tested, and ready for a new story.</p></div><a className="text-link" href="#inventory">Explore all inventory <Icon name="arrow"/></a></div>
        <div className="inventory-controls"><div className="tabs">{['All products', 'ATV', 'Bicycle', 'Jet ski', 'Boat engines'].map(item => <button className={category === item ? 'tab active' : 'tab'} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="control-right"><label className="searchbox"><Icon name="search"/><input id="vehicle-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products"/></label><select aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></div></div>
        <div className="car-grid">{filtered.map(product => <article className="car-card" key={product.id}><div className="car-photo"><img src={imageUrl(product.image)} alt={`${product.name} in ${product.color}`} loading="lazy"/><span className={`tag ${product.tag === 'Bestseller' ? 'tag-green' : ''}`}>{product.tag}</span></div><div className="car-info"><div className="car-title"><div><h3>{product.name}</h3><p>{product.trim}</p></div><span className="color-dot" title={product.color}/></div><p className="product-description">{product.description}</p><div className="specs"><span>{product.miles}</span><i/><span>{product.fuel}</span><i/><span>{product.transmission}</span></div><div className="car-bottom"><div><strong>{money(product.price)}</strong><small>Est. {money(product.monthly)}/mo</small></div><button className="button button-dark contact-product" onClick={() => contactAbout(product)}>Contact to buy <Icon name="arrow" size={15}/></button></div></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state">No products match that search. Try another name or category.</div>}
        <div className="inventory-foot"><span>Showing {filtered.length} of {products.length} handpicked products</span><a className="text-link" href="#contact">Ask us about a product <Icon name="arrow"/></a></div>
      </section>

      <section className="contact section" id="contact"><div className="contact-copy"><div className="eyebrow">LET'S TALK RIDES</div><h2>Interested in a<br/><em>product?</em></h2><p>Send us a message about the product you want. We’ll follow up to answer questions and help with the purchase.</p><small>Your message will be sent securely through our site form.</small></div><div className="contact-form-wrap">{contactSent ? <div className="contact-success"><span className="trust-icon"><Icon name="check"/></span><h3>Thanks for reaching out.</h3><p>Your message has been sent. We’ll be in touch soon.</p><button className="text-link" onClick={() => setContactSent(false)}>Send another message</button></div> : <form className="contact-form" name="product-enquiry" method="POST" data-netlify="true" onSubmit={sendContact}>
          <input type="hidden" name="form-name" value="product-enquiry"/>
          <label htmlFor="enquiry-product">Product</label><select id="enquiry-product" name="product" required value={selectedProduct?.name ?? ''} onChange={event => setSelectedProduct(products.find(product => product.name === event.target.value) || null)}><option value="" disabled>Select a product</option>{products.map(product => <option key={product.id} value={product.name}>{product.name}</option>)}</select>
          <input type="hidden" name="category" value={selectedProduct?.category || ''}/>
          <div className="contact-fields"><div><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" name="name" autoComplete="name" required/></div><div><label htmlFor="enquiry-email">Email address</label><input id="enquiry-email" name="email" type="email" autoComplete="email" required/></div></div>
          <label htmlFor="enquiry-phone">Phone number <span>(optional)</span></label><input id="enquiry-phone" name="phone" type="tel" autoComplete="tel"/>
          <label htmlFor="enquiry-message">Your message</label><textarea id="enquiry-message" name="message" rows="4" placeholder="Ask a question or tell us how we can help you buy this product." required/>
          {contactError && <p className="form-error" role="alert">{contactError}</p>}
          <button className="button button-dark" type="submit" disabled={contactSending}>{contactSending ? 'Sending…' : 'Send message'} <Icon name="arrow"/></button>
        </form>}</div></section>

      <section className="delivery section" id="delivery"><div className="delivery-image"><img src={imageUrl('photo-1558981806-ec527fa84c39', 1100)} alt="ATV ready for delivery" loading="lazy"/><div className="delivery-badge"><span>YOUR ORDER,<br/>YOUR DRIVEWAY.</span><small>Easy as 1, 2, 3.</small></div></div><div className="delivery-copy"><div className="eyebrow">FROM OUR LOT TO YOURS</div><h2>The journey is<br/><em>part of the joy.</em></h2><p>Buying should feel exciting all the way to delivery. We keep you in the loop at every turn, so you know exactly when your new ride is close.</p><div className="steps"><div className="step"><b>01</b><span><strong>Choose your ride</strong><small>Find your match from our handpicked collection.</small></span></div><div className="step"><b>02</b><span><strong>We get it ready</strong><small>Our team handles the details and the paperwork.</small></span></div><div className="step"><b>03</b><span><strong>Follow every mile</strong><small>Get your tracking number and watch it come to you.</small></span></div></div><a href="#tracking" className="text-link">Learn about delivery <Icon name="arrow"/></a></div></section>

      <section className="tracking section" id="tracking"><div className="track-copy"><div className="eyebrow">THE COUNTDOWN STARTS</div><h2>Your order<br/>is <em>on its way.</em></h2><p>Already placed an order? Enter your tracking number to see where it is and when it’s expected to arrive.</p><form className="track-form" onSubmit={trackOrder}><label className="sr-only" htmlFor="tracking-number">Tracking number</label><input id="tracking-number" value={tracking} onChange={event => {setTracking(event.target.value);setTrackingResult(false)}} placeholder="Try DH-2024-01842"/><button className="button button-dark" type="submit">Track order <Icon name="arrow"/></button></form>{trackingResult && <div className="track-result"><span className="status-dot"/><div><b>On the road to you</b><small>Order {tracking.toUpperCase()} · Estimated delivery in 2–3 days</small><div className="progress"><i/></div><div className="track-meta"><span>Picked up</span><span>In transit</span><span>Delivered</span></div></div></div>}<small className="tracking-help">Your tracking number is in your order confirmation email.</small></div><div className="track-art"><div className="route-label"><span className="route-pulse"/> LIVE DELIVERY UPDATE</div><div className="route-map"><svg viewBox="0 0 520 310" preserveAspectRatio="none" aria-label="Illustration of a delivery route"><path className="route-path-bg" d="M54 248 C120 240 98 169 167 180 S215 235 264 171 S325 85 369 121 S414 182 474 65"/><path className="route-path" d="M54 248 C120 240 98 169 167 180 S215 235 264 171 S325 85 369 121 S414 182 474 65"/></svg><span className="map-pin start"><Icon name="pin" size={20}/></span><span className="map-pin end"><Icon name="pin" size={20}/></span><div className="map-car"><Icon name="truck" size={22}/></div><div className="map-card"><div className="map-card-top"><span className="status-dot"/> ON ITS WAY</div><b>Your order is getting closer.</b><small>Last updated just now</small></div></div><div className="map-legend"><span><i className="legend-dot green"/>Your order</span><span><i className="legend-dot muted"/>Destination</span></div></div></section>

      <section className="newsletter"><div><div className="eyebrow">GOOD THINGS, OCCASIONALLY</div><h2>Find the one that <em>moves you.</em></h2><p>New arrivals, thoughtful advice, and the occasional open-road daydream.</p></div><form className="newsletter-form" onSubmit={event => {event.preventDefault();event.currentTarget.innerHTML='<span class="subscribed">You’re on the list. Talk soon!</span>'}}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button type="submit" aria-label="Subscribe"><Icon name="arrow"/></button></form></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">d<span>.</span></span><span>drivehouse</span></a><span>Better rides. Better journeys.</span><div><a href="#inventory">Shop</a><a href="#contact">Contact</a><a href="#tracking">Track order</a></div><small>© 2025 Drivehouse Motors, Inc.</small></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
