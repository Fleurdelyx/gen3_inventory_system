import React, { useState, useEffect } from 'react';
import { getAllProducts, Product } from '../api/products';
import { getAllSuppliers, Supplier } from '../api/suppliers';
import { getAllCategories, Category } from '../api/categories';
import { Pencil, Package } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Handle error appropriately, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
    const fetchData = async () => {
      try {
        const suppliersData = await getAllSuppliers();
        const categoriesData = await getAllCategories();
        setSuppliers(suppliersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch suppliers or categories:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-ashley-background min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-ashley-gray-12">Product Management</h1>
          <button
            className="bg-ashley-gray-9 hover:bg-ashley-gray-10 text-ashley-accent-1 font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Add Product
          </button>
        </div>

        {loading ? (
          <p className="text-ashley-gray-11">Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-ashley-gray-6 border border-ashley-gray-6">
              <thead className="bg-ashley-gray-1">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Item Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Supplier</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Unit Cost</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Selling Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">VAT Exempt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Active</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-ashley-gray-11 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-ashley-gray-6">
                {products.map((product) => (
                  <tr key={product.product_id} className="hover:bg-ashley-gray-1">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-12">{product.item_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-12">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.supplier_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.category_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.unit_cost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.selling_price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.is_vat_exempt ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        <div className="px-3 py-1 rounded-full bg-ashley-accent-2 text-ashley-gray-12 text-xs font-medium">
                          {product.stock_on_hand}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ashley-gray-11">{product.is_active ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-ashley-gray-9 hover:text-ashley-gray-10 text-xs px-2 py-1 flex items-center">
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} suppliers={suppliers} categories={categories} refetch={fetchProducts} />
    </div>
  );
};

export default ProductManagementPage;
