import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';

// ── PRESET CLIENT PROFILES ──────────────────────────────────────────────────
const PRESET_CLIENTS = [
  { id: 'dainfern', name: 'Dainfern Residential Estate', contact: 'John Davis', email: 'john@dainfernestates.co.za', phone: '+27 82 455 1928', address: 'Plot 44, Dainfern Valley Road, Dainfern, 2055' },
  { id: 'midrand-sports', name: 'Midrand Sports Club', contact: 'Sarah Govender', email: 'info@midrandsports.co.za', phone: '+27 11 805 1772', address: '12 Bekker Road, Halfway House, Midrand, 1685' },
  { id: 'ct-villas', name: 'Cape Town Luxury Villas', contact: 'Michelle Botha', email: 'michelle@ctvillas.co.za', phone: '+27 21 438 1900', address: '88 Victoria Road, Camps Bay, Cape Town, 8005' }
];

// ── PRESET CONSTRUCTION SERVICES ─────────────────────────────────────────────
const PRESET_SERVICES = [
  { id: 'composite-decking', name: 'Eva-Last Composite Decking Install', price: 1650, unit: 'm²', category: 'Decking', sans: 'SANS 10400 Balustrade Compliant' },
  { id: 'garapa-decking', name: 'Premium Garapa Hardwood Decking Install', price: 1800, unit: 'm²', category: 'Decking', sans: 'Height & Post Certified' },
  { id: 'concrete-pool', name: 'Shotcrete Concrete Swimming Pool construction', price: 85000, unit: 'flat', category: 'Pools', sans: 'Excavation Certified' },
  { id: 'fibreglass-pool', name: 'Pre-formed Fibreglass Pool Shell installation', price: 72000, unit: 'flat', category: 'Pools', sans: 'Safety Drainage Certified' },
  { id: 'timber-pergola', name: 'Custom Structural Timber Pergola', price: 12000, unit: 'flat', category: 'Structures', sans: 'Wind Load Certified' },
  { id: 'engineer-cert', name: 'Structural Engineer Sign-off & NHBRC submission', price: 4500, unit: 'flat', category: 'Consulting', sans: 'Engineer Certified' }
];

export default function QuoteInvoiceGenerator({ setView }) {
  // ── DOCUMENT BASIC STATE ───────────────────────────────────────────────────
  const [docType, setDocType] = useState('Quotation'); // 'Quotation' | 'Tax Invoice'
  const [docNumber, setDocNumber] = useState(`MGL-${Math.floor(1000 + Math.random() * 9000)}`);
  const [dateIssued, setDateIssued] = useState(new Date().toISOString().split('T')[0]);
  const [dateDue, setDateDue] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [docStatus, setDocStatus] = useState('Draft'); // Draft, Sent, Approved, Paid, Overdue

  // ── COMPANY PROFILE ────────────────────────────────────────────────────────
  const [companyName, setCompanyName] = useState('Magalela Trading & Projects');
  const [companyAddress, setCompanyAddress] = useState('Block G, Hertford Office Park, Midrand, 1686');
  const [companyVat, setCompanyVat] = useState('ZA4830291029');
  const [companyEmail, setCompanyEmail] = useState('info@magalelatrading.co.za');
  const [companyPhone, setCompanyPhone] = useState('+27 87 510 1772');

  // ── CLIENT PROFILE ─────────────────────────────────────────────────────────
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // ── LINE ITEMS ─────────────────────────────────────────────────────────────
  const [lineItems, setLineItems] = useState([
    { id: 1, description: 'Eva-Last Composite Decking Install', qty: 12, unitPrice: 1650, total: 19800, sans: 'SANS 10400 Balustrade Compliant' }
  ]);

  // ── DISCOUNTS & TAXES ──────────────────────────────────────────────────────
  const [discountPct, setDiscountPct] = useState(0);
  const [taxRatePct, setTaxRatePct] = useState(15); // standard SA 15% VAT
  const [transportFee, setTransportFee] = useState(1500);

  // ── MILESTONE SCHEDULE PLANNER ─────────────────────────────────────────────
  const [enableMilestones, setEnableMilestones] = useState(true);
  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Deposit on signature', pct: 50 },
    { id: 2, name: 'On structural subframe completion', pct: 30 },
    { id: 3, name: 'On final handover / sign-off', pct: 20 }
  ]);

  // ── THEME & LAYOUT OVERRIDES ───────────────────────────────────────────────
  const [accentColor, setAccentColor] = useState('#b87333'); // Default Copper
  const [showSignature, setShowSignature] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [showSansNotes, setShowSansNotes] = useState(true);
  const [showTerms, setShowTerms] = useState(true);

  // Custom Logo and Mobile responsive states
  const [logoUrl, setLogoUrl] = useState('/images/magalela_logo.png');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [activeMobileTab, setActiveMobileTab] = useState('edit');

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('magalela_admin_auth') === 'true');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginUser.trim().toLowerCase() === 'admin' && loginPass === 'magalela-admin-2026') {
      setIsAdmin(true);
      sessionStorage.setItem('magalela_admin_auth', 'true');
      addToast('Authenticated successfully', 'success');
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('magalela_admin_auth');
    addToast('Logged out of admin session', 'info');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── SIGNATURE PAD STATE ─────────────────────────────────────────────────────
  const sigCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sigImgSrc, setSigImgSrc] = useState('');

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // ── COMPUTED TOTALS ────────────────────────────────────────────────────────
  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const discountVal = Math.round(subtotal * (discountPct / 100));
  const taxableAmount = subtotal - discountVal + Number(transportFee);
  const vatVal = Math.round(taxableAmount * (taxRatePct / 100));
  const grandTotal = taxableAmount + vatVal;

  // ── HANDLERS ───────────────────────────────────────────────────────────────
  const selectClientTemplate = (clientId) => {
    if (!clientId) return;
    const client = PRESET_CLIENTS.find(c => c.id === clientId);
    if (client) {
      setClientName(client.name);
      setClientContact(client.contact);
      setClientEmail(client.email);
      setClientPhone(client.phone);
      setClientAddress(client.address);
      addToast(`Loaded ${client.name} profile`, 'success');
    }
  };

  const addLineItem = (presetId = '') => {
    let newItem = {
      id: Date.now(),
      description: '',
      qty: 1,
      unitPrice: 0,
      total: 0,
      sans: 'None'
    };

    if (presetId) {
      const preset = PRESET_SERVICES.find(s => s.id === presetId);
      if (preset) {
        newItem.description = preset.name;
        newItem.unitPrice = preset.price;
        newItem.total = preset.price;
        newItem.sans = preset.sans;
        addToast(`Added preset: ${preset.name}`, 'info');
      }
    }

    setLineItems(prev => [...prev, newItem]);
  };

  const updateLineItem = (id, field, value) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'qty' || field === 'unitPrice') {
          updated.total = Number(updated.qty) * Number(updated.unitPrice);
        }
        return updated;
      }
      return item;
    }));
  };

  const removeLineItem = (id) => {
    if (lineItems.length === 1) {
      addToast('Document must contain at least one line item', 'error');
      return;
    }
    setLineItems(prev => prev.filter(item => item.id !== id));
    addToast('Item removed', 'info');
  };

  const loadSampleDocument = () => {
    setDocType('Quotation');
    setDocNumber(`MGL-${Math.floor(1000 + Math.random() * 9000)}`);
    setClientName('Dainfern Residential Estate');
    setClientContact('John Davis');
    setClientEmail('john@dainfernestates.co.za');
    setClientPhone('+27 82 455 1928');
    setClientAddress('Plot 44, Dainfern Valley Road, Dainfern, 2055');
    setDiscountPct(5);
    setTransportFee(2500);

    setLineItems([
      { id: 1, description: 'Eva-Last Composite Decking Install (Vorna Range)', qty: 45, unitPrice: 1650, total: 74250, sans: 'SANS 10400 Balustrade Compliant' },
      { id: 2, description: 'Concrete Structural subframing post anchor installation', qty: 16, unitPrice: 450, total: 7200, sans: 'Height & Post Certified' },
      { id: 3, description: 'SANS 10400 compliance balustrade and handrail (Balau)', qty: 1, unitPrice: 8500, total: 8500, sans: 'SANS 10400 Balustrade Compliant' }
    ]);

    addToast('Loaded sample quotation details', 'success');
  };

  // ── DRAW SIGNATURE MOUSE PAD ────────────────────────────────────────────────
  const startDrawing = (e) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawSig = (e) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = sigCanvasRef.current;
    if (canvas) {
      setSigImgSrc(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = sigCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSigImgSrc('');
      addToast('Signature cleared', 'info');
    }
  };

  // ── PRINT & EXPORT OVERRIDES ───────────────────────────────────────────────
  const triggerPrintWindow = () => {
    addToast('Opening print dialog...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const triggerPDFExport = () => {
    addToast('Exporting vector PDF...', 'info');
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Parse theme accent highlight color
      const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16) || 15;
        const g = parseInt(hex.slice(3, 5), 16) || 23;
        const b = parseInt(hex.slice(5, 7), 16) || 42;
        return { r, g, b };
      };
      const rgb = hexToRgb(accentColor);
      const isLightAccent = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186;

      // Render company header logo
      if (logoUrl && (logoUrl.startsWith('data:image') || logoUrl.includes('logo'))) {
        try {
          doc.addImage(logoUrl, 'PNG', 15, 12, 18, 18);
        } catch (err) {
          console.error('Failed to add logo in PDF:', err);
        }
      }

      // Title & tagline
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(15);
      doc.setFont('Helvetica', 'bold');
      doc.text(companyName, 36, 18);
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont('Helvetica', 'normal');
      doc.text('BUILDING, TIMBER & OUTDOOR ALTERATIONS COMPLIANCE', 36, 23);

      // Document Type & Number (Top Right aligned)
      doc.setTextColor(rgb.r, rgb.g, rgb.b);
      doc.setFontSize(15);
      doc.setFont('Helvetica', 'bold');
      doc.text(docType.toUpperCase(), 195, 18, { align: 'right' });

      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.setFont('Helvetica', 'normal');
      doc.text(`Doc No: ${docNumber}`, 195, 23, { align: 'right' });
      doc.text(`Issued: ${dateIssued}`, 195, 27, { align: 'right' });
      doc.text(`Due: ${dateDue}`, 195, 31, { align: 'right' });

      // Clean separator line
      doc.setDrawColor(rgb.r, rgb.g, rgb.b);
      doc.setLineWidth(0.4);
      doc.line(15, 35, 195, 35);

      // Two-column details block
      // Column 1: Client specifications (Left aligned)
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.setFont('Helvetica', 'bold');
      doc.text('CLIENT SPECIFICATIONS:', 15, 42);
      doc.setFont('Helvetica', 'normal');
      doc.text(clientName || 'N/A', 15, 47);
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Contact: ${clientContact || 'N/A'}`, 15, 51);
      doc.text(`Tel: ${clientPhone || 'N/A'} | Email: ${clientEmail || 'N/A'}`, 15, 55);
      doc.text(`Address: ${clientAddress || 'N/A'}`, 15, 59);

      // Column 2: Service Provider details (Right aligned)
      doc.setFontSize(9);
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('SERVICE PROVIDER DETAILS:', 195, 42, { align: 'right' });
      doc.setFont('Helvetica', 'normal');
      doc.text(companyName, 195, 47, { align: 'right' });
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Address: ${companyAddress}`, 195, 51, { align: 'right' });
      doc.text(`VAT ID: ${companyVat}`, 195, 55, { align: 'right' });
      doc.text(`Tel: ${companyPhone} | Email: ${companyEmail}`, 195, 59, { align: 'right' });

      // Items table headers
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 66, 180, 7, 'F');
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8);
      doc.setFont('Helvetica', 'bold');
      doc.text('DESCRIPTION', 17, 71);
      doc.text('QTY', 125, 71, { align: 'right' });
      doc.text('RATE (ZAR)', 155, 71, { align: 'right' });
      doc.text('TOTAL', 190, 71, { align: 'right' });

      doc.setFont('Helvetica', 'normal');
      let currentY = 79;
      lineItems.forEach((item) => {
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(item.description, 17, currentY);
        doc.text(String(item.qty), 125, currentY, { align: 'right' });
        doc.text(`R${item.unitPrice.toLocaleString()}`, 155, currentY, { align: 'right' });
        doc.text(`R${item.total.toLocaleString()}`, 190, currentY, { align: 'right' });

        if (item.sans !== 'None') {
          doc.setFontSize(7.5);
          doc.setTextColor(34, 197, 94);
          doc.text(`[ SANS 10400 COMPLIANT: ${item.sans} ]`, 17, currentY + 3.5);
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          currentY += 4;
        }

        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(15, currentY + 3, 195, currentY + 3);

        currentY += 8;
      });

      // Subtotals layout
      currentY += 2;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('SUBTOTAL:', 130, currentY);
      doc.setFont('Helvetica', 'normal');
      doc.text(`R${subtotal.toLocaleString()}`, 190, currentY, { align: 'right' });

      if (discountPct > 0) {
        currentY += 6;
        doc.text(`DISCOUNT (${discountPct}%):`, 130, currentY);
        doc.text(`-R${discountVal.toLocaleString()}`, 190, currentY, { align: 'right' });
      }

      currentY += 6;
      doc.text('TRANSPORT/DELIVERY:', 130, currentY);
      doc.text(`R${transportFee.toLocaleString()}`, 190, currentY, { align: 'right' });

      currentY += 6;
      doc.text(`VAT (${taxRatePct}%):`, 130, currentY);
      doc.text(`R${vatVal.toLocaleString()}`, 190, currentY, { align: 'right' });

      currentY += 8;
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.rect(125, currentY - 5, 70, 8, 'F');
      doc.setTextColor(isLightAccent ? 0 : 255);
      doc.setFont('Helvetica', 'bold');
      doc.text('GRAND TOTAL:', 127, currentY);
      doc.text(`R${grandTotal.toLocaleString()}`, 192, currentY, { align: 'right' });

      // Milestones schedule (if enabled, print on bottom-left)
      if (enableMilestones) {
        let milestoneY = currentY - 26;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, milestoneY - 4, 95, 4 + (milestones.length * 5) + 4, 'F');
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(7.5);
        doc.setFont('Helvetica', 'bold');
        doc.text('PROGRESSIVE PAYMENT SCHEDULE:', 18, milestoneY);
        doc.setFont('Helvetica', 'normal');
        milestones.forEach(m => {
          milestoneY += 5;
          doc.text(`${m.name} (${m.pct}%)`, 18, milestoneY);
          doc.text(`R${Math.round(grandTotal * (m.pct / 100)).toLocaleString()}`, 105, milestoneY, { align: 'right' });
        });
      }

      // Signatures & Bank details
      doc.setTextColor(15, 23, 42);
      currentY += 12;
      if (showBankDetails) {
        doc.setFontSize(8.5);
        doc.setFont('Helvetica', 'bold');
        doc.text('DEPOSIT BANKING DETAILS:', 15, currentY);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text('Bank Name: Nedbank South Africa', 15, currentY + 4.5);
        doc.text('Account No: 1202830192', 15, currentY + 9);
        doc.text('Branch Code: 198765', 15, currentY + 13.5);
        doc.text(`Reference: ${docNumber}`, 15, currentY + 18);
      }

      if (showSignature && sigImgSrc) {
        doc.setTextColor(15, 23, 42);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text('AUTHORIZED SIGNATURE:', 130, currentY);
        doc.addImage(sigImgSrc, 'PNG', 130, currentY + 3, 36, 12);
      }

      doc.save(`Magalela_${docType.replace(' ', '')}_${docNumber}.pdf`);
      addToast('Invoice PDF downloaded successfully', 'success');
    } catch (e) {
      console.error(e);
      addToast('Failed to export PDF', 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login-gate" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#070a13',
        fontFamily: 'Archivo, sans-serif',
        color: '#fff',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '40px 30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <img src={logoUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#fff', borderRadius: '12px', padding: '4px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>ADMIN PORTAL GATE</h2>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '4px' }}>
              Authentication is required to access the Quote & Invoice Studio
            </span>
          </div>

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>USERNAME</label>
              <input
                type="text"
                value={loginUser}
                onChange={e => setLoginUser(e.target.value)}
                placeholder="Enter admin username"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>PASSWORD / ACCESS PIN</label>
              <input
                type="password"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                placeholder="Enter password"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                required
              />
            </div>

            {loginError && (
              <div style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 700 }}>
                ❌ {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: accentColor,
                color: '#000',
                border: 'none',
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: `0 0 15px ${accentColor}44`,
                marginTop: '8px'
              }}
            >
              Sign In to Studio
            </button>
          </form>

          <button
            onClick={() => setView('landing')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-invoice-studio" style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '480px 1fr',
      height: '100vh',
      background: '#070a13',
      color: '#fff',
      fontFamily: 'Archivo, sans-serif',
      overflow: 'hidden'
    }}>
      
      {/* Mobile navigation tab header */}
      {isMobile && (
        <div className="no-print" style={{
          display: 'flex',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          gridColumn: '1 / -1',
          zIndex: 45
        }}>
          <button
            onClick={() => setActiveMobileTab('edit')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              background: activeMobileTab === 'edit' ? 'rgba(255,255,255,0.03)' : 'none',
              color: activeMobileTab === 'edit' ? accentColor : 'rgba(255,255,255,0.5)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              borderBottom: activeMobileTab === 'edit' ? `2px solid ${accentColor}` : 'none'
            }}
          >
            ✏️ Edit Form
          </button>
          <button
            onClick={() => setActiveMobileTab('preview')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              background: activeMobileTab === 'preview' ? 'rgba(255,255,255,0.03)' : 'none',
              color: activeMobileTab === 'preview' ? accentColor : 'rgba(255,255,255,0.5)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              borderBottom: activeMobileTab === 'preview' ? `2px solid ${accentColor}` : 'none'
            }}
          >
            📄 View Preview
          </button>
        </div>
      )}
      
      {/* Toast notifications container */}
      <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '12px 20px',
            background: t.type === 'success' ? '#22C55E' : t.type === 'error' ? '#EF4444' : '#00E5FF',
            color: '#000',
            fontWeight: 700,
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            fontSize: '0.9rem',
            animation: 'slideUp 0.2s ease-out'
          }}>
            {t.message}
          </div>
        ))}
      </div>

      {/* ── LEFT EDITOR PANEL ── */}
      <aside className="editor-panel" style={{
        background: 'rgba(15, 23, 42, 0.65)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        padding: '24px',
        display: (!isMobile || activeMobileTab === 'edit') ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        zIndex: 10
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>QUOTE & INVOICE STUDIO</h1>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '2px', fontWeight: 700 }}>PROFESSIONAL BILLING WORKSPACE</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleAdminLogout}
              style={{
                padding: '6px 12px', borderRadius: '100px', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700
              }}
            >
              Log Out
            </button>
            <button 
              onClick={() => setView('landing')}
              style={{
                padding: '6px 12px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700
              }}
            >
              Exit Studio
            </button>
          </div>
        </div>

        {/* Global Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={loadSampleDocument} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
            📁 Load Sample Quote
          </button>
          <button onClick={() => {
            setLineItems([{ id: 1, description: '', qty: 1, unitPrice: 0, total: 0, sans: 'None' }]);
            setClientName(''); setClientContact(''); setClientEmail(''); setClientPhone(''); setClientAddress('');
            clearSignature();
            addToast('Form fields reset', 'info');
          }} style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', color: '#EF4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
            🗑️ Reset Form
          </button>
        </div>

        {/* 1. Document Configuration (addition 5: custom accent color picker) */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>DOCUMENT PROFILE & THEME</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>TYPE</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}>
                <option value="Quotation">Quotation</option>
                <option value="Tax Invoice">Tax Invoice</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>DOC NUMBER</label>
              <input type="text" value={docNumber} onChange={(e) => setDocNumber(e.target.value)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>DATE ISSUED</label>
              <input type="date" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>DUE DATE</label>
              <input type="date" value={dateDue} onChange={(e) => setDateDue(e.target.value)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
          </div>

          {/* Accent Color Palette */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px' }}>ACCENT HIGHLIGHT COLOR</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['#b87333', '#d4af37', '#00E5FF', '#22C55E', '#EF4444', '#2563eb'].map(color => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: color,
                    border: accentColor === color ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>

          {/* Company Logo Uploader */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px' }}>COMPANY LOGO</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={logoUrl} alt="Company Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255,255,255,0.15)' }} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      setLogoUrl(evt.target.result);
                      addToast('Custom logo uploaded successfully', 'success');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* 2. Client Quick-Search Profiles (addition 1: Saved Profiles quick search) */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>CLIENT INFORMATION</div>
          
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>LOAD SAVED PROFILE</label>
            <select onChange={(e) => selectClientTemplate(e.target.value)} defaultValue="" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}>
              <option value="" disabled>-- Select a template to auto-fill --</option>
              {PRESET_CLIENTS.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.contact})</option>
              ))}
            </select>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>COMPANY/CLIENT NAME</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Dainfern Estate Club" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>CONTACT PERSON</label>
              <input type="text" value={clientContact} onChange={(e) => setClientContact(e.target.value)} placeholder="e.g. John Davis" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>CONTACT PHONE</label>
              <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+27 82 000 0000" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>CONTACT EMAIL</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@address.co.za" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>BILLING ADDRESS</label>
            <textarea value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="Enter full billing address..." rows="2" style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', resize: 'none' }} />
          </div>
        </div>

        {/* 3. Items Editor Form */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>LINE ITEMS & SERVICES</span>
            <button onClick={() => addLineItem()} style={{ background: 'none', border: 'none', color: '#00E5FF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>+ ADD CUSTOM ROW</button>
          </div>

          {/* Quick presets injection */}
          <div>
            <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>QUICK INSERT PRESET SERVICE:</label>
            <select onChange={(e) => { addLineItem(e.target.value); e.target.value = ''; }} style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem', outline: 'none' }}>
              <option value="">-- Click to insert construction preset --</option>
              {PRESET_SERVICES.map(s => (
                <option key={s.id} value={s.id}>{s.name} (R{s.price}/{s.unit})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {lineItems.map((item, index) => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>ITEM #{index + 1}</span>
                  <button onClick={() => removeLineItem(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.72rem', cursor: 'pointer' }}>✕ REMOVE</button>
                </div>
                
                <div>
                  <input type="text" value={item.description} onChange={(e) => updateLineItem(item.id, 'description', e.target.value)} placeholder="Service description..." style={{ width: '100%', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '2px' }}>QTY</label>
                    <input type="number" min="1" value={item.qty} onChange={(e) => updateLineItem(item.id, 'qty', parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '6px 8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '2px' }}>UNIT RATE (R)</label>
                    <input type="number" value={item.unitPrice} onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '6px 8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem' }} />
                  </div>
                  {/* SANS 10400 Tag Selector (addition 2: SANS compliance flags on items) */}
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '2px' }}>SANS CODE</label>
                    <select value={item.sans} onChange={(e) => updateLineItem(item.id, 'sans', e.target.value)} style={{ width: '100%', padding: '6px 4px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}>
                      <option value="None">None</option>
                      <option value="SANS 10400 Balustrade Compliant">Balustrade Safe</option>
                      <option value="Height & Post Certified">Height post cert</option>
                      <option value="Excavation Certified">Excavation cert</option>
                      <option value="Wind Load Certified">Wind Load cert</option>
                      <option value="Engineer Certified">Engineer Sign</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Financial Calculations Form */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>TAXES, FEES & DISCOUNTS</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>DISCOUNT (%)</label>
              <input type="number" min="0" max="100" value={discountPct} onChange={(e) => setDiscountPct(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>TRANSPORT/DELIVERY FEE (R)</label>
              <input type="number" value={transportFee} onChange={(e) => setTransportFee(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>VAT RATE (%)</label>
            <select value={taxRatePct} onChange={(e) => setTaxRatePct(parseInt(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}>
              <option value="15">15% VAT (Standard SA)</option>
              <option value="0">0% VAT (Exempt)</option>
            </select>
          </div>
        </div>

        {/* 5. Progressive Milestone Schedule (addition 3: milestones planner) */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', cursor: 'pointer' }}>
              <input type="checkbox" checked={enableMilestones} onChange={(e) => setEnableMilestones(e.target.checked)} style={{ accentColor: accentColor }} />
              MILESTONE PAYMENT SCHEDULE
            </label>
            {enableMilestones && (
              <button onClick={() => {
                setMilestones([
                  { id: 1, name: 'Deposit on signature', pct: 50 },
                  { id: 2, name: 'On structural subframe completion', pct: 30 },
                  { id: 3, name: 'On final handover / sign-off', pct: 20 }
                ]);
              }} style={{ background: 'none', border: 'none', color: '#00E5FF', fontSize: '0.72rem', cursor: 'pointer' }}>Reset Default</button>
            )}
          </div>

          {enableMilestones && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {milestones.map((milestone) => (
                <div key={milestone.id} style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '8px', alignItems: 'center' }}>
                  <input type="text" value={milestone.name} onChange={(e) => {
                    const val = e.target.value;
                    setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, name: val } : m));
                  }} style={{ padding: '6px 8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="number" min="0" max="100" value={milestone.pct} onChange={(e) => {
                      const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                      setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, pct: val } : m));
                    }} style={{ width: '60px', padding: '6px 8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#fff', fontSize: '0.78rem' }} />
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>%</span>
                  </div>
                </div>
              ))}
              
              {/* Check totals warning */}
              {milestones.reduce((sum, m) => sum + m.pct, 0) !== 100 && (
                <div style={{ color: '#EF4444', fontSize: '0.72rem', fontWeight: 700, marginTop: '4px' }}>
                  ⚠️ Warning: Milestones total is {milestones.reduce((sum, m) => sum + m.pct, 0)}% (must be 100%).
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6. Digital Signature Pad (addition 4: Signature pad input) */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>DIGITAL SIGNATURE PAD</span>
            <button onClick={clearSignature} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.72rem', cursor: 'pointer' }}>CLEAR PAD</button>
          </div>

          <div style={{ background: '#02050f', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '8px', overflow: 'hidden' }}>
            <canvas
              ref={sigCanvasRef}
              width="380"
              height="110"
              onMouseDown={startDrawing}
              onMouseMove={drawSig}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              style={{ display: 'block', cursor: 'crosshair', width: '100%' }}
            />
          </div>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', display: 'block' }}>
            Draw signature above. It will populate in the document sheet.
          </span>
        </div>

        {/* 7. Details Customizer Panel */}
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>DETAILS VISIBILITY SETTINGS</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showSignature} onChange={(e) => setShowSignature(e.target.checked)} style={{ accentColor: accentColor }} />
              Include Authorized Signature
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showBankDetails} onChange={(e) => setShowBankDetails(e.target.checked)} style={{ accentColor: accentColor }} />
              Include Deposit Banking Details
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showSansNotes} onChange={(e) => setShowSansNotes(e.target.checked)} style={{ accentColor: accentColor }} />
              Include SANS 10400 Safety Notes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showTerms} onChange={(e) => setShowTerms(e.target.checked)} style={{ accentColor: accentColor }} />
              Include Legal Terms & Conditions
            </label>
          </div>
        </div>

      </aside>

       {/* ── RIGHT LIVE SHEET PREVIEW ── */}
      <main className="preview-panel" style={{
        background: '#0a0f1d',
        overflowY: 'auto',
        padding: isMobile ? '12px' : '40px',
        display: (!isMobile || activeMobileTab === 'preview') ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        
        {/* Floating Print options bar */}
        <div className="no-print" style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: isMobile ? '18px' : '100px',
          padding: isMobile ? '16px' : '8px 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          alignSelf: 'center',
          width: isMobile ? '100%' : 'auto',
          zIndex: 40
        }}>
          {/* Status selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>STATUS:</span>
            <select value={docStatus} onChange={(e) => setDocStatus(e.target.value)} style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700, width: isMobile ? '120px' : 'auto' }}>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {!isMobile && <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)' }} />}

          <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
            <button onClick={triggerPrintWindow} style={{ flex: 1, padding: '10px 20px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              🖨️ Print Sheet
            </button>
            <button onClick={triggerPDFExport} style={{ flex: 1, padding: '10px 24px', borderRadius: '100px', background: accentColor, color: '#000', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem', boxShadow: `0 0 15px ${accentColor}44`, whiteSpace: 'nowrap' }}>
              📄 Export PDF
            </button>
          </div>
        </div>

        {/* ── PRINT SHEET CONTAINER ── */}
        <section className="print-sheet-layout" style={{
          width: '100%',
          maxWidth: '780px',
          minHeight: isMobile ? 'auto' : '1050px',
          background: '#fff',
          color: '#0f172a',
          padding: isMobile ? '24px' : '50px',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: isMobile ? 'visible' : 'hidden'
        }}>
          {/* Angled background Watermark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            fontSize: isMobile ? '4.5rem' : '8rem',
            fontWeight: 900,
            color: docStatus === 'Paid' ? 'rgba(34, 197, 94, 0.05)' : docStatus === 'Overdue' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(15, 23, 42, 0.03)',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '0.1em'
          }}>
            {docStatus.toUpperCase()}
          </div>

          <div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: isMobile ? '20px' : '0', borderBottom: `3px solid ${accentColor}`, paddingBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', textAlign: 'left' }}>
                <img src={logoUrl} alt="Logo" style={{ width: '56px', height: '56px', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '3px', border: '1px solid #e2e8f0' }} />
                <div>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 900, fontSize: isMobile ? '1.3rem' : '1.6rem', width: isMobile ? '100%' : '280px', padding: 0 }} />
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', fontWeight: 700 }}>
                    BUILDING, TIMBER & OUTDOOR ALTERATIONS COMPLIANCE
                  </div>
                </div>
              </div>
              <div style={{ textAlign: isMobile ? 'left' : 'right', fontSize: '0.8rem', color: '#334155', lineHeight: 1.4, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
                <input type="text" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: isMobile ? '100%' : '250px', textAlign: isMobile ? 'left' : 'right', padding: 0 }} />
                <div style={{ display: 'flex', gap: '4px', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                  <span>VAT ID:</span>
                  <input type="text" value={companyVat} onChange={e => setCompanyVat(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '100px', fontWeight: 'bold', textAlign: isMobile ? 'left' : 'right', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: isMobile ? 'flex-start' : 'flex-end', flexWrap: 'wrap' }}>
                  <span>Tel:</span>
                  <input type="text" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '90px', padding: 0 }} />
                  <span>|</span>
                  <input type="text" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '150px', padding: 0 }} />
                </div>
              </div>
            </div>

            {/* Document metadata info panel */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '20px' : '30px', marginTop: '30px' }}>
              {/* Client specifications details */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 900, letterSpacing: '0.05em' }}>CLIENT SPECIFICATIONS</span>
                <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Click to add Client Name" style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1.05rem', width: '100%', padding: 0 }} />
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.88rem', color: '#1e293b' }}>
                  <span>Contact:</span>
                  <input type="text" value={clientContact} onChange={e => setClientContact(e.target.value)} placeholder="Contact Person" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '150px', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.88rem', color: '#1e293b' }}>
                  <span>Tel:</span>
                  <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="Phone" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '150px', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.88rem', color: '#1e293b' }}>
                  <span>Email:</span>
                  <input type="text" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="Email" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '180px', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.88rem', color: '#1e293b' }}>
                  <span>Address:</span>
                  <input type="text" value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="Billing Address" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '250px', padding: 0 }} />
                </div>
              </div>

              {/* Document Number & Date details */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 900, letterSpacing: '0.05em' }}>DOCUMENT METADATA</span>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', color: '#1e293b' }}>
                  <span>Type:</span>
                  <strong style={{ color: accentColor }}>{docType}</strong>
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', color: '#1e293b' }}>
                  <span>Doc No:</span>
                  <input type="text" value={docNumber} onChange={e => setDocNumber(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '80px', fontWeight: 'bold', textAlign: 'right', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', color: '#1e293b' }}>
                  <span>Date Issued:</span>
                  <input type="date" value={dateIssued} onChange={e => setDateIssued(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', textAlign: 'right', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', color: '#1e293b' }}>
                  <span>Due Date:</span>
                  <input type="date" value={dateDue} onChange={e => setDateDue(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', textAlign: 'right', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '0.9rem', color: '#1e293b' }}>
                  <span>Status:</span>
                  <strong style={{ color: docStatus === 'Paid' ? '#22c55e' : docStatus === 'Overdue' ? '#ef4444' : '#64748b' }}>{docStatus.toUpperCase()}</strong>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div style={{ marginTop: '40px', overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', minWidth: isMobile ? '420px' : 'auto', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: isMobile ? '8px 10px' : '12px 16px', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>DESCRIPTION</th>
                    <th style={{ padding: isMobile ? '8px 10px' : '12px 16px', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textAlign: 'right' }}>QTY</th>
                    <th style={{ padding: isMobile ? '8px 10px' : '12px 16px', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textAlign: 'right' }}>RATE</th>
                    <th style={{ padding: isMobile ? '8px 10px' : '12px 16px', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textAlign: 'right' }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: isMobile ? '10px 8px' : '14px 16px', fontSize: isMobile ? '0.75rem' : '0.88rem', color: '#1e293b', fontWeight: 600 }}>
                          <input type="text" value={item.description} onChange={e => updateLineItem(item.id, 'description', e.target.value)} placeholder="Service description..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1e293b', fontWeight: 600, fontSize: isMobile ? '0.75rem' : '0.88rem', width: '100%', padding: 0 }} />
                        </td>
                        <td style={{ padding: isMobile ? '10px 8px' : '14px 16px', fontSize: isMobile ? '0.75rem' : '0.88rem', color: '#334155', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                          <input type="number" min="1" value={item.qty} onChange={e => updateLineItem(item.id, 'qty', parseInt(e.target.value) || 1)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#334155', fontSize: isMobile ? '0.75rem' : '0.88rem', fontFamily: 'JetBrains Mono, monospace', width: isMobile ? '40px' : '50px', textAlign: 'right', padding: 0 }} />
                        </td>
                        <td style={{ padding: isMobile ? '10px 8px' : '14px 16px', fontSize: isMobile ? '0.75rem' : '0.88rem', color: '#334155', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                          <div style={{ display: 'flex', gap: '2px', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <span>R</span>
                            <input type="number" value={item.unitPrice} onChange={e => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#334155', fontSize: isMobile ? '0.75rem' : '0.88rem', fontFamily: 'JetBrains Mono, monospace', width: isMobile ? '60px' : '80px', textAlign: 'right', padding: 0 }} />
                          </div>
                        </td>
                        <td style={{ padding: isMobile ? '10px 8px' : '14px 16px', fontSize: isMobile ? '0.75rem' : '0.88rem', color: '#0f172a', fontWeight: 700, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                          R{item.total.toLocaleString()}
                        </td>
                      </tr>
                      {/* SANS tag badge row */}
                      {item.sans !== 'None' && (
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td colSpan="4" style={{ padding: '4px 16px 10px 16px', background: '#fafaf9' }}>
                            <span style={{ fontSize: '0.7rem', background: 'rgba(34, 197, 94, 0.1)', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                              ✓ SANS 10400 COMPLIANT: {item.sans}
                            </span>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '20px' : '30px', marginTop: '40px' }}>
              {/* Payment Milestones (addition 3: milestone schedule display) */}
              <div style={{ textAlign: 'left' }}>
                {enableMilestones && (
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 900, letterSpacing: '0.05em' }}>PROGRESSIVE PAYMENT SCHEDULE</span>
                    <div style={{ marginTop: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                      {milestones.map((m) => (
                        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', background: '#f8fafc' }}>
                          <span style={{ color: '#475569', fontWeight: 600 }}>{m.name} ({m.pct}%)</span>
                          <strong style={{ color: '#0f172a', fontFamily: 'JetBrains Mono' }}>R{Math.round(grandTotal * (m.pct / 100)).toLocaleString()}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Calculations layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0f172a' }}>R{subtotal.toLocaleString()}</span>
                </div>
                {discountVal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Discount (</span>
                      <input type="number" value={discountPct} onChange={e => setDiscountPct(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '30px', textAlign: 'center', padding: 0 }} />
                      <span>%):</span>
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>-R{discountVal.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Transport & Logistics:</span>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <span>R</span>
                    <input type="number" value={transportFee} onChange={e => setTransportFee(parseFloat(e.target.value) || 0)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', width: '80px', textAlign: 'right', padding: 0 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>VAT ({taxRatePct}%):</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0f172a' }}>R{vatVal.toLocaleString()}</span>
                </div>
                <div style={{ height: '1px', background: '#cbd5e1', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px' }}>
                  <span>Grand Total:</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: accentColor }}>
                    R{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* SANS Notes (addition 5: custom notes toggles) */}
            {showSansNotes && (
              <div style={{ marginTop: '30px', background: '#fefcbf', border: '1px solid #fef08a', padding: '12px 16px', borderRadius: '8px', fontSize: '0.72rem', color: '#713f12', textAlign: 'left', lineHeight: 1.4 }}>
                <strong>SANS 10400 COMPLIANCE NOTES:</strong> Raised decks higher than 300mm above ground level require building plan submissions. Decks over 1.5 meters high require registered structural engineer sign-off. Pool safety gates must open outwards and stand 1.2m high with self-closing hinges.
              </div>
            )}
          </div>

          {/* Footer Bank details and Signatures */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '24px' : '30px' }}>
              
              {/* Bank Details */}
              <div style={{ textAlign: 'left' }}>
                {showBankDetails && (
                  <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>DEPOSIT PAYMENT INSTRUCTIONS:</div>
                    <div>Bank Name: <strong>Nedbank South Africa</strong></div>
                    <div>Account No: <strong>1202830192</strong></div>
                    <div>Branch Code: <strong>198765</strong></div>
                    <div>Account Type: <strong>Current Account</strong></div>
                    <div>Payment Reference: <strong style={{ color: accentColor }}>{docNumber}</strong></div>
                  </div>
                )}
              </div>

              {/* Signatures authorized */}
              <div style={{ textAlign: isMobile ? 'left' : 'right', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'flex-end' }}>
                {showSignature && (
                  <div>
                    {sigImgSrc ? (
                      <div style={{ borderBottom: '1px solid #cbd5e1', width: '150px', display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center', paddingBottom: '4px' }}>
                        <img src={sigImgSrc} alt="Signature" style={{ maxHeight: '40px', maxWidth: '140px', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{ height: '40px', borderBottom: '1px solid #cbd5e1', width: '150px' }} />
                    )}
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px', fontWeight: 700, width: '150px', textAlign: isMobile ? 'left' : 'center' }}>
                      AUTHORIZED SIGNATURE
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Terms and Conditions */}
            {showTerms && (
              <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '24px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                1. Quotations are valid for 30 days. 2. 50% deposit required upon signature to secure booking slot. 3. All builds comply with standard SANS 10400 guidelines and carry a 5-year workmanship guarantee.
              </div>
            )}
          </div>

        </section>
      </main>

      {/* CSS overrides for print screen layout */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Print media query to hide everything except the invoice sheet */
        @media print {
          body, html, #root {
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }
          
          .quote-invoice-studio {
            display: block !important;
            height: auto !important;
            background: #fff !important;
          }
          
          .editor-panel, .no-print {
            display: none !important;
          }
          
          .preview-panel {
            background: #fff !important;
            padding: 0 !important;
            overflow: visible !important;
            height: auto !important;
            width: 100% !important;
          }
          
          .print-sheet-layout {
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: unset !important;
            overflow: visible !important;
          }
        }
        
        /* Range styling custom overrides */
        input[type=range] {
          height: 6px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${accentColor};
          cursor: ew-resize;
          border: 2px solid #fff;
        }
      `}</style>
    </div>
  );
}
