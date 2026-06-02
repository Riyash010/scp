import { useState, useEffect } from 'react';
import { supabase } from './supabase';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  });
  const [editRecord, setEditRecord] = useState(null);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('scp').select('*');

    if (error) {
      console.error(error);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await supabase.from('scp').insert([newRecord]);

    setNewRecord({
      item: '',
      class: '',
      description: '',
      containment: '',
      image: ''
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await supabase.from('scp').delete().eq('id', id);
    fetchItems();
  };

  const startEditing = (item) => {
    setEditRecord(item);
  };

  const saveEdit = async (id) => {
    await supabase.from('scp').update(editRecord).eq('id', id);
    setEditRecord(null);
    fetchItems();
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <section className="admin-section">
        <h3>Add New SCP Record</h3>
        <div className="form-grid">
          <input
            placeholder="Item"
            value={newRecord.item}
            onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}
          />
          <input
            placeholder="Class"
            value={newRecord.class}
            onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newRecord.description}
            onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
          />
          <input
            placeholder="Containment"
            value={newRecord.containment}
            onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })}
          />
          <input
            placeholder="Image URL"
            value={newRecord.image}
            onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })}
          />
        </div>
        <button onClick={addItem}>Add Record</button>
      </section>

      <section className="admin-section">
        <h3>Existing Records</h3>
        <ul className="records-list">
          {items.map((item) => (
            <li className="record-item" key={item.id}>
              {editRecord && editRecord.id === item.id ? (
                <div className="form-grid">
                  <input
                    value={editRecord.item}
                    onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })}
                  />
                  <input
                    value={editRecord.class}
                    onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })}
                  />
                  <input
                    value={editRecord.description}
                    onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}
                  />
                  <input
                    value={editRecord.containment}
                    onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })}
                  />
                  <input
                    value={editRecord.image}
                    onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })}
                  />
                  <div className="record-actions">
                    <button onClick={() => saveEdit(item.id)}>Save</button>
                    <button className="secondary-action" onClick={() => setEditRecord(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{item.item}</strong>
                    <span>{item.class}</span>
                  </div>
                  <div className="record-actions">
                    <button onClick={() => startEditing(item)}>Edit</button>
                    <button className="secondary-action" onClick={() => deleteItem(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPanel;