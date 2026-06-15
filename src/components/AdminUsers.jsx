import { useState, useEffect } from 'react';
import { Trash2, User, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [broadcastMsg, setBroadcastMsg] = useState('Hello! Check out our new collection at Caballero Menswear! 🤠');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from backend...');
      const res = await fetch('http://localhost:5000/api/admin/users');
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error('Expected JSON but got:', text.substring(0, 100));
        return;
      }

      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if (result.success) {
        fetchUsers(); // refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openWhatsApp = (phone, name) => {
    if (!phone) {
      alert('No phone number available for this user.');
      return;
    }
    // Clean phone number (remove non-digits)
    const cleanPhone = phone.replace(/\D/g, '');
    const msg = encodeURIComponent(broadcastMsg.replace('{name}', name));
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const handleWhatsAppAll = () => {
    if (!window.confirm(`This will open WhatsApp for ${users.length} users. Continue?`)) return;
    users.forEach((user, index) => {
      // We use a small timeout to prevent browser from blocking multiple popups
      setTimeout(() => {
        if (user.phone) {
          const cleanPhone = user.phone.replace(/\D/g, '');
          const msg = encodeURIComponent(broadcastMsg.replace('{name}', user.name));
          window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
        }
      }, index * 1000); 
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-beige/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl text-charcoal">Marketing Hub</h2>
          <p className="text-[10px] tracking-widest uppercase text-stone-400 mt-1">Manage & Reach your customers</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleWhatsAppAll}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-green-600 transition-all shadow-md shadow-green-200"
          >
            <Send size={14} /> Broadcast All
          </button>
        </div>
      </div>

      {/* Broadcast Template */}
      <div className="mb-8 p-5 bg-stone-50 rounded-2xl border border-stone-100">
        <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">WhatsApp Message Template</label>
        <textarea 
          value={broadcastMsg}
          onChange={(e) => setBroadcastMsg(e.target.value)}
          placeholder="Type your marketing message here... Use {name} for personalization."
          className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none h-24"
        />
        <p className="text-[9px] text-stone-400 mt-2 italic">* {users.length} customers will receive this message if you click Broadcast.</p>
      </div>

      {users.length === 0 ? (
        <p className="text-muted text-center py-10">No users found in database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr className="text-[10px] uppercase tracking-widest text-stone-400">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Contact Detail</th>
                <th className="text-left p-4">
                  Last Login 
                  <span className="ml-1 text-[8px] normal-case font-normal">(Last active time)</span>
                </th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
               {users.map(user => (
                <tr key={user.id} className="border-b border-stone-50 hover:bg-stone-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center text-brown font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-charcoal">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-charcoal group">
                        <Mail size={12} className="text-stone-300" />
                        <span className="text-xs">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-stone-500">
                          <MessageCircle size={12} className="text-green-400" />
                          <span className="text-[11px]">{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-stone-300" />
                      <span className="text-xs text-stone-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openWhatsApp(user.phone, user.name)}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                        title="Send WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;