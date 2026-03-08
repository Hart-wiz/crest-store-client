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
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-1">
            Products
          </h1>
          <p className="text-gray-400 text-[0.85rem]">
            {productList.length} total products
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold py-2.5 px-6 text-[0.8rem]">
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input max-w-[400px]"
        />
      </div>

      {/* Products Table */}
      <div className="admin-card overflow-x-auto">
        <table className="admin-table w-full min-w-[800px]">
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
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-gray-900 overflow-hidden shrink-0">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-[0.85rem]">{p.name}</p>
                      <p className="text-gray-500 text-[0.7rem]">{p.collection}</p>
                    </div>
                  </div>
                </td>
                <td className="text-gray-400">{p.category}</td>
                <td className="text-gold font-semibold">{formatPrice(p.price)}</td>
                <td>
                  <span className={`font-semibold ${
                    p.stock > 20 ? 'text-success' : p.stock > 5 ? 'text-warning' : 'text-danger'
                  }`}>
                    {p.stock}
                  </span>
                </td>
                <td>
                  <span className={`py-[3px] px-2.5 rounded-xl text-[0.7rem] font-semibold ${
                    p.isAvailable ? 'bg-[#38A169]/15 text-[#68D391]' : 'bg-[#E53E3E]/15 text-[#FC8181]'
                  }`}>
                    {p.isAvailable ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  {p.isExclusive ? (
                    <span className="badge-exclusive static text-[0.6rem] py-0.5 px-2">
                      Exclusive
                    </span>
                  ) : (
                    <span className="text-gray-600 text-[0.8rem]">—</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="py-1.5 px-3.5 bg-white/5 border border-gray-700 text-gray-300 cursor-pointer text-[0.75rem] rounded-md transition-colors hover:bg-white/10 font-body">
                      Edit
                    </button>
                    <button className="py-1.5 px-3.5 bg-[#E53E3E]/10 border border-[#E53E3E]/20 text-[#FC8181] cursor-pointer text-[0.75rem] rounded-md hover:bg-[#E53E3E]/20 transition-colors font-body">
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
        <div className="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center p-6" onClick={() => setShowModal(false)}>
          <div className="bg-black-lighter border border-gray-800 rounded-2xl p-8 max-w-[600px] w-full max-h-[85vh] overflow-y-auto animate-[fadeInUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="bg-transparent border-none text-gray-400 text-xl cursor-pointer hover:text-white">✕</button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                  Product Name
                </label>
                <input className="admin-input" placeholder="e.g., Crest Sovereign Hoodie" defaultValue={editingProduct?.name || ''} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                    Price (₦)
                  </label>
                  <input className="admin-input" type="number" placeholder="45000" defaultValue={editingProduct?.price || ''} />
                </div>
                <div>
                  <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                    Stock
                  </label>
                  <input className="admin-input" type="number" placeholder="24" defaultValue={editingProduct?.stock || ''} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                    Category
                  </label>
                  <select className="admin-input" defaultValue={editingProduct?.category || ''}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                    Collection
                  </label>
                  <select className="admin-input" defaultValue={editingProduct?.collection || ''}>
                    <option value="">Select collection</option>
                    {collections.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                  Description
                </label>
                <textarea className="admin-input min-h-[100px]" placeholder="Product description..." defaultValue={editingProduct?.description || ''} />
              </div>

              <div>
                <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                  Sizes (comma separated)
                </label>
                <input className="admin-input" placeholder="S, M, L, XL" defaultValue={editingProduct?.sizes.join(', ') || ''} />
              </div>

              <div>
                <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold text-transform: uppercase tracking-[0.08em]">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <p className="text-gray-500 text-[0.85rem]">
                    📷 Click or drag image here to upload
                  </p>
                  <p className="text-gray-600 text-[0.75rem] mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${
                    editingProduct?.isExclusive ? 'bg-gold' : 'bg-gray-700'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                      editingProduct?.isExclusive ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </div>
                  <span className="text-[0.85rem] text-gray-300">Mark as Exclusive</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${
                    editingProduct?.isAvailable !== false ? 'bg-success' : 'bg-gray-700'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                      editingProduct?.isAvailable !== false ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </div>
                  <span className="text-[0.85rem] text-gray-300">Available</span>
                </label>
              </div>

              <div className="flex gap-3 mt-2">
                <button className="btn-gold flex-1 py-3.5">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
                <button onClick={() => setShowModal(false)} className="btn-outline py-3 px-6">
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
