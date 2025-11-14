function AdminApp(){
  const { useState, useEffect, useRef } = React;

  // ======== AUTH & ROLES ========
  const DEFAULT_ADMIN_PASS = 'fwadmin123';
  const getSavedPass = () => { try { return localStorage.getItem('fw_admin_pass') || DEFAULT_ADMIN_PASS } catch(e){ return DEFAULT_ADMIN_PASS } };
  
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
  useEffect(() => { try { localStorage.setItem('fw_projects', JSON.stringify(projects)); } catch(e){} }, [projects]);
  useEffect(() => { try { localStorage.setItem('fw_company_info', JSON.stringify(companyInfo)); } catch(e){} }, [companyInfo]);
  useEffect(() => { try { localStorage.setItem('fw_team', JSON.stringify(team)); } catch(e){} }, [team]);
  useEffect(() => { try { localStorage.setItem('fw_services', JSON.stringify(services)); } catch(e){} }, [services]);
  useEffect(() => { try { localStorage.setItem('fw_footer', JSON.stringify(footer)); } catch(e){} }, [footer]);

  // ======== AUTH FUNCTIONS ========
  function attemptAdminLogin(e){
    e?.preventDefault();
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
    if (!newPass) return alert('Enter new password');
    if (newPass !== confirmPass) return alert('Passwords do not match');
    try {
      localStorage.setItem('fw_admin_pass', newPass);
      alert('Password changed successfully');
      setNewPass(''); setConfirmPass(''); setShowChangePass(false); setShowSetPassOnLogin(false);
    } catch (err) {
      alert('Could not save password in this browser');
    }
  }

  function handleSetPassOnLogin(e){
    e?.preventDefault();
    if (!newPass) return alert('Enter new password');
    if (newPass !== confirmPass) return alert('Passwords do not match');
    try {
      localStorage.setItem('fw_admin_pass', newPass);
      alert('Password set successfully. Please login with your new password.');
      setNewPass(''); setConfirmPass(''); setShowSetPassOnLogin(false);
    } catch (err) {
      alert('Could not save password in this browser');
    }
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
            <button onClick={() => setAuthMode('team-select')} className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-300 rounded hover:bg-blue-100 transition-colors text-left">
              <h3 className="font-bold text-blue-700">👥 I am a Team Member</h3>
              <p className="text-xs text-blue-600">Edit your profile (no password needed)</p>
            </button>
            
            <button onClick={() => setAuthMode('admin-login')} className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-300 rounded hover:bg-purple-100 transition-colors text-left">
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
          <button onClick={() => setAuthMode('login')} className="mb-6 px-4 py-2 bg-gray-200 rounded text-sm">← Back</button>
          
          <h2 className="text-2xl font-bold mb-2">Select Your Profile</h2>
          <p className="text-gray-600 mb-6">Choose your name to edit your profile</p>

          <div className="grid md:grid-cols-2 gap-4">
            {team.map((member, idx) => (
              <button key={idx} onClick={() => selectTeamMember(idx)} className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left">
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
          <button onClick={() => setAuthMode('login')} className="mb-4 text-sm text-gray-600 hover:text-gray-800">← Back to role selection</button>
          
          <h2 className="text-xl font-semibold mb-4">Super Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">Enter the admin password for full website access.</p>
          
          {!showSetPassOnLogin ? (
            <>
              <form onSubmit={attemptAdminLogin} className="space-y-4">
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={pwInput} onChange={e=>setPwInput(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded pr-10" />
                  <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                    {showPw ? '🙈' : '👁️'}
                  </button>
                </div>
                <button type="submit" className="btn-primary w-full">Unlock Admin</button>
                <button type="button" onClick={()=>setShowSetPassOnLogin(true)} className="w-full px-3 py-2 border rounded text-sm hover:bg-gray-100">Set New Password</button>
              </form>
              <p className="text-xs text-gray-400 mt-4">Default password: <strong>{DEFAULT_ADMIN_PASS}</strong></p>
            </>
          ) : (
            <form onSubmit={handleSetPassOnLogin} className="space-y-3">
              <h3 className="font-semibold text-sm">Set Your Admin Password</h3>
              <div className="relative">
                <input type={showNewPw ? "text" : "password"} value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New password" className="w-full border px-3 py-2 rounded pr-10" />
                <button type="button" onClick={()=>setShowNewPw(!showNewPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                  {showNewPw ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="relative">
                <input type={showConfirmPw ? "text" : "password"} value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} placeholder="Confirm password" className="w-full border px-3 py-2 rounded pr-10" />
                <button type="button" onClick={()=>setShowConfirmPw(!showConfirmPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                  {showConfirmPw ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Save Password</button>
                <button type="button" onClick={()=>{setShowSetPassOnLogin(false); setNewPass(''); setConfirmPass(''); setShowNewPw(false); setShowConfirmPw(false);}} className="px-3 py-2 border rounded">Cancel</button>
              </div>
            </form>
          )}
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
            {isAdmin && <button onClick={()=>setShowChangePass(!showChangePass)} className="px-3 py-2 border rounded text-sm">{showChangePass ? 'Close' : 'Change password'}</button>}
            <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded text-sm">Logout</button>
          </div>
        </div>

        {isAdmin && showChangePass && (
          <form onSubmit={handleChangePassword} className="bg-white p-4 rounded shadow mb-6 max-w-md">
            <h3 className="font-semibold mb-2">Set new admin password</h3>
            <div className="mb-2 relative">
              <input type={showNewPw ? "text" : "password"} value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New password" className="w-full border px-3 py-2 rounded pr-10" />
              <button type="button" onClick={()=>setShowNewPw(!showNewPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                {showNewPw ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="mb-2 relative">
              <input type={showConfirmPw ? "text" : "password"} value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} placeholder="Confirm password" className="w-full border px-3 py-2 rounded pr-10" />
              <button type="button" onClick={()=>setShowConfirmPw(!showConfirmPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                {showConfirmPw ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">Save password</button>
              <button type="button" onClick={()=>{ setShowChangePass(false); setNewPass(''); setConfirmPass(''); setShowNewPw(false); setShowConfirmPw(false); }} className="px-3 py-2 border rounded">Cancel</button>
            </div>
          </form>
        )}

        {/* ADMIN TABS */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex border-b overflow-x-auto">
              {['company', 'team', 'services', 'projects', 'footer'].map(tab => (
                <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-3 font-medium capitalize whitespace-nowrap ${activeTab===tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
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
... (file continues same as repo admin-app.js)
