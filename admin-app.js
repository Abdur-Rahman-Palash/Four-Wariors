function AdminApp(){
  const { useState, useEffect, useRef } = React;

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

  const resetForm = () => setForm({ title: '', category: 'web', image: '', description: '', tools: '' });

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

  function handleExport(){
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'projects.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e){
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid file');
        setProjects(parsed);
      } catch (err){ alert('Invalid JSON file'); }
    };
    reader.readAsText(file);
  }

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">Admin — Manage Projects</h1>
        <p className="text-sm text-gray-600 mb-6">Add, edit, delete projects. Images may be a URL or uploaded (stored locally in your browser).</p>

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
            <button type="button" onClick={()=>{ resetForm(); setEditingIndex(-1); if (fileInputRef.current) fileInputRef.current.value=''; }} className="px-4 py-2 border rounded">Reset</button>
            <button type="button" onClick={handleExport} className="px-4 py-2 border rounded">Export JSON</button>
            <label className="px-4 py-2 border rounded cursor-pointer">
              Import JSON
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>
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
