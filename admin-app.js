function AdminApp(){
  const { useState, useEffect, useRef } = React;

  // -----------------------------
  // Simple client-side password protection
  // - Default password stored in localStorage key `fw_admin_pass` (change via console)
  // - Session authentication stored in sessionStorage key `fw_admin_authed`
  // -----------------------------
  const DEFAULT_ADMIN_PASS = 'fwadmin123';
  const getSavedPass = () => { try { return localStorage.getItem('fw_admin_pass') || DEFAULT_ADMIN_PASS } catch(e){ return DEFAULT_ADMIN_PASS } };
  const [isAuthed, setIsAuthed] = useState(() => {
    try { return sessionStorage.getItem('fw_admin_authed') === '1'; } catch (e) { return false; }
  });
  const [pwInput, setPwInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showSetPassOnLogin, setShowSetPassOnLogin] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const defaultProjects = [
    {
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80',
      description: 'Full-stack e-commerce solution with payment integration',
      tools: ['React', 'Node.js', 'MongoDB']
    }
  ];

  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem('fw_projects');
      return raw ? JSON.parse(raw) : defaultProjects;
    } catch (err) {
      console.warn('Failed to parse stored projects', err);
      return defaultProjects;
    }
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [form, setForm] = useState({ title: '', category: 'web', image: '', description: '', tools: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem('fw_projects', JSON.stringify(projects)); } catch (err) { console.warn('save failed', err); }
  }, [projects]);

  function attemptLogin(e){
    e && e.preventDefault();
    if (pwInput === getSavedPass()) {
      try { sessionStorage.setItem('fw_admin_authed','1'); } catch(e){}
      setIsAuthed(true);
      setPwInput('');
    } else {
      alert('Incorrect password.');
    }
  }

  function handleLogout(){
    try { sessionStorage.removeItem('fw_admin_authed'); } catch(e){}
    setIsAuthed(false);
  }

  function handleChangePassword(e){
    e && e.preventDefault();
    if (!newPass) return alert('Enter new password');
    if (newPass !== confirmPass) return alert('Passwords do not match');
    try {
      localStorage.setItem('fw_admin_pass', newPass);
      alert('Password changed successfully');
      setNewPass(''); setConfirmPass(''); setShowChangePass(false); setShowSetPassOnLogin(false);
    } catch (err) {
      console.warn('Failed to save new password', err);
      alert('Could not save password in this browser');
    }
  }

  function handleSetPassOnLogin(e){
    e && e.preventDefault();
    if (!newPass) return alert('Enter new password');
    if (newPass !== confirmPass) return alert('Passwords do not match');
    try {
      localStorage.setItem('fw_admin_pass', newPass);
      alert('Password set successfully. Please login with your new password.');
      setNewPass(''); setConfirmPass(''); setShowSetPassOnLogin(false);
    } catch (err) {
      console.warn('Failed to save new password', err);
      alert('Could not save password in this browser');
    }
  }

  const resetForm = () => {
    setForm({ title: '', category: 'web', image: '', description: '', tools: '' });
    setEditingIndex(-1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function handleAdd(e){
    e && e.preventDefault();
    // basic validation
    if (!form.title || !form.description) return alert('Title and description are required');

    let imageValue = form.image;
    if (!imageValue && fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]){
      try { imageValue = await onFile(fileInputRef.current.files[0]); } catch(err){ console.warn('file read failed', err); }
    }

    const toolsArray = form.tools.split(',').map(t => t.trim()).filter(Boolean);

    const newProject = { title: form.title, category: form.category, image: imageValue || '', description: form.description, tools: toolsArray };

    if (editingIndex >= 0) {
      const copy = projects.slice();
      copy[editingIndex] = newProject;
      setProjects(copy);
      setEditingIndex(-1);
    } else {
      setProjects([newProject, ...projects]);
    }

    resetForm();
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleEdit(idx){
    const p = projects[idx];
    setForm({ title: p.title, category: p.category, image: p.image || '', description: p.description, tools: (p.tools || []).join(', ') });
    setEditingIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(idx){
    if (!confirm('Delete this project? This cannot be undone.')) return;
    const copy = projects.slice();
    copy.splice(idx,1);
    setProjects(copy);
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">Enter the admin password to access the Projects admin panel.</p>
          
          {!showSetPassOnLogin ? (
            <>
              <form onSubmit={attemptLogin} className="space-y-4">
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={pwInput} onChange={e=>setPwInput(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded pr-10" />
                  <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-2 top-2.5 text-gray-500 text-sm">
                    {showPw ? '🙈' : '👁️'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button type="submit" className="btn-primary flex-1">Unlock Admin</button>
                </div>
                <button type="button" onClick={()=>setShowSetPassOnLogin(true)} className="w-full px-3 py-2 border rounded text-sm hover:bg-gray-100">Set New Password</button>
              </form>
              <p className="text-xs text-gray-400 mt-4">Default password (first time): <strong>{DEFAULT_ADMIN_PASS}</strong></p>
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
                <button type="submit" className="btn-primary flex-1">Save Password</button>
                <button type="button" onClick={()=>{setShowSetPassOnLogin(false); setNewPass(''); setConfirmPass(''); setShowNewPw(false); setShowConfirmPw(false);}} className="px-3 py-2 border rounded">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto py-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Admin — Manage Projects</h1>
          <div className="flex items-center gap-3">
            <button onClick={()=>setShowChangePass(!showChangePass)} className="px-3 py-2 border rounded text-sm">{showChangePass ? 'Close' : 'Change password'}</button>
            <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded text-sm">Logout</button>
          </div>
        </div>

        {showChangePass && (
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

      </div>
      <div className="max-w-6xl mx-auto py-6 px-6">
        <h1 className="text-3xl font-bold mb-4">Admin — Manage Projects</h1>
        <p className="text-sm text-gray-600 mb-6">Add, edit, delete projects. Images may be a URL or uploaded (stored locally in your browser). Changes are saved to this browser only unless you export and import JSON.</p>

        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full border px-3 py-2 rounded">
                <option value="web">Web</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
              <input value={form.image} onChange={e=>setForm({...form, image: e.target.value})} placeholder="https://... or leave empty to upload" className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Or upload image</label>
              <input ref={fileInputRef} type="file" accept="image/*" className="w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full border px-3 py-2 rounded h-24"></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Tools (comma separated)</label>
              <input value={form.tools} onChange={e=>setForm({...form, tools: e.target.value})} className="w-full border px-3 py-2 rounded" />
            </div>

          </div>

          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn-primary">{editingIndex >=0 ? 'Save changes' : 'Add project'}</button>
            <button type="button" onClick={resetForm} className="px-4 py-2 border rounded">Reset</button>
          </div>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Projects ({projects.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <ProjectCard {...p} />
                <div className="flex gap-2 mt-3">
                  <button onClick={()=>handleEdit(idx)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={()=>handleDelete(idx)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const adminRoot = ReactDOM.createRoot(document.getElementById('root'));
adminRoot.render(<AdminApp />);
