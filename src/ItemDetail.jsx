import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase';

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setItemData(data);
    };

    fetchItemDetails();
  }, [id]);

  if (!itemData) return <p>Loading...</p>;

  return (
    <div className="detail-card">
      <div className="image-column">
        <img src={itemData.image} alt={itemData.item} />
      </div>

      <div className="text-column">
        <h1>{itemData.item}</h1>
        <div className="meta-row">
          <span className="meta-chip">Class {itemData.class}</span>
          <span className="meta-chip">SCP Record</span>
        </div>
        <h2>Class: {itemData.class}</h2>

        <h3>Description</h3>
        <p>{itemData.description}</p>

        <h3>Containment</h3>
        <p>{itemData.containment}</p>
      </div>
    </div>
  );
}

export default ItemDetail;