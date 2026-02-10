"use client";

import { useState, useRef } from "react";

const services = [
  { id: 1, name: "Saç" },
  { id: 2, name: "Saç + Sakal" },
  { id: 3, name: "Saç Bakım" },
  { id: 4, name: "Cilt Bakım" },
  { id: 5, name: "Keratin Düzleştirme" },
  { id: 6, name: "Fön" },
  { id: 7, name: "Perma" },
];

const reviews = [
  { name: "Y.K.", text: "İlgi alaka mükemmel. İnsan sadece saçını kestirmeye değil dinlenmeye gidiyor resmen. İşlem sırasındaki sohbet bile ayrı güzel.", rating: 5 },
  { name: "N.Ş.", text: "Yaklaşık 20 yıldır gittiğim ve vazgeçemediğim, gerek ustalık gerek esnaflık işinin hakkını veren bir işletme.", rating: 5 },
  { name: "K.K.", text: "Kemal abi berber değil tam bir usta. 7-8 senedir geldiğim bir yer, kesinlikle tavsiye ederim.", rating: 5 },
  { name: "İ.A.", text: "İşinden anlayan berber bulmak zor. Kemal Bey ise işinde çok yetenekli. Herkese tavsiye ederim.", rating: 5 },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=400&fit=crop",
];

const generateTimeSlots = () => {
  const slots = ["08:30"];
  for (let hour = 9; hour < 21; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14 && dates.length < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0) dates.push(date);
  }
  return dates;
};

const availableDates = generateDates();
const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookedSlots] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const selectService = (serviceId: number) => {
    setSelectedServices([serviceId]);
    scrollToBooking();
  };

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      // Saç (id:1) ve Saç + Sakal (id:2) birlikte seçilemez
      if (serviceId === 1) {
        return [...prev.filter((id) => id !== 2), serviceId];
      }
      if (serviceId === 2) {
        return [...prev.filter((id) => id !== 1), serviceId];
      }
      return [...prev, serviceId];
    });
  };


  const handleBooking = () => {
    console.log({ services: selectedServices, date: selectedDate, time: selectedTime, customer: { name: customerName, surname: customerSurname, phone: customerPhone } });
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setBookingComplete(false);
    setShowBookingForm(false);
    setSelectedServices([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerName("");
    setCustomerSurname("");
    setCustomerPhone("");
  };

  const formatDate = (date: Date) => `${date.getDate()} ${monthNames[date.getMonth()]} ${dayNames[date.getDay()]}`;

  const canProceedToForm = selectedServices.length > 0 && selectedDate && selectedTime;
  const canSubmit = customerName && customerSurname && customerPhone;

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(26, 26, 26, 0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #333"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(24px, 5vw, 32px)", color: "#d4af37", fontWeight: "normal" }}>
            Kemal Çağlı
          </h1>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
            <a href="#hakkimizda" style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>HAKKIMIZDA</a>
            <a href="#hizmetler" style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>HİZMETLER</a>
            <a href="#iletisim" style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>İLETİŞİM</a>
            <button onClick={scrollToBooking} style={{
              background: "transparent", border: "1px solid #d4af37", color: "#d4af37",
              padding: "12px 28px", fontSize: "13px", letterSpacing: "2px", cursor: "pointer"
            }}>
              RANDEVU AL
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent", border: "none", color: "#d4af37",
              fontSize: "28px", cursor: "pointer", padding: "5px"
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="mobile-nav" style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px", background: "rgba(26, 26, 26, 0.98)", borderTop: "1px solid #333" }}>
            <a href="#hakkimizda" onClick={() => setMobileMenuOpen(false)} style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "16px", letterSpacing: "1px", padding: "10px 0" }}>HAKKIMIZDA</a>
            <a href="#hizmetler" onClick={() => setMobileMenuOpen(false)} style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "16px", letterSpacing: "1px", padding: "10px 0" }}>HİZMETLER</a>
            <a href="#iletisim" onClick={() => setMobileMenuOpen(false)} style={{ color: "#b8b8b8", textDecoration: "none", fontSize: "16px", letterSpacing: "1px", padding: "10px 0" }}>İLETİŞİM</a>
            <button onClick={() => { scrollToBooking(); setMobileMenuOpen(false); }} style={{
              background: "#d4af37", border: "none", color: "#1a1a1a",
              padding: "15px 28px", fontSize: "14px", letterSpacing: "2px", cursor: "pointer", marginTop: "10px"
            }}>
              RANDEVU AL
            </button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.9)), url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop')`,
        backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <div style={{ textAlign: "center", padding: "20px", paddingTop: "80px" }}>
          <p style={{ color: "#d4af37", fontSize: "clamp(11px, 3vw, 14px)", letterSpacing: "4px", marginBottom: "20px" }}>
            LÜKS BERBER DENEYİMİ
          </p>
          <h2 style={{
            fontFamily: "'Shimes Two', cursive", fontSize: "clamp(45px, 12vw, 140px)",
            color: "#ffffff", fontWeight: "normal", marginBottom: "20px", lineHeight: "1"
          }}>
            Kemal Çağlı
          </h2>
          <p style={{ color: "#999", fontSize: "clamp(14px, 4vw, 18px)", maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.8", padding: "0 10px" }}>
            Tarzınızı yansıtan kesimler için doğru adres. 15 yılı aşkın tecrübe ile hizmetinizdeyiz.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={scrollToBooking} style={{
              background: "#d4af37", border: "none", color: "#1a1a1a",
              padding: "16px 40px", fontSize: "clamp(12px, 3vw, 14px)", letterSpacing: "2px", cursor: "pointer", fontWeight: "600"
            }}>
              RANDEVU AL
            </button>
            <a href="#hizmetler" style={{
              background: "transparent", border: "1px solid #666", color: "#fff",
              padding: "16px 40px", fontSize: "clamp(12px, 3vw, 14px)", letterSpacing: "2px", cursor: "pointer", textDecoration: "none"
            }}>
              HİZMETLER
            </a>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section id="hakkimizda" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 40px)", background: "#1e1e1e" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>HAKKIMIZDA</p>
            <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(40px, 10vw, 72px)", color: "#fff", fontWeight: "normal", marginBottom: "30px" }}>
              Mükemmellik Geleneği
            </h3>
            <p style={{ color: "#999", fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "2", marginBottom: "25px", maxWidth: "600px", margin: "0 auto 25px" }}>
              2009 yılından bu yana İstanbul&apos;un kalbinde, Şişli Feriköy&apos;de hizmet veriyoruz. Kemal Çağlı olarak,
              geleneksel berberlik sanatını modern tekniklerle birleştirerek her müşterimize özel bir deneyim sunuyoruz.
            </p>
            <p style={{ color: "#999", fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "2", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
              Ekibimiz, alanında uzman 3 berberden oluşmaktadır. Her birimiz sürekli kendimizi geliştiriyor,
              en son trendleri takip ediyor ve müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
            </p>
            <div style={{ display: "flex", gap: "clamp(20px, 5vw, 50px)", justifyContent: "center", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: "#d4af37", fontSize: "clamp(32px, 8vw, 42px)", fontWeight: "600" }}>15+</p>
                <p style={{ color: "#888", fontSize: "clamp(11px, 3vw, 13px)", letterSpacing: "2px" }}>YIL DENEYİM</p>
              </div>
              <div>
                <p style={{ color: "#d4af37", fontSize: "clamp(32px, 8vw, 42px)", fontWeight: "600" }}>10K+</p>
                <p style={{ color: "#888", fontSize: "clamp(11px, 3vw, 13px)", letterSpacing: "2px" }}>MUTLU MÜŞTERİ</p>
              </div>
              <div>
                <p style={{ color: "#d4af37", fontSize: "clamp(32px, 8vw, 42px)", fontWeight: "600" }}>3</p>
                <p style={{ color: "#888", fontSize: "clamp(11px, 3vw, 13px)", letterSpacing: "2px" }}>UZMAN BERBER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HİJYEN */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", background: "#242424" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>KALİTE & HİJYEN</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(36px, 9vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Sağlığınız Önceliğimiz
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { icon: "🧴", title: "Steril Ekipman", desc: "Tüm aletlerimiz her kullanım sonrası UV sterilizatörde dezenfekte edilir" },
              { icon: "🧤", title: "Tek Kullanımlık", desc: "Havlu, önlük ve boyun bandı gibi malzemeler tek kullanımlıktır" },
              { icon: "✨", title: "Premium Ürünler", desc: "Sadece dermatolog onaylı, birinci sınıf ürünler kullanıyoruz" },
              { icon: "🌿", title: "Temiz Ortam", desc: "Salonumuz günde 3 kez profesyonel olarak temizlenir ve havalandırılır" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "30px 20px", background: "#1e1e1e", border: "1px solid #333" }}>
                <div style={{ fontSize: "36px", marginBottom: "15px" }}>{item.icon}</div>
                <h4 style={{ color: "#fff", fontSize: "15px", marginBottom: "12px", fontWeight: "500" }}>{item.title}</h4>
                <p style={{ color: "#888", fontSize: "13px", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" style={{ padding: "clamp(60px, 10vw, 120px) clamp(15px, 4vw, 40px)", background: "#1e1e1e" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>HİZMETLERİMİZ</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(36px, 9vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Ne Yapmak İstersiniz?
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "700px", margin: "0 auto" }}>
            {services.map((service) => (
              <button key={service.id} onClick={() => selectService(service.id)} style={{
                background: "linear-gradient(145deg, #2a2a2a, #1e1e1e)",
                border: "1px solid #3a3a3a",
                padding: "clamp(25px, 5vw, 45px) clamp(15px, 3vw, 35px)",
                cursor: "pointer",
                transition: "all 0.3s",
                textAlign: "center",
                borderRadius: "4px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                width: "clamp(140px, 22%, 160px)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "linear-gradient(145deg, #333, #252525)";
                e.currentTarget.style.borderColor = "#d4af37";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "linear-gradient(145deg, #2a2a2a, #1e1e1e)";
                e.currentTarget.style.borderColor = "#3a3a3a";
              }}>
                <h4 style={{ color: "#fff", fontSize: "clamp(13px, 3.5vw, 17px)", fontWeight: "500", letterSpacing: "0.5px" }}>{service.name}</h4>
                <div style={{ width: "25px", height: "2px", background: "#d4af37", margin: "12px auto 0" }}></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALERİ */}
      <section style={{ padding: "clamp(60px, 10vw, 120px) clamp(15px, 4vw, 40px)", background: "#1e1e1e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>GALERİ</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(36px, 9vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Çalışmalarımız
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
            {galleryImages.map((img, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <img src={img} alt={`Galeri ${i + 1}`} style={{
                  width: "100%", height: "clamp(150px, 30vw, 250px)", objectFit: "cover",
                  transition: "transform 0.5s", cursor: "pointer"
                }} />
              </div>
            ))}
          </div>
          <a href="https://www.instagram.com/kemal_cagli/" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", marginTop: "clamp(30px, 6vw, 50px)", padding: "14px 30px",
            border: "1px solid #d4af37", color: "#d4af37", textDecoration: "none",
            fontSize: "12px", letterSpacing: "1px"
          }}>
            INSTAGRAM&apos;DA TAKİP EDİN
          </a>
        </div>
      </section>

      {/* YORUMLAR */}
      <section style={{ padding: "clamp(60px, 10vw, 120px) clamp(15px, 4vw, 40px)", background: "#242424" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>YORUMLAR</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(32px, 8vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Müşterilerimiz Ne Diyor?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {reviews.map((review, i) => (
              <div key={i} style={{ background: "#1e1e1e", padding: "clamp(25px, 5vw, 40px)", border: "1px solid #333", textAlign: "left" }}>
                <div style={{ color: "#d4af37", fontSize: "18px", marginBottom: "12px" }}>
                  {"★".repeat(review.rating)}
                </div>
                <p style={{ color: "#ccc", fontSize: "clamp(14px, 3.5vw, 16px)", lineHeight: "1.8", marginBottom: "15px", fontStyle: "italic" }}>
                  &quot;{review.text}&quot;
                </p>
                <p style={{ color: "#888", fontSize: "13px", fontWeight: "500" }}>— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANDEVU */}
      <section ref={bookingRef} style={{ padding: "clamp(60px, 10vw, 120px) clamp(15px, 4vw, 40px)", background: "#1e1e1e" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>RANDEVU</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(36px, 9vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Randevu Alın
          </h3>

          {bookingComplete ? (
            <div style={{ background: "#242424", border: "1px solid #d4af37", padding: "60px 40px", textAlign: "center" }}>
              <div style={{ fontSize: "60px", marginBottom: "20px", color: "#d4af37" }}>✓</div>
              <h4 style={{ color: "#d4af37", fontSize: "24px", marginBottom: "20px", fontWeight: "500" }}>Randevunuz Alındı</h4>
              <p style={{ color: "#fff", marginBottom: "10px" }}>{selectedDate && formatDate(selectedDate)} - {selectedTime}</p>
              <p style={{ color: "#888", marginBottom: "30px" }}>{services.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(", ")}</p>
              <button onClick={resetBooking} style={{ background: "transparent", border: "1px solid #555", color: "#888", padding: "12px 30px", fontSize: "13px", cursor: "pointer" }}>
                YENİ RANDEVU
              </button>
            </div>
          ) : !showBookingForm ? (
            <div style={{ background: "#242424", padding: "clamp(30px, 6vw, 50px) clamp(15px, 4vw, 40px)" }}>
              <div style={{ marginBottom: "40px" }}>
                <p style={{ color: "#888", fontSize: "13px", letterSpacing: "2px", marginBottom: "20px" }}>1. HİZMET SEÇİN</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                  {services.map((service) => (
                    <button key={service.id} onClick={() => toggleService(service.id)} style={{
                      background: selectedServices.includes(service.id) ? "#d4af37" : "transparent",
                      border: `1px solid ${selectedServices.includes(service.id) ? "#d4af37" : "#555"}`,
                      color: selectedServices.includes(service.id) ? "#1a1a1a" : "#fff",
                      padding: "12px 24px", fontSize: "14px", cursor: "pointer"
                    }}>
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "40px" }}>
                <p style={{ color: "#888", fontSize: "13px", letterSpacing: "2px", marginBottom: "20px" }}>2. TARİH SEÇİN</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                  {availableDates.map((date, index) => (
                    <button key={index} onClick={() => setSelectedDate(date)} style={{
                      background: selectedDate?.toDateString() === date.toDateString() ? "#d4af37" : "transparent",
                      border: `1px solid ${selectedDate?.toDateString() === date.toDateString() ? "#d4af37" : "#555"}`,
                      color: selectedDate?.toDateString() === date.toDateString() ? "#1a1a1a" : "#fff",
                      padding: "15px 20px", fontSize: "14px", cursor: "pointer", minWidth: "80px"
                    }}>
                      <div style={{ fontSize: "11px", opacity: 0.7 }}>{dayNames[date.getDay()]}</div>
                      <div style={{ fontWeight: "600" }}>{date.getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div style={{ marginBottom: "40px" }}>
                  <p style={{ color: "#888", fontSize: "13px", letterSpacing: "2px", marginBottom: "20px" }}>3. SAAT SEÇİN</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "8px", maxWidth: "500px", margin: "0 auto" }}>
                    {timeSlots.map((time) => {
                      const isBooked = bookedSlots.includes(time);
                      const isSelected = selectedTime === time;

                      // Bugün için geçmiş saatleri kontrol et
                      const now = new Date();
                      const isToday = selectedDate?.toDateString() === now.toDateString();
                      const [hours, minutes] = time.split(":").map(Number);
                      const isPastTime = isToday && (hours < now.getHours() || (hours === now.getHours() && minutes <= now.getMinutes()));

                      const isDisabled = isBooked || isPastTime;

                      return (
                        <button key={time} onClick={() => !isDisabled && setSelectedTime(time)} disabled={isDisabled} style={{
                          background: isSelected ? "#d4af37" : "transparent",
                          border: `1px solid ${isDisabled ? "#333" : isSelected ? "#d4af37" : "#555"}`,
                          color: isDisabled ? "#555" : isSelected ? "#1a1a1a" : "#fff",
                          padding: "10px", fontSize: "13px", cursor: isDisabled ? "not-allowed" : "pointer",
                          textDecoration: isDisabled ? "line-through" : "none", opacity: isDisabled ? 0.5 : 1
                        }}>
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedServices.length > 0 && (
                <div style={{ borderTop: "1px solid #444", paddingTop: "30px", marginTop: "30px" }}>
                  <a
                    href={canProceedToForm ? `https://wa.me/905305590682?text=${encodeURIComponent(
                      `Merhaba, randevu almak istiyorum.\n\nHizmet: ${services.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(", ")}\nTarih: ${selectedDate ? formatDate(selectedDate) : ""}\nSaat: ${selectedTime || ""}`
                    )}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      background: canProceedToForm ? "#25D366" : "#444",
                      border: "none",
                      color: canProceedToForm ? "#fff" : "#888",
                      padding: "16px 50px",
                      fontSize: "13px",
                      letterSpacing: "2px",
                      cursor: canProceedToForm ? "pointer" : "not-allowed",
                      fontWeight: "600",
                      textDecoration: "none",
                      pointerEvents: canProceedToForm ? "auto" : "none"
                    }}
                  >
                    RANDEVU AL
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "#242424", padding: "50px 40px" }}>
              <p style={{ color: "#888", fontSize: "13px", letterSpacing: "2px", marginBottom: "30px" }}>BİLGİLERİNİZ</p>
              <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                <input type="text" placeholder="Adınız" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: "100%", padding: "16px 20px", background: "#333", border: "1px solid #444", color: "#fff", fontSize: "15px", marginBottom: "15px", outline: "none" }} />
                <input type="text" placeholder="Soyadınız" value={customerSurname} onChange={(e) => setCustomerSurname(e.target.value)}
                  style={{ width: "100%", padding: "16px 20px", background: "#333", border: "1px solid #444", color: "#fff", fontSize: "15px", marginBottom: "15px", outline: "none" }} />
                <input type="tel" placeholder="Telefon Numaranız" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: "100%", padding: "16px 20px", background: "#333", border: "1px solid #444", color: "#fff", fontSize: "15px", marginBottom: "30px", outline: "none" }} />
              </div>
              <div style={{ background: "#333", padding: "25px", marginBottom: "30px", textAlign: "left", maxWidth: "400px", margin: "0 auto 30px" }}>
                <p style={{ color: "#888", fontSize: "13px", marginBottom: "10px" }}>Hizmet: <span style={{ color: "#fff" }}>{services.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(", ")}</span></p>
                <p style={{ color: "#888", fontSize: "13px", marginBottom: "10px" }}>Tarih: <span style={{ color: "#fff" }}>{selectedDate && formatDate(selectedDate)}</span></p>
                <p style={{ color: "#888", fontSize: "13px" }}>Saat: <span style={{ color: "#fff" }}>{selectedTime}</span></p>
              </div>
              <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                <button onClick={() => setShowBookingForm(false)} style={{ background: "transparent", border: "1px solid #555", color: "#888", padding: "16px 40px", fontSize: "13px", cursor: "pointer" }}>GERİ</button>
                <button onClick={handleBooking} disabled={!canSubmit} style={{
                  background: canSubmit ? "#d4af37" : "#444", border: "none", color: canSubmit ? "#1a1a1a" : "#888",
                  padding: "16px 40px", fontSize: "13px", letterSpacing: "2px", cursor: canSubmit ? "pointer" : "not-allowed", fontWeight: "600"
                }}>ONAYLA</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section id="iletisim" style={{ padding: "clamp(60px, 10vw, 120px) clamp(15px, 4vw, 40px)", background: "#242424" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "4px", marginBottom: "20px" }}>İLETİŞİM</p>
          <h3 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(36px, 9vw, 68px)", color: "#fff", fontWeight: "normal", marginBottom: "clamp(30px, 8vw, 60px)" }}>
            Bize Ulaşın
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
            <div>
              <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "2px", marginBottom: "15px" }}>ADRES</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Feriköy+Kurtuluş+Cad+Azak+Sk+6/A+34377+Şişli+İstanbul" target="_blank" rel="noopener noreferrer" style={{ color: "#888", fontSize: "14px", lineHeight: "1.8", textDecoration: "none", display: "block" }}>
                Feriköy Kurtuluş Cad,<br />Azak Sk. 6/A,<br />34377 Şişli/İstanbul
              </a>
            </div>
            <div>
              <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "2px", marginBottom: "15px" }}>TELEFON</p>
              <a href="tel:+905305590682" style={{ color: "#fff", textDecoration: "none", fontSize: "clamp(16px, 4vw, 18px)" }}>0530 559 06 82</a>
            </div>
            <div>
              <p style={{ color: "#d4af37", fontSize: "13px", letterSpacing: "2px", marginBottom: "15px" }}>ÇALIŞMA SAATLERİ</p>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.8" }}>
                Pazartesi - Cumartesi<br />08:30 - 21:00<br /><span style={{ color: "#d4af37" }}>Pazar Kapalı</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "clamp(30px, 6vw, 50px) clamp(15px, 4vw, 40px)", background: "#1a1a1a", borderTop: "1px solid #333", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Shimes Two', cursive", fontSize: "clamp(24px, 6vw, 32px)", color: "#d4af37", fontWeight: "normal", marginBottom: "20px" }}>
          Kemal Çağlı
        </h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "25px", flexWrap: "wrap" }}>
          <a href="https://www.instagram.com/kemal_cagli/" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>Instagram</a>
          <a href="tel:+905305590682" style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>Telefon</a>
          <a href="#iletisim" style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>İletişim</a>
        </div>
        <p style={{ color: "#555", fontSize: "12px" }}>© 2024 Kemal Çağlı Berber. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
