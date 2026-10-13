import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShieldCheck,
  Users,
  Calculator,
  Image,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  LogOut,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Layers,
  MapPin,
  RefreshCw,
  UploadCloud,
  FileImage,
  Eye,
  Hammer,
} from 'lucide-react';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('cfi_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard active tab: 'inquiries' | 'quotes' | 'projects'
  const [activeTab, setActiveTab] = useState('projects');

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // New Project Form State
  const [showAddProject, setShowAddProject] = useState(true);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Residential',
    location: 'Chennai, India',
    description: '',
    image: '',
    gallery: '',
    area: '3,500 sq.ft',
    duration: '6-8 Weeks On-Site',
    materials: 'Marine BWR Plywood, Burma Teak, Blum, Italian Marble',
    featured: true,
  });
  const [savingProject, setSavingProject] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadedPreviews, setUploadedPreviews] = useState([]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await axios.post('/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (res.data.success) {
        localStorage.setItem('cfi_admin_token', res.data.token);
        setToken(res.data.token);
        setAdminUser(res.data.admin);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cfi_admin_token');
    setToken('');
    setAdminUser(null);
  };

  // Fetch Dashboard Data
  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [inqRes, quoteRes, projRes] = await Promise.all([
        axios.get('/api/inquiries'),
        axios.get('/api/quotes'),
        axios.get('/api/projects'),
      ]);

      if (inqRes.data.success) setInquiries(inqRes.data.data);
      if (quoteRes.data.success) setQuotes(quoteRes.data.data);
      if (projRes.data.success) setProjects(projRes.data.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Handle Photo File Upload
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    setUploadingFiles(true);
    try {
      const res = await axios.post('/api/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success && res.data.urls.length > 0) {
        const urls = res.data.urls;
        setNewProject((prev) => ({
          ...prev,
          image: prev.image || urls[0],
          gallery: prev.gallery ? `${prev.gallery}, ${urls.join(', ')}` : urls.join(', '),
        }));
        setUploadedPreviews((prev) => [...prev, ...urls]);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error uploading image file');
    } finally {
      setUploadingFiles(false);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/inquiries/${id}`, { status: newStatus });
      setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq)));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await axios.delete(`/api/inquiries/${id}`);
      setInquiries(inquiries.filter((inq) => inq._id !== id));
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  // Update Quote Status
  const handleUpdateQuoteStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/quotes/${id}`, { status: newStatus });
      setQuotes(quotes.map((q) => (q._id === id ? { ...q, status: newStatus } : q)));
    } catch (err) {
      console.error('Error updating quote status:', err);
    }
  };

  // Delete Quote
  const handleDeleteQuote = async (id) => {
    if (!window.confirm('Delete this quotation estimate record?')) return;
    try {
      await axios.delete(`/api/quotes/${id}`);
      setQuotes(quotes.filter((q) => q._id !== id));
    } catch (err) {
      console.error('Error deleting quote:', err);
    }
  };

  // Create Project in MongoDB
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.image) {
      alert('Please upload at least one project photo or enter an image URL.');
      return;
    }

    setSavingProject(true);
    try {
      const galleryArr = newProject.gallery
        ? newProject.gallery.split(',').map((u) => u.trim()).filter(Boolean)
        : [newProject.image];
      const materialsArr = newProject.materials
        ? newProject.materials.split(',').map((m) => m.trim()).filter(Boolean)
        : [];

      const payload = {
        ...newProject,
        gallery: galleryArr,
        materials: materialsArr,
      };

      const res = await axios.post('/api/projects', payload);
      if (res.data.success) {
        setProjects([res.data.data, ...projects]);
        setUploadedPreviews([]);
        setNewProject({
          title: '',
          category: 'Residential',
          location: 'Chennai, India',
          description: '',
          image: '',
          gallery: '',
          area: '3,500 sq.ft',
          duration: '6-8 Weeks On-Site',
          materials: 'Marine BWR Plywood, Burma Teak, Blum, Italian Marble',
          featured: true,
        });
        alert('🎉 Project successfully published to live website!');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving project');
    } finally {
      setSavingProject(false);
    }
  };

  // Delete Project from MongoDB
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Permanently delete this project from the database?')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Format INR Currency
  const formatINR = (val) => '₹' + Number(val || 0).toLocaleString('en-IN');

  // If not logged in, render the login form
  if (!token) {
    return (
      <main className="main-content" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem' }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#151413',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.1)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShieldCheck size={28} color="#d4af37" />
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#fff', margin: 0 }}>
              CFI Private Admin Desk
            </h2>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              Restricted portal for project uploads and client lead management
            </p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(255, 77, 77, 0.15)', border: '1px solid #ff4d4d', color: '#ff6b6b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Secret Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {loginLoading ? 'Authenticating...' : 'Enter Admin Control Desk'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // If logged in, render the Full Admin Dashboard
  return (
    <main className="main-content" style={{ padding: '6rem 0 6rem' }}>
      <div className="container">
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          marginBottom: '2.5rem',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#d4af37', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <ShieldCheck size={16} /> CFI Private Operations Desk (Admin Only)
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', margin: '0.25rem 0 0' }}>
              Project Studio &amp; Lead Management
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={fetchData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ddd',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              <RefreshCw size={14} className={loadingData ? 'spin' : ''} /> Refresh Data
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 77, 77, 0.12)',
                border: '1px solid rgba(255, 77, 77, 0.3)',
                color: '#ff6b6b',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              <LogOut size={14} /> Exit Admin
            </button>
          </div>
        </div>

        {/* Real-Time Stats Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ background: '#161514', border: '1px solid rgba(212,175,55,0.25)', padding: '1.75rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Published Projects</span>
              <Image size={20} color="#d4af37" />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', margin: '0.75rem 0 0' }}>
              {projects.length}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Live in customer gallery</span>
          </div>

          <div style={{ background: '#161514', border: '1px solid rgba(212,175,55,0.25)', padding: '1.75rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Client Inquiries</span>
              <Users size={20} color="#d4af37" />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', margin: '0.75rem 0 0' }}>
              {inquiries.length}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Direct Leads from site</span>
          </div>

          <div style={{ background: '#161514', border: '1px solid rgba(212,175,55,0.25)', padding: '1.75rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Calculator Estimates</span>
              <Calculator size={20} color="#d4af37" />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', margin: '0.75rem 0 0' }}>
              {quotes.length}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Cost budget submissions</span>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2rem',
        }}>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'projects' ? '2px solid #d4af37' : '2px solid transparent',
              color: activeTab === 'projects' ? '#d4af37' : '#888',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <UploadCloud size={16} /> Upload &amp; Manage Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'inquiries' ? '2px solid #d4af37' : '2px solid transparent',
              color: activeTab === 'inquiries' ? '#d4af37' : '#888',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Users size={16} /> Client Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'quotes' ? '2px solid #d4af37' : '2px solid transparent',
              color: activeTab === 'quotes' ? '#d4af37' : '#888',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Calculator size={16} /> Calculator Quotes ({quotes.length})
          </button>
        </div>

        {/* TAB 1: DEDICATED UPLOAD & MANAGE PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            {/* Upload Project Card */}
            <div style={{
              background: 'linear-gradient(145deg, #181715 0%, #11100f 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '3rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                    Admin Direct Studio
                  </span>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#f3e5ab', margin: '0.2rem 0' }}>
                    Upload New Project Photos &amp; Specs
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                    Upload photos directly from your phone/computer or provide image links. This is private to admin and publishes directly to the customer portfolio.
                  </p>
                </div>
              </div>

              {/* Direct File Upload Dropzone */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                border: '2px dashed rgba(212, 175, 55, 0.35)',
                borderRadius: '12px',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                marginBottom: '2rem',
                cursor: 'pointer',
              }}>
                <UploadCloud size={40} color="#d4af37" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: '1.1rem' }}>
                  {uploadingFiles ? 'Uploading photos to server...' : 'Upload Project Photos from Device'}
                </h4>
                <p style={{ color: '#888', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
                  Select one or multiple photos (JPG, PNG, WebP) directly from your device.
                </p>
                <input
                  type="file"
                  id="projectFileInput"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="projectFileInput"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 22px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  <FileImage size={16} /> Choose Photos from Computer / Phone
                </label>

                {/* Uploaded Previews */}
                {uploadedPreviews.length > 0 && (
                  <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                      ✓ {uploadedPreviews.length} Photo(s) Uploaded to Server:
                    </span>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {uploadedPreviews.map((url, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #d4af37' }}>
                          <img src={url} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {idx === 0 && (
                            <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', color: '#d4af37', fontSize: '9px', textAlign: 'center', padding: '1px' }}>
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Details */}
              <form onSubmit={handleCreateProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boat Club Villa Suite"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Category *</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: '#121110', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Modular Kitchens">Modular Kitchens</option>
                    <option value="Custom Furniture">Custom Furniture</option>
                    <option value="Commercial & Retail">Commercial &amp; Retail</option>
                    <option value="Living & Dining">Living &amp; Dining</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Location</label>
                  <input
                    type="text"
                    placeholder="Boat Club Road, Chennai"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Main Image URL / Uploaded Path *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Auto-filled on upload or paste URL"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Additional Gallery Images (Comma separated or auto-filled)
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-filled on upload or comma separated URLs"
                    value={newProject.gallery}
                    onChange={(e) => setNewProject({ ...newProject, gallery: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Description</label>
                  <textarea
                    rows="2"
                    placeholder="Describe on-site joinery elements, handcrafted wood species, hardware, and finishes..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  ></textarea>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Carpet Area (e.g. 4,200 sq.ft)</label>
                  <input
                    type="text"
                    value={newProject.area}
                    onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Materials &amp; Specs</label>
                  <input
                    type="text"
                    value={newProject.materials}
                    onChange={(e) => setNewProject({ ...newProject, materials: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    style={{ accentColor: '#d4af37', width: '18px', height: '18px' }}
                  />
                  <label htmlFor="featuredCheck" style={{ color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Feature on Homepage Showcase
                  </label>
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                  <button
                    type="submit"
                    disabled={savingProject}
                    className="btn-primary"
                    style={{ padding: '0.95rem 2.5rem', fontSize: '0.95rem' }}
                  >
                    {savingProject ? 'Saving to Database...' : 'Publish Project to Live Gallery'}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Projects Management */}
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '1.25rem' }}>
                Live Projects in Portfolio ({projects.length})
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    style={{
                      background: '#161514',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: '180px', position: 'relative' }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#d4af37', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#d4af37', color: '#000', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1.1rem' }}>{proj.title}</h4>
                        <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 8px' }}>{proj.location}</p>
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {proj.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ color: '#777', fontSize: '0.75rem' }}>
                          {proj.area || 'N/A'}
                        </span>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          style={{
                            background: 'rgba(255, 77, 77, 0.1)',
                            border: '1px solid rgba(255, 77, 77, 0.3)',
                            color: '#ff6b6b',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div>
            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#777' }}>
                No inquiries registered yet. When clients submit forms or use the concierge, they will appear here live.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    style={{
                      background: '#161514',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.5rem',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', fontWeight: 600 }}>
                        {inq.source || 'Website Form'}
                      </span>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0.2rem 0' }}>{inq.name}</h3>
                      <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={13} color="#d4af37" /> {inq.phone}
                      </p>
                      <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={13} color="#d4af37" /> {inq.email}
                      </p>
                    </div>

                    <div>
                      <p style={{ color: '#888', fontSize: '0.78rem', textTransform: 'uppercase', margin: '0 0 2px' }}>Service &amp; Budget</p>
                      <p style={{ color: '#eee', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>{inq.service}</p>
                      <p style={{ color: '#d4af37', fontSize: '0.85rem', margin: '2px 0 0' }}>Budget: {inq.budget}</p>
                      <p style={{ color: '#777', fontSize: '0.8rem', margin: '4px 0 0' }}>
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p style={{ color: '#888', fontSize: '0.78rem', textTransform: 'uppercase', margin: '0 0 2px' }}>Notes / Message</p>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', margin: 0, lineHeight: 1.4, maxHeight: '60px', overflowY: 'auto' }}>
                        {inq.message || 'No additional notes entered.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                        style={{
                          background: inq.status === 'Closed' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                          border: inq.status === 'Closed' ? '1px solid #4ade80' : '1px solid #d4af37',
                          color: inq.status === 'Closed' ? '#4ade80' : '#d4af37',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq._id)}
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '6px' }}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QUOTES */}
        {activeTab === 'quotes' && (
          <div>
            {quotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#777' }}>
                No estimator quotes saved yet. When clients submit cost calculations, they will appear here.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {quotes.map((q) => (
                  <div
                    key={q._id}
                    style={{
                      background: '#161514',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.5rem',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', fontWeight: 600 }}>
                        {q.propertyType} • {q.carpetArea} sq.ft
                      </span>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0.2rem 0' }}>{q.clientName}</h3>
                      <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={13} color="#d4af37" /> {q.clientPhone}
                      </p>
                      {q.clientEmail && (
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={13} color="#d4af37" /> {q.clientEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <p style={{ color: '#888', fontSize: '0.78rem', textTransform: 'uppercase', margin: '0 0 2px' }}>Scope &amp; Finish</p>
                      <p style={{ color: '#eee', fontSize: '0.88rem', margin: 0 }}>{q.scope}</p>
                      <p style={{ color: '#aaa', fontSize: '0.8rem', margin: '2px 0 0' }}>{q.finishLevel}</p>
                    </div>

                    <div>
                      <p style={{ color: '#888', fontSize: '0.78rem', textTransform: 'uppercase', margin: '0 0 2px' }}>Projected Estimate Range</p>
                      <div style={{ fontSize: '1.1rem', color: '#d4af37', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
                        {formatINR(q.estimatedMin)} – {formatINR(q.estimatedMax)}
                      </div>
                      <p style={{ color: '#777', fontSize: '0.75rem', margin: '4px 0 0' }}>
                        Date: {new Date(q.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
                      <select
                        value={q.status}
                        onChange={(e) => handleUpdateQuoteStatus(q._id, e.target.value)}
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          border: '1px solid #d4af37',
                          color: '#d4af37',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Declined">Declined</option>
                      </select>

                      <button
                        onClick={() => handleDeleteQuote(q._id)}
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '6px' }}
                        title="Delete Quote Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
