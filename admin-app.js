function AdminApp(){
  const { useState, useEffect, useRef } = React;

  // ======== DEVICE FINGERPRINTING ========
  const getDeviceFingerprint = () => {
    const nav = navigator;
    const screen_data = screen.width + ',' + screen.height + ',' + screen.colorDepth;
    const ua = nav.userAgent;
    const lang = nav.language || nav.userLanguage || '';
    const tz = new Date().getTimezoneOffset();
    const plugins = Array.from(nav.plugins || []).map(p => p.name).join('|');
    const data = ua + screen_data + lang + tz + plugins;
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  const checkDeviceAccess = () => {
    const currentFingerprint = getDeviceFingerprint();
    const savedFingerprint = localStorage.getItem('fw_device_fingerprint');
    
    if (!savedFingerprint) {
      // First time - save device fingerprint
      localStorage.setItem('fw_device_fingerprint', currentFingerprint);
      return true;
    }
    
    // Check if this is the same device
    if (currentFingerprint !== savedFingerprint) {
      alert('⚠️ Admin access is locked to your original device only.\n\nDifferent device detected. Access denied.\n\nContact administrator to unlock.');
      return false;
    }
    return true;
  };

  const isDeviceLocked = () => {
    try {
      const current = getDeviceFingerprint();
      const saved = localStorage.getItem('fw_device_fingerprint');
      return !!saved && current !== saved;
    } catch (e) { return false; }
  };

  const registerCurrentDevice = (pw) => {
    try {
      if (pw !== getSavedPass()) return alert('Incorrect admin password.');
      const fp = getDeviceFingerprint();
      localStorage.setItem('fw_device_fingerprint', fp);
      alert('Device registered successfully. You can now login from this device.');
      setShowRegisterForm(false);
      setRegisterPw('');
      setAuthMode('admin-login');
    } catch (err) { console.warn(err); alert('Could not register device.'); }
  };

  // ======== AUTH & ROLES ========
  const DEFAULT_ADMIN_PASS = 'abdurrahman';
  // Enforce fixed admin password. Do NOT read or write fw_admin_pass from localStorage.
  const getSavedPass = () => DEFAULT_ADMIN_PASS;
  
  const [authMode, setAuthMode] = useState('login'); // 'login', 'team-select', 'authenticated'
  const [userRole, setUserRole] = useState(null); // 'admin' or team member index
  const [pwInput, setPwInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showSetPassOnLogin, setShowSetPassOnLogin] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerPw, setRegisterPw] = useState('');

  // Run device check on mount and log fingerprint for debugging
  useEffect(() => {
    try {
      const fp = getDeviceFingerprint();
      console.info('Device fingerprint (current):', fp);
      const saved = localStorage.getItem('fw_device_fingerprint');
      console.info('Device fingerprint (saved):', saved);
      const ok = checkDeviceAccess();
      console.info('Device access allowed:', ok);
      if (!ok) {
        setAuthMode('login');
      }
    } catch (err) { console.warn('Fingerprint check failed', err); }
  }, []);

  // ======== FOOTER DATA ========
  const defaultFooter = {
    about: 'We are a creative agency specializing in digital transformation.',
    copyright: '© 2025 CreativeAgency. All rights reserved.',
    quickLinks: 'Home, About, Services, Portfolio, Contact',
    footerEmail: 'info@creativeagency.com',
    footerPhone: '+8801971233127'
  };

  // ======== DEFAULT DATA ========
  const defaultProjects = [{
    title: 'E-Commerce Platform', category: 'web', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80',
    description: 'Full-stack e-commerce solution with payment integration', tools: ['React', 'Node.js', 'MongoDB']
  }];

  const defaultCompanyInfo = {
    name: 'CreativeAgency', tagline: 'Designing, developing & marketing digital experiences that deliver results.',
    address: 'Dadul, Kazihal, Attpukurhat, Fulbari, Dinajpur, Bangladesh',
    email: 'fourwarriors24@gmail.com', phone: '+8801971233127', website: 'four-wariors.vercel.app',
    hours: 'Mon - Fri: 9AM - 6PM', facebook: 'https://www.facebook.com/', twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/', linkedin: 'https://www.linkedin.com/'
  };

  const defaultTeam = [
    { name: 'Abdur Rahman', role: 'Frontend Developer & Graphics Designer', image: 'https://i.ibb.co/GQ2MXkD7/Whats-App-Image-2025-10-29-at-23-59-06-46b7c15f.jpg',
      bio: 'Frontend Developer & Graphics Designer | React | AI-Assisted Websites | PSD → HTML | WordPress & SEO.',
      portfolio: 'https://portfolio-edit-t3uy.vercel.app/', github: 'https://github.com/Abdur-Rahman-Palash',
      telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1', whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm' },
    { name: 'Sarah Chen', role: 'Lead Graphic Designer', image: 'https://i.pravatar.cc/300?img=2&u=sarahchen',
      bio: 'Creative designer passionate about crafting beautiful visual identities and user experiences.',
      portfolio: 'https://sarahchen.portfolio.com', github: 'https://github.com/sarahchen',
      telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1', whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm' },
    { name: 'Michael Rodriguez', role: 'Full Stack Developer', image: 'https://i.pravatar.cc/300?img=3&u=michaelrodriguez',
      bio: 'MERN stack expert building scalable web applications with clean, efficient code.',
      portfolio: 'https://michaelrodriguez.portfolio.com', github: 'https://github.com/michaelrodriguez',
      telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1', whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm' },
    { name: 'Emily Park', role: 'UI/UX Designer', image: 'https://i.pravatar.cc/300?img=4&u=emilypark',
      bio: 'Design thinking advocate focused on creating intuitive and engaging user interfaces.',
      portfolio: 'https://emilypark.portfolio.com', github: 'https://github.com/emilypark',
      telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1', whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm' }
  ];

  const defaultServices = [
    { icon: 'megaphone', title: 'Digital Marketing', description: 'Grow your online presence with our data-driven marketing strategies.',
      features: ['Search Engine Optimization (SEO)', 'Social Media Marketing & Management', 'Content Marketing Strategy', 'Brand Development & Positioning', 'Pay-Per-Click Advertising', 'Email Marketing Campaigns'] },
    { icon: 'palette', title: 'Graphic Design', description: 'Visual storytelling that captures attention and communicates your brand message.',
      features: ['Logo & Brand Identity Design', 'Poster & Banner Design', 'UI/UX Design for Web & Mobile', 'Social Media Graphics', 'Marketing Collateral', 'Illustration & Infographics'] },
    { icon: 'code', title: 'Web Development', description: 'Modern, responsive websites built with cutting-edge MERN stack technology.',
      features: ['Custom Website Development', 'E-commerce Solutions', 'Progressive Web Apps', 'API Development & Integration', 'Database Design & Management', 'Performance Optimization'] }
  ];

  // ======== STATE ========
  const [projects, setProjects] = useState(() => { try { return JSON.parse(localStorage.getItem('fw_projects') || 'null') || defaultProjects; } catch(e){ return defaultProjects; } });
  const [companyInfo, setCompanyInfo] = useState(() => { try { return JSON.parse(localStorage.getItem('fw_company_info') || 'null') || defaultCompanyInfo; } catch(e){ return defaultCompanyInfo; } });
  const [team, setTeam] = useState(() => { try { return JSON.parse(localStorage.getItem('fw_team') || 'null') || defaultTeam; } catch(e){ return defaultTeam; } });
  const [services, setServices] = useState(() => { try { return JSON.parse(localStorage.getItem('fw_services') || 'null') || defaultServices; } catch(e){ return defaultServices; } });
  const [footer, setFooter] = useState(() => { try { return JSON.parse(localStorage.getItem('fw_footer') || 'null') || defaultFooter; } catch(e){ return defaultFooter; } });

  const [projectForm, setProjectForm] = useState({ title: '', category: 'web', image: '', description: '', tools: '' });
  const [editingProjectIdx, setEditingProjectIdx] = useState(-1);
  const projectFileRef = useRef(null);

  const [teamForm, setTeamForm] = useState({ name: '', role: '', image: '', bio: '', portfolio: '', github: '', telegram: '', whatsapp: '' });
  const [editingTeamIdx, setEditingTeamIdx] = useState(-1);
  const teamFileRef = useRef(null);

  const [serviceForm, setServiceForm] = useState({ icon: '', title: '', description: '', features: '' });
  const [editingServiceIdx, setEditingServiceIdx] = useState(-1);

  // ======== AUTO-SAVE ========
  useEffect(() => { 
    // Check device access on component mount
    if (!checkDeviceAccess()) {
      setAuthMode('login');
      return;
    }
    try { localStorage.setItem('fw_projects', JSON.stringify(projects)); } catch(e){} 
  }, [projects]);
  useEffect(() => { try { localStorage.setItem('fw_company_info', JSON.stringify(companyInfo)); } catch(e){} }, [companyInfo]);
  useEffect(() => { try { localStorage.setItem('fw_team', JSON.stringify(team)); } catch(e){} }, [team]);
  useEffect(() => { try { localStorage.setItem('fw_services', JSON.stringify(services)); } catch(e){} }, [services]);
  useEffect(() => { try { localStorage.setItem('fw_footer', JSON.stringify(footer)); } catch(e){} }, [footer]);

  // ======== AUTH FUNCTIONS ========
  function attemptAdminLogin(e){
    e?.preventDefault();
    
    // Check device fingerprint first
    if (!checkDeviceAccess()) {
      return;
    }
    
    if (pwInput === getSavedPass()) {
      setUserRole('admin');
      setAuthMode('authenticated');
      setPwInput('');
    } else {
      alert('Incorrect password.');
    }
  }

  function selectTeamMember(idx){
    setUserRole(idx);
    setAuthMode('authenticated');
  }

  function handleLogout(){
    setAuthMode('login');
    setUserRole(null);
    setPwInput('');
  }

  function handleChangePassword(e){
    e?.preventDefault();
    // Password changes are disabled for security. Admin password is fixed.
    alert('Changing the Super Admin password is disabled. Contact the site owner for changes.');
  }

  function handleSetPassOnLogin(e){
    e?.preventDefault();
    // Disallow setting a new password from the login flow.
    alert('Setting a new Super Admin password is disabled.');
  }

  // ======== FILE HANDLING ========
  const onFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // ======== PROJECT HANDLERS ========
  const resetProjectForm = () => { setProjectForm({ title: '', category: 'web', image: '', description: '', tools: '' }); setEditingProjectIdx(-1); if(projectFileRef.current) projectFileRef.current.value=''; };
  async function handleAddProject(e){
    e?.preventDefault();
    if (!projectForm.title || !projectForm.description) return alert('Title and description are required');
    let image = projectForm.image;
    if (!image && projectFileRef.current?.files?.[0]) {
      try { image = await onFile(projectFileRef.current.files[0]); } catch(err){ console.warn(err); }
    }
    const newProject = { title: projectForm.title, category: projectForm.category, image: image || '', description: projectForm.description, tools: projectForm.tools.split(',').map(t=>t.trim()).filter(Boolean) };
    if (editingProjectIdx >= 0) {
      const copy = projects.slice();
      copy[editingProjectIdx] = newProject;
      setProjects(copy);
      setEditingProjectIdx(-1);
    } else {
      setProjects([newProject, ...projects]);
    }
    resetProjectForm();
  }
  function handleEditProject(idx){ const p = projects[idx]; setProjectForm({ title: p.title, category: p.category, image: p.image || '', description: p.description, tools: (p.tools || []).join(', ') }); setEditingProjectIdx(idx); window.scrollTo({top:0}); }
  function handleDeleteProject(idx){ if(!confirm('Delete this project?')) return; const copy = projects.slice(); copy.splice(idx,1); setProjects(copy); }

  // ======== TEAM HANDLERS ========
  const resetTeamForm = () => { setTeamForm({ name: '', role: '', image: '', bio: '', portfolio: '', github: '', telegram: '', whatsapp: '' }); setEditingTeamIdx(-1); if(teamFileRef.current) teamFileRef.current.value=''; };
  async function handleAddTeam(e){
    e?.preventDefault();
    if (!teamForm.name || !teamForm.role) return alert('Name and role are required');
    let image = teamForm.image;
    if (!image && teamFileRef.current?.files?.[0]) {
      try { image = await onFile(teamFileRef.current.files[0]); } catch(err){ console.warn(err); }
    }
    const newMember = { name: teamForm.name, role: teamForm.role, image: image || '', bio: teamForm.bio, portfolio: teamForm.portfolio, github: teamForm.github, telegram: teamForm.telegram, whatsapp: teamForm.whatsapp };
    if (editingTeamIdx >= 0) {
      const copy = team.slice();
      copy[editingTeamIdx] = newMember;
      setTeam(copy);
      setEditingTeamIdx(-1);
    } else {
      setTeam([newMember, ...team]);
    }
    resetTeamForm();
  }
  function handleEditTeam(idx){ const m = team[idx]; setTeamForm({ name: m.name, role: m.role, image: m.image || '', bio: m.bio, portfolio: m.portfolio, github: m.github, telegram: m.telegram, whatsapp: m.whatsapp }); setEditingTeamIdx(idx); window.scrollTo({top:0}); }
  function handleDeleteTeam(idx){ if(!confirm('Delete this team member?')) return; const copy = team.slice(); copy.splice(idx,1); setTeam(copy); }

  // ======== SERVICE HANDLERS ========
  const resetServiceForm = () => { setServiceForm({ icon: '', title: '', description: '', features: '' }); setEditingServiceIdx(-1); };
  function handleAddService(e){
    e?.preventDefault();
    if (!serviceForm.title || !serviceForm.description) return alert('Title and description are required');
    const newService = { icon: serviceForm.icon, title: serviceForm.title, description: serviceForm.description, features: serviceForm.features.split('\n').map(f=>f.trim()).filter(Boolean) };
    if (editingServiceIdx >= 0) {
      const copy = services.slice();
      copy[editingServiceIdx] = newService;
      setServices(copy);
      setEditingServiceIdx(-1);
    } else {
      setServices([...services, newService]);
    }
    resetServiceForm();
  }
  function handleEditService(idx){ const s = services[idx]; setServiceForm({ icon: s.icon, title: s.title, description: s.description, features: (s.features || []).join('\n') }); setEditingServiceIdx(idx); window.scrollTo({top:0}); }
  function handleDeleteService(idx){ if(!confirm('Delete this service?')) return; const copy = services.slice(); copy.splice(idx,1); setServices(copy); }

  // ======== LOGIN SCREEN - ROLE SELECTION ========
  if (authMode === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Access</h2>
          <p className="text-sm text-gray-600 mb-6">Choose your role to continue:</p>
          
          <div className="space-y-3 mb-6">
            <button type="button" onClick={() => setAuthMode('team-select')} className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-300 rounded hover:bg-blue-100 transition-colors text-left">
              <h3 className="font-bold text-blue-700">👥 I am a Team Member</h3>
              <p className="text-xs text-blue-600">Edit your profile (no password needed)</p>
            </button>
            
            <button type="button" onClick={() => setAuthMode('admin-login')} className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-300 rounded hover:bg-purple-100 transition-colors text-left">
              <h3 className="font-bold text-purple-700">🔐 I am the Super Admin</h3>
              <p className="text-xs text-purple-600">Full access (password required)</p>
            </button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            <p>This is a role-based access control system</p>
          </div>
        </div>
      </div>
    );
  }

  // ======== TEAM MEMBER SELECT ========
  if (authMode === 'team-select') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl">
          <button type="button" onClick={() => setAuthMode('login')} className="mb-6 px-4 py-2 bg-gray-200 rounded text-sm">← Back</button>
          
          <h2 className="text-2xl font-bold mb-2">Select Your Profile</h2>
          <p className="text-gray-600 mb-6">Choose your name to edit your profile</p>

          <div className="grid md:grid-cols-2 gap-4">
            {team.map((member, idx) => (
              <button type="button" key={idx} onClick={() => selectTeamMember(idx)} className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left">
                <div className="w-16 h-16 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                  {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">No image</span>}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-blue-600">{member.role}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ======== SUPER ADMIN LOGIN ========
  if (authMode === 'admin-login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <button type="button" onClick={() => setAuthMode('login')} className="mb-4 text-sm text-gray-600 hover:text-gray-800">← Back to role selection</button>
          
          <h2 className="text-xl font-semibold mb-4">Super Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">Enter the admin password for full website access.</p>
          
              <form onSubmit={attemptAdminLogin} className="space-y-4">
                <div className="relative">
                  <input 
                    type={showPw ? "text" : "password"} 
                    value={pwInput} 
                    onChange={e=>setPwInput(e.target.value)} 
                    placeholder="Password" 
                    className="w-full border px-3 py-2 rounded pr-10" 
                  />
                  <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                    {showPw ? '🙈' : '👁️'}
                  </button>
                </div>
                <button type="submit" className="btn-primary w-full">Unlock Admin</button>

                {isDeviceLocked() && (
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded">
                    <p className="text-sm text-yellow-800">Different device detected. You can register this device if you know the admin password.</p>
                    {!showRegisterForm ? (
                      <div className="mt-3">
                        <button type="button" onClick={() => setShowRegisterForm(true)} className="px-3 py-2 mt-2 bg-yellow-400 text-white rounded">Register this device</button>
                      </div>
                    ) : (
                      <div className="mt-3 space-y-2">
                        <div className="relative">
                          <input type="password" value={registerPw} onChange={e=>setRegisterPw(e.target.value)} placeholder="Admin password" className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={()=>registerCurrentDevice(registerPw)} className="px-3 py-2 bg-yellow-500 text-white rounded">Confirm & Register</button>
                          <button type="button" onClick={()=>{ setShowRegisterForm(false); setRegisterPw(''); }} className="px-3 py-2 border rounded">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </form>
        </div>
      </div>
    );
  }

  // ======== AUTHENTICATED DASHBOARD ========
  const isAdmin = userRole === 'admin';
  const currentMemberIdx = typeof userRole === 'number' ? userRole : -1;
  const currentMember = currentMemberIdx >= 0 ? team[currentMemberIdx] : null;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-6 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{isAdmin ? 'Website CMS Admin' : `Team Profile: ${currentMember?.name}`}</h1>
            <p className="text-gray-600 mt-1">{isAdmin ? 'Full website management' : 'Edit your profile information'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded text-sm">Logout</button>
          </div>
        </div>
        

        {/* ADMIN TABS */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex border-b overflow-x-auto">
              {['company', 'team', 'services', 'projects', 'footer'].map(tab => (
                <button type="button" key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-3 font-medium capitalize whitespace-nowrap ${activeTab===tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                  {tab === 'company' ? '🏢 Company' : tab === 'team' ? '👥 Team' : tab === 'services' ? '⚙️ Services' : tab === 'projects' ? '📁 Projects' : '📄 Footer'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* COMPANY TAB */}
              {activeTab === 'company' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Company Information</h2>
                  <div className="bg-gray-50 p-6 rounded">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input value={companyInfo.name} onChange={e=>setCompanyInfo({...companyInfo, name:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tagline</label>
                        <input value={companyInfo.tagline} onChange={e=>setCompanyInfo({...companyInfo, tagline:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea value={companyInfo.address} onChange={e=>setCompanyInfo({...companyInfo, address:e.target.value})} className="w-full border px-3 py-2 rounded h-20"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input value={companyInfo.email} onChange={e=>setCompanyInfo({...companyInfo, email:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input value={companyInfo.phone} onChange={e=>setCompanyInfo({...companyInfo, phone:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Website</label>
                        <input value={companyInfo.website} onChange={e=>setCompanyInfo({...companyInfo, website:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Business Hours</label>
                        <input value={companyInfo.hours} onChange={e=>setCompanyInfo({...companyInfo, hours:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Facebook URL</label>
                        <input value={companyInfo.facebook} onChange={e=>setCompanyInfo({...companyInfo, facebook:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Twitter URL</label>
                        <input value={companyInfo.twitter} onChange={e=>setCompanyInfo({...companyInfo, twitter:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Instagram URL</label>
                        <input value={companyInfo.instagram} onChange={e=>setCompanyInfo({...companyInfo, instagram:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                        <input value={companyInfo.linkedin} onChange={e=>setCompanyInfo({...companyInfo, linkedin:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">💾 Changes are saved automatically.</p>
                  </div>
                </div>
              )}

              {/* TEAM TAB */}
              {activeTab === 'team' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Team Members</h2>
                  <form onSubmit={handleAddTeam} className="bg-gray-50 p-6 rounded mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input value={teamForm.name} onChange={e=>setTeamForm({...teamForm, name:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Role *</label>
                        <input value={teamForm.role} onChange={e=>setTeamForm({...teamForm, role:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input value={teamForm.image} onChange={e=>setTeamForm({...teamForm, image:e.target.value})} placeholder="https://... or upload" className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Or Upload Image</label>
                        <input ref={teamFileRef} type="file" accept="image/*" className="w-full" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea value={teamForm.bio} onChange={e=>setTeamForm({...teamForm, bio:e.target.value})} className="w-full border px-3 py-2 rounded h-20"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                        <input value={teamForm.portfolio} onChange={e=>setTeamForm({...teamForm, portfolio:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">GitHub URL</label>
                        <input value={teamForm.github} onChange={e=>setTeamForm({...teamForm, github:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Telegram URL</label>
                        <input value={teamForm.telegram} onChange={e=>setTeamForm({...teamForm, telegram:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">WhatsApp URL</label>
                        <input value={teamForm.whatsapp} onChange={e=>setTeamForm({...teamForm, whatsapp:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button type="submit" className="btn-primary">{editingTeamIdx>=0 ? 'Save changes' : 'Add member'}</button>
                      <button type="button" onClick={resetTeamForm} className="px-4 py-2 border rounded">Reset</button>
                    </div>
                  </form>

                  <h3 className="text-xl font-semibold mb-4">Team Members ({team.length})</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.map((m, idx) => (
                      <div key={idx} className="bg-white border rounded p-4">
                        <div className="w-full h-40 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                          {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-sm">No image</span>}
                        </div>
                        <h4 className="font-bold">{m.name}</h4>
                        <p className="text-sm text-blue-600 mb-2">{m.role}</p>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{m.bio}</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={()=>handleEditTeam(idx)} className="px-3 py-1 border rounded text-sm">Edit</button>
                              <button type="button" onClick={()=>handleDeleteTeam(idx)} className="px-3 py-1 border rounded text-red-600 text-sm">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Services</h2>
                  <form onSubmit={handleAddService} className="bg-gray-50 p-6 rounded mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Icon (text or emoji)</label>
                        <input value={serviceForm.icon} onChange={e=>setServiceForm({...serviceForm, icon:e.target.value})} placeholder="e.g. megaphone, palette, code" className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input value={serviceForm.title} onChange={e=>setServiceForm({...serviceForm, title:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea value={serviceForm.description} onChange={e=>setServiceForm({...serviceForm, description:e.target.value})} className="w-full border px-3 py-2 rounded h-20"></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                        <textarea value={serviceForm.features} onChange={e=>setServiceForm({...serviceForm, features:e.target.value})} className="w-full border px-3 py-2 rounded h-32"></textarea>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button type="submit" className="btn-primary">{editingServiceIdx>=0 ? 'Save changes' : 'Add service'}</button>
                      <button type="button" onClick={resetServiceForm} className="px-4 py-2 border rounded">Reset</button>
                    </div>
                  </form>

                  <h3 className="text-xl font-semibold mb-4">Services ({services.length})</h3>
                  <div className="space-y-4">
                    {services.map((s, idx) => (
                      <div key={idx} className="bg-white border rounded p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-lg">{s.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                            <div className="text-xs text-gray-500 space-y-1">
                              {(s.features || []).slice(0, 3).map((f, i) => <div key={i}>• {f}</div>)}
                              {(s.features || []).length > 3 && <div>• ... and {(s.features || []).length - 3} more</div>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={()=>handleEditService(idx)} className="px-3 py-1 border rounded text-sm">Edit</button>
                            <button type="button" onClick={()=>handleDeleteService(idx)} className="px-3 py-1 border rounded text-red-600 text-sm">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Projects Portfolio</h2>
                  <form onSubmit={handleAddProject} className="bg-gray-50 p-6 rounded mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input value={projectForm.title} onChange={e=>setProjectForm({...projectForm, title:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select value={projectForm.category} onChange={e=>setProjectForm({...projectForm, category:e.target.value})} className="w-full border px-3 py-2 rounded">
                          <option value="web">Web</option>
                          <option value="design">Design</option>
                          <option value="marketing">Marketing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input value={projectForm.image} onChange={e=>setProjectForm({...projectForm, image:e.target.value})} placeholder="https://... or upload" className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Or Upload Image</label>
                        <input ref={projectFileRef} type="file" accept="image/*" className="w-full" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea value={projectForm.description} onChange={e=>setProjectForm({...projectForm, description:e.target.value})} className="w-full border px-3 py-2 rounded h-24"></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Tools (comma separated)</label>
                        <input value={projectForm.tools} onChange={e=>setProjectForm({...projectForm, tools:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button type="submit" className="btn-primary">{editingProjectIdx>=0 ? 'Save changes' : 'Add project'}</button>
                      <button type="button" onClick={resetProjectForm} className="px-4 py-2 border rounded">Reset</button>
                    </div>
                  </form>

                  <h3 className="text-xl font-semibold mb-4">Projects ({projects.length})</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow p-4">
                        <div className="w-full h-40 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                          {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-sm">No image</span>}
                        </div>
                        <h4 className="font-bold">{p.title}</h4>
                        <p className="text-xs text-blue-600 mb-1">{p.category}</p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.description}</p>
                        <p className="text-xs text-gray-500 mb-3">{(p.tools || []).join(', ')}</p>
                        <div className="flex gap-2">
                          <button type="button" onClick={()=>handleEditProject(idx)} className="px-3 py-1 border rounded text-sm">Edit</button>
                          <button type="button" onClick={()=>handleDeleteProject(idx)} className="px-3 py-1 border rounded text-red-600 text-sm">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FOOTER TAB */}
              {activeTab === 'footer' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Footer Settings</h2>
                  <div className="bg-gray-50 p-6 rounded">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">About Section Text</label>
                        <textarea value={footer.about} onChange={e=>setFooter({...footer, about:e.target.value})} className="w-full border px-3 py-2 rounded h-20"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Footer Email</label>
                        <input value={footer.footerEmail} onChange={e=>setFooter({...footer, footerEmail:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Footer Phone</label>
                        <input value={footer.footerPhone} onChange={e=>setFooter({...footer, footerPhone:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Quick Links (comma separated)</label>
                        <input value={footer.quickLinks} onChange={e=>setFooter({...footer, quickLinks:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Copyright Text</label>
                        <input value={footer.copyright} onChange={e=>setFooter({...footer, copyright:e.target.value})} className="w-full border px-3 py-2 rounded" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">💾 Changes are saved automatically.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEAM MEMBER PROFILE EDIT (non-admin) */}
        {!isAdmin && currentMember && (
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleEditTeam(currentMemberIdx); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <div className="w-32 h-32 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                  {teamForm.image || currentMember.image ? <img src={teamForm.image || currentMember.image} alt={currentMember.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-sm">No image</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input value={teamForm.image} onChange={e=>setTeamForm({...teamForm, image:e.target.value})} placeholder="https://... or upload below" className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Or Upload New Image</label>
                <input ref={teamFileRef} type="file" accept="image/*" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input value={teamForm.name} onChange={e=>setTeamForm({...teamForm, name:e.target.value})} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input value={teamForm.role} onChange={e=>setTeamForm({...teamForm, role:e.target.value})} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio / About You</label>
                <textarea value={teamForm.bio} onChange={e=>setTeamForm({...teamForm, bio:e.target.value})} className="w-full border px-3 py-2 rounded h-24"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                <input value={teamForm.portfolio} onChange={e=>setTeamForm({...teamForm, portfolio:e.target.value})} placeholder="https://..." className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input value={teamForm.github} onChange={e=>setTeamForm({...teamForm, github:e.target.value})} placeholder="https://..." className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telegram URL</label>
                <input value={teamForm.telegram} onChange={e=>setTeamForm({...teamForm, telegram:e.target.value})} placeholder="https://..." className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp URL</label>
                <input value={teamForm.whatsapp} onChange={e=>setTeamForm({...teamForm, whatsapp:e.target.value})} placeholder="https://..." className="w-full border px-3 py-2 rounded" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button type="button" onClick={() => { resetTeamForm(); setTeamForm(currentMember); }} className="px-4 py-2 border rounded">Reset</button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-6">💾 Changes are saved automatically.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const adminRoot = ReactDOM.createRoot(document.getElementById('root'));
adminRoot.render(<AdminApp />);
