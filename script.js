
  // --- Market-rate estimation model (placeholder for live Skyscanner / hotel API data) ---
  // Flight base = approx round-trip economy fare per traveler, in USD, ex-India.
  // hotelPerStar = per-night rate in USD for star tiers [1,2,3,4,5].
  // foodPerDay = per traveler per day, USD. high/low = peak/off-peak months (1-12).
  const destinationImages = {
  "Bali, Indonesia":
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4",

  "Goa, India":
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",

  "Bangkok, Thailand":
  "https://images.unsplash.com/photo-1508009603885-50cf7c579365",

  "Dubai, UAE":
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",

  "Maldives":
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",

  "Singapore":
  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",

  "Paris, France":
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",

  "New York, USA":
  "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2"
};
  const destinations = {
    'Bali, Indonesia':          { hotelPerStar: [12,20,35,65,120], foodPerDay: 18, high:[6,7,8,12], low:[2,3,9] },
    'Goa, India':                { hotelPerStar: [15,25,45,80,150], foodPerDay: 15, high:[11,12,1], low:[6,7,8] },
    'Bangkok, Thailand':         { hotelPerStar: [15,25,40,70,130], foodPerDay: 15, high:[11,12,1,2], low:[6,7,8,9] },
    'Dubai, UAE':                { hotelPerStar: [25,45,80,140,250], foodPerDay: 25, high:[11,12,1,2], low:[6,7,8] },
    'Maldives':                  { hotelPerStar: [60,100,180,320,600], foodPerDay: 30, high:[12,1,2,3], low:[5,6,9,10] },
    'Singapore':                 { hotelPerStar: [30,50,90,150,280], foodPerDay: 25, high:[11,12,6,7], low:[4,5] },
    'Ho Chi Minh City, Vietnam': { hotelPerStar: [12,20,35,60,110], foodPerDay: 12, high:[12,1,2], low:[6,7,8] },
    'Colombo, Sri Lanka':        { hotelPerStar: [15,25,40,70,130], foodPerDay: 15, high:[12,1,2,3], low:[5,6] },
    'Paris, France':             { hotelPerStar: [40,70,120,200,400], foodPerDay: 35, high:[6,7,8], low:[11,1,2] },
    'New York, USA':             { hotelPerStar: [50,90,150,260,450], foodPerDay: 40, high:[6,7,12], low:[1,2,3] }
  };

  // Round-trip economy fare estimates (USD) by origin country. Placeholder data —
  // replace with live Skyscanner API results once integrated.
  const flightMatrix = {
    'Bali, Indonesia':          { India: 480, 'United Kingdom': 900,  'United States': 1100, Canada: 1150, Australia: 350,  'UAE/GCC': 550 },
    'Goa, India':                { India: 120, 'United Kingdom': 550,  'United States': 900,  Canada: 950,  Australia: 900,  'UAE/GCC': 250 },
    'Bangkok, Thailand':         { India: 320, 'United Kingdom': 650,  'United States': 950,  Canada: 1000, Australia: 550,  'UAE/GCC': 400 },
    'Dubai, UAE':                { India: 260, 'United Kingdom': 450,  'United States': 800,  Canada: 850,  Australia: 900,  'UAE/GCC': 150 },
    'Maldives':                  { India: 550, 'United Kingdom': 750,  'United States': 1200, Canada: 1250, Australia: 950,  'UAE/GCC': 450 },
    'Singapore':                 { India: 380, 'United Kingdom': 800,  'United States': 1150, Canada: 1200, Australia: 450,  'UAE/GCC': 500 },
    'Ho Chi Minh City, Vietnam': { India: 300, 'United Kingdom': 750,  'United States': 1050, Canada: 1100, Australia: 500,  'UAE/GCC': 500 },
    'Colombo, Sri Lanka':        { India: 220, 'United Kingdom': 650,  'United States': 1000, Canada: 1050, Australia: 850,  'UAE/GCC': 350 },
    'Paris, France':             { India: 650, 'United Kingdom': 150,  'United States': 550,  Canada: 600,  Australia: 1400, 'UAE/GCC': 500 },
    'New York, USA':             { India: 900, 'United Kingdom': 500,  'United States': 300,  Canada: 250,  Australia: 1500, 'UAE/GCC': 900 }
  };

  const originCurrency = { India: 'INR', 'United Kingdom': 'GBP', 'United States': 'USD', Canada: 'CAD', Australia: 'AUD', 'UAE/GCC': 'AED' };

  // Major departure cities per origin country — used to select a specific hub for
  // display and for future live-API lookups (which need an exact departure airport).
  const originCities = {
    India: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    'UAE/GCC': ['Dubai', 'Abu Dhabi', 'Doha', 'Riyadh', 'Kuwait City', 'Manama', 'Muscat']
  };

  // Approximate tourist visa/e-visa fees (USD per traveler). Verify against official
  // immigration sources — policy and pricing change often and vary by exact passport.
  const visaMatrix = {
    'Bali, Indonesia':          { India: 35,  'United Kingdom': 35, 'United States': 35,  Canada: 35,  Australia: 35, 'UAE/GCC': 35 },
    'Goa, India':                { India: 0,   'United Kingdom': 45, 'United States': 80,  Canada: 70,  Australia: 45, 'UAE/GCC': 80 },
    'Bangkok, Thailand':         { India: 30,  'United Kingdom': 0,  'United States': 0,   Canada: 0,   Australia: 0,  'UAE/GCC': 0 },
    'Dubai, UAE':                { India: 85,  'United Kingdom': 0,  'United States': 0,   Canada: 0,   Australia: 0,  'UAE/GCC': 0 },
    'Maldives':                  { India: 0,   'United Kingdom': 0,  'United States': 0,   Canada: 0,   Australia: 0,  'UAE/GCC': 0 },
    'Singapore':                 { India: 30,  'United Kingdom': 0,  'United States': 0,   Canada: 0,   Australia: 0,  'UAE/GCC': 0 },
    'Ho Chi Minh City, Vietnam': { India: 25,  'United Kingdom': 25, 'United States': 25,  Canada: 25,  Australia: 25, 'UAE/GCC': 25 },
    'Colombo, Sri Lanka':        { India: 50,  'United Kingdom': 50, 'United States': 50,  Canada: 50,  Australia: 50, 'UAE/GCC': 50 },
    'Paris, France':             { India: 90,  'United Kingdom': 0,  'United States': 0,   Canada: 0,   Australia: 0,  'UAE/GCC': 90 },
    'New York, USA':             { India: 185, 'United Kingdom': 21, 'United States': 0,   Canada: 0,   Australia: 21, 'UAE/GCC': 185 }
  };

  const tripTypes = {
    budget:   { flightClass: 1,    comfort: 0.75, star: 2, transport: 'transit',   label: 'Economy flights, essentials-first comfort.' },
    standard: { flightClass: 1,    comfort: 1,    star: 3, transport: 'taxi',      label: 'Economy flights and mid-range comfort.' },
    premium:  { flightClass: 1.6,  comfort: 1.35, star: 4, transport: 'privateCar',label: 'Premium economy flights, upgraded comfort.' },
    luxury:   { flightClass: 3.5,  comfort: 1.9,  star: 5, transport: 'privateCar',label: 'Business class flights, top-tier comfort throughout.' }
  };
  let currentTripType = 'standard';

  const transportModes = {
    privateCar: { rate: 45, perUnit: 'group', label: 'Private car' },
    taxi:       { rate: 30, perUnit: 'group', label: 'Taxi / cab' },
    shuttle:    { rate: 12, perUnit: 'person', label: 'Shuttle bus' },
    transit:    { rate: 6,  perUnit: 'person', label: 'Public transit' },
    scooter:    { rate: 8,  perUnit: 'person', label: 'Rental scooter / bike' }
  };

  const travelerSizes = { solo: 1, couple: 2, group: null, senior: null, female: null, male: null };

  const symbols = { USD:'$', INR:'\u20B9', EUR:'\u20AC', GBP:'\u00A3', CAD:'C$', AUD:'A$', AED:'AED ', THB:'\u0E3F', IDR:'Rp ', JPY:'\u00A5', SGD:'S$' };
  let rates = { USD:1, INR:83, EUR:0.92, GBP:0.79, CAD:1.36, AUD:1.52, AED:3.67, THB:34, IDR:15600, JPY:150, SGD:1.34 };

  async function fetchLiveRates(){
    try{
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates){
        Object.keys(rates).forEach(code => { if (data.rates[code]) rates[code] = data.rates[code]; });
      }
    } catch(e){ /* fall back silently to static rates */ }
  }

  const els = {
    origin: document.getElementById('origin'),
    originCity: document.getElementById('originCity'),
    destination: document.getElementById('destination'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    travelerType: document.getElementById('travelerType'),
    groupSize: document.getElementById('groupSize'),
    groupSizeField: document.getElementById('groupSizeField'),
    currency: document.getElementById('currency'),
    transportMode: document.getElementById('transportMode')
  };

  function populateOriginCities(){
    const cities = originCities[els.origin.value] || [];
    els.originCity.innerHTML = cities.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  els.origin.addEventListener('change', () => {
    const suggested = originCurrency[els.origin.value];
    if (suggested) els.currency.value = suggested;
    populateOriginCities();
    calculate();
  });

  const starButtons = document.querySelectorAll('.star-btn');
  let selectedStar = 3;
  starButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      starButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedStar = parseInt(btn.dataset.star, 10);
      calculate();
    });
  });

  const tripTypeButtons = document.querySelectorAll('#tripType .pill-btn');
  tripTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tripTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTripType = btn.dataset.type;
      const cfg = tripTypes[currentTripType];

      selectedStar = cfg.star;
      starButtons.forEach(b => b.classList.toggle('active', parseInt(b.dataset.star, 10) === cfg.star));
      els.transportMode.value = cfg.transport;
      document.getElementById('tripTypeHint').textContent = cfg.label + ' Change accommodation and transport below anytime.';
      calculate();
    });
  });

  function fmt(n, currency){
    const sym = symbols[currency] || '';
    return sym + Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));
  }

  function getTravelerCount(){
    const type = els.travelerType.value;
    if (travelerSizes[type] !== null) return travelerSizes[type];
    return parseInt(els.groupSize.value || 2, 10);
  }

  function getSeasonMultiplier(dest, dateStr){
    if (!dateStr) return 1;
    const month = new Date(dateStr).getMonth() + 1;
    if (dest.high.includes(month)) return 1.25;
    if (dest.low.includes(month)) return 0.85;
    return 1;
  }

  function getNights(){
    if (!els.startDate.value || !els.endDate.value) return 0;
    const start = new Date(els.startDate.value);
    const end = new Date(els.endDate.value);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  function renderBarcode(total){
    const bar = document.getElementById('barcode');
    bar.innerHTML = '';
    const seed = Math.max(1, Math.round(total));
    const str = String(seed).padStart(6, '0');
    const digits = (str + str).split('').slice(0, 28);
    digits.forEach(d => {
      const h = 8 + (parseInt(d, 10) * 2.6);
      const span = document.createElement('span');
      span.style.height = h + 'px';
      bar.appendChild(span);
    });
  }

  function renderTrend(dest, dateStr){
    const bars = document.getElementById('trendBars');
    const note = document.getElementById('trendNote');
    bars.innerHTML = '';

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const selectedMonth = dateStr ? (new Date(dateStr).getMonth() + 1) : null;

    const indices = [];
    for (let m = 1; m <= 12; m++){
      indices.push(dest.high.includes(m) ? 1.25 : (dest.low.includes(m) ? 0.85 : 1.0));
    }
    const cheapestIdx = Math.min(...indices);
    const cheapestMonth = indices.indexOf(cheapestIdx) + 1;

    for (let m = 1; m <= 12; m++){
      const idx = indices[m - 1];
      const wrap = document.createElement('div');
      wrap.className = 'trend-bar' + (idx === 1.25 ? ' high' : idx === 0.85 ? ' low' : '') + (m === selectedMonth ? ' selected' : '');
      const barEl = document.createElement('div');
      barEl.className = 'bar';
      barEl.style.height = (idx * 32) + 'px';
      const label = document.createElement('div');
      label.className = 'm';
      label.textContent = monthNames[m - 1];
      wrap.appendChild(barEl);
      wrap.appendChild(label);
      bars.appendChild(wrap);
    }

    if (selectedMonth){
      const selIdx = indices[selectedMonth - 1];
      if (cheapestMonth !== selectedMonth && cheapestIdx < selIdx){
        const pct = Math.round((1 - cheapestIdx / selIdx) * 100);
        note.innerHTML = 'Traveling in <strong>' + monthNames[cheapestMonth - 1] + '</strong> instead of ' + monthNames[selectedMonth - 1] + ' could save roughly <strong>' + pct + '%</strong> on flights and stay, based on typical seasonal patterns for this destination.';
      } else {
        note.innerHTML = 'Your selected month, <strong>' + monthNames[selectedMonth - 1] + '</strong>, is already at or near the best typical pricing for this destination.';
      }
    } else {
      note.textContent = 'Pick your travel dates above to see the best time to go.';
    }
  }

  function calculate(){
    const destKey = els.destination.value;
    const dest = destinations[destKey];
    const currency = els.currency.value;
    const rate = rates[currency];

    const travelerType = els.travelerType.value;
    els.groupSizeField.style.display = (travelerSizes[travelerType] === null) ? 'block' : 'none';

    const size = getTravelerCount();
    const nights = getNights();
    const season = getSeasonMultiplier(dest, els.startDate.value);
    const groupDiscount = size >= 4 ? 0.95 : 1;
    const roomCount = Math.max(1, Math.ceil(size / 2));
    const tripCfg = tripTypes[currentTripType];

    const flightUsd = flightMatrix[destKey][els.origin.value] * season * size * groupDiscount * tripCfg.flightClass;
    const hotelUsd = dest.hotelPerStar[selectedStar - 1] * Math.max(nights, 1) * season * roomCount * tripCfg.comfort;
    const foodUsd = dest.foodPerDay * size * Math.max(nights, 1) * tripCfg.comfort;

    const mode = transportModes[els.transportMode.value];
    const transportUsd = (mode.perUnit === 'group'
      ? mode.rate * Math.ceil(size / 4) * Math.max(nights, 1)
      : mode.rate * size * Math.max(nights, 1)) * tripCfg.comfort;

    const visaUsd = (visaMatrix[destKey][els.origin.value] || 0) * size;

    const totalUsd = flightUsd + hotelUsd + foodUsd + transportUsd + visaUsd;

    const flight = flightUsd * rate;
    const hotel = hotelUsd * rate;
    const food = foodUsd * rate;
    const transport = transportUsd * rate;
    const visa = visaUsd * rate;
    const total = totalUsd * rate;

    document.getElementById('rowFlights').textContent = fmt(flight, currency);
    document.getElementById('rowStay').textContent = fmt(hotel, currency);
    document.getElementById('rowFood').textContent = fmt(food, currency);
    document.getElementById('rowTransport').textContent = fmt(transport, currency);
    document.getElementById('rowVisa').textContent = visaUsd === 0 ? 'Visa-free' : fmt(visa, currency);
    document.getElementById('visaPaxLabel').textContent = size + (size === 1 ? ' traveler' : ' travelers');

    document.getElementById('totalCost').textContent = fmt(total, currency);
    document.getElementById('perPerson').textContent = fmt(total / size, currency);
    document.getElementById('perDay').textContent = fmt(total / Math.max(nights, 1), currency);

    document.getElementById('paxLabel').textContent = 'from ' + els.originCity.value + ' · ' + size + (size === 1 ? ' traveler' : ' travelers');
    document.getElementById('nightsLabel').textContent = nights + (nights === 1 ? ' night' : ' nights') + ' · ' + selectedStar + '-star';
    document.getElementById('modeLabel').textContent = mode.label;
    
    document.getElementById("destinationImage").src =
    destinationImages[destKey];
    renderBarcode(total);
    renderTrend(dest, els.startDate.value);
    getWeather(
  destKey.split(",")[0]
);
  }

  document.getElementById('ticketNo').textContent = 'NO. ' + String(Math.floor(100000 + Math.random() * 900000));

  const today = new Date();
  const inTwoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  const inThreeWeeks = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);
  els.startDate.value = inTwoWeeks.toISOString().slice(0, 10);
  els.endDate.value = inThreeWeeks.toISOString().slice(0, 10);
  els.currency.value = originCurrency[els.origin.value] || 'USD';
  populateOriginCities();

  Object.values(els).forEach(el => el.addEventListener('input', calculate));
  Object.values(els).forEach(el => el.addEventListener('change', calculate));

  fetchLiveRates().then(calculate);
  calculate();


async function getWeather(city){

  try{

    const response = await fetch(
      `https://wttr.in/${city}?format=j1`
    );

    const data = await response.json();

    document.getElementById("weatherBox").innerHTML =
      `🌡 ${data.current_condition[0].temp_C}°C |
       ${data.current_condition[0].weatherDesc[0].value}`;

  }catch{

    document.getElementById("weatherBox").innerHTML =
      "Weather unavailable";

  }

}
async function testWeatherAPI() {
  const res = await fetch("http://localhost:5000/weather?city=Goa");
  const data = await res.json();
  console.log("Weather Data:", data);
}

testWeatherAPI();
