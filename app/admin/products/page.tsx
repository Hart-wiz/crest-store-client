'use client';

import { useState } from 'react';
import { products, formatPrice, categories, collections, Product } from '../../data/store';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productList] = useState(products);

  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditingProduct(null); setShowModal(true); };
  const openEdit = (p: Product) => { setEditingProduct(p); setShowModal(true); };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
            Products
          </h1>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
            {productList.length} total products
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Products Table */}
      <div className="admin-card" style={{ overflow: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Exclusive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 8, background: 'var(--color-gray-900)',
                      overflow: 'hidden', flexShrink: 0,
                    }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '0.85rem' }}>{p.name}</p>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.7rem' }}>{p.collection}</p>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--color-gray-400)' }}>{p.category}</td>
                <td style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{formatPrice(p.price)}</td>
                <td>
                  <span style={{
                    color: p.stock > 20 ? 'var(--color-success)' : p.stock > 5 ? 'var(--color-warning)' : 'var(--color-danger)',
                    fontWeight: 600,
                  }}>
                    {p.stock}
                  </span>
                </td>
                <td>
                  <span style={{
                    padding: '3px 10px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 600,
                    background: p.isAvailable ? 'rgba(56,161,105,0.15)' : 'rgba(229,62,62,0.15)',
                    color: p.isAvailable ? '#68D391' : '#FC8181',
                  }}>
                    {p.isAvailable ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  {p.isExclusive ? (
                    <span className="badge-exclusive" style={{ position: 'static', fontSize: '0.6rem', padding: '3px 8px' }}>
                      Exclusive
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-gray-600)', fontSize: '0.8rem' }}>—</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(p)} style={{
                      padding: '6px 14px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--color-gray-700)', color: 'var(--color-gray-300)',
                      cursor: 'pointer', fontSize: '0.75rem', borderRadius: 6,
                      transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '6px 14px', background: 'rgba(229,62,62,0.1)',
                      border: '1px solid rgba(229,62,62,0.2)', color: '#FC8181',
                      cursor: 'pointer', fontSize: '0.75rem', borderRadius: 6,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'var(--color-black-lighter)', border: '1px solid var(--color-gray-800)',
            borderRadius: 16, padding: 32, maxWidth: 600, width: '100%', maxHeight: '85vh', overflowY: 'auto',
            animation: 'fadeInUp 0.3s ease-out',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{
                background: 'none', border: 'none', color: 'var(--color-gray-400)',
                fontSize: '1.25rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Product Name
                </label>
                <input className="admin-input" placeholder="e.g., Crest Sovereign Hoodie" defaultValue={editingProduct?.name || ''} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Price (₦)
                  </label>
                  <input className="admin-input" type="number" placeholder="45000" defaultValue={editingProduct?.price || ''} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Stock
                  </label>
                  <input className="admin-input" type="number" placeholder="24" defaultValue={editingProduct?.stock || ''} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Category
                  </label>
                  <select className="admin-input" defaultValue={editingProduct?.category || ''}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Collection
                  </label>
                  <select className="admin-input" defaultValue={editingProduct?.collection || ''}>
                    <option value="">Select collection</option>
                    {collections.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Description
                </label>
                <textarea className="admin-input" placeholder="Product description..." defaultValue={editingProduct?.description || ''} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Sizes (comma separated)
                </label>
                <input className="admin-input" placeholder="S, M, L, XL" defaultValue={editingProduct?.sizes.join(', ') || ''} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Product Image
                </label>
                <div style={{
                  border: '2px dashed var(--color-gray-700)', borderRadius: 8, padding: 32,
                  textAlign: 'center', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem' }}>
                    📷 Click or drag image here to upload
                  </p>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: '0.75rem', marginTop: 4 }}>
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: 24, padding: '8px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, padding: 2,
                    background: editingProduct?.isExclusive ? 'var(--color-gold)' : 'var(--color-gray-700)',
                    transition: 'background 0.3s ease', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: 'white',
                      transform: editingProduct?.isExclusive ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)' }}>Mark as Exclusive</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, padding: 2,
                    background: editingProduct?.isAvailable !== false ? 'var(--color-success)' : 'var(--color-gray-700)',
                    transition: 'background 0.3s ease', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: 'white',
                      transform: editingProduct?.isAvailable !== false ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)' }}>Available</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn-gold" style={{ flex: 1, padding: '14px' }}>
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
                <button onClick={() => setShowModal(false)} className="btn-outline" style={{ padding: '12px 24px' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
