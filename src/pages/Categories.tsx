import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import { useToast } from '../contexts/ToastContext';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { CategoryForm } from '../components/categories/CategoryForm';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

export const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error: any) {
      showToast(error.message || 'Failed to load categories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Transactions with this category will remain but be marked as uncategorized.')) return;

    try {
      await categoryService.deleteCategory(id);
      showToast('Category deleted successfully', 'success');
      loadCategories();
    } catch (error: any) {
      showToast(error.message || 'Failed to delete category', 'error');
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSuccess = () => {
    handleModalClose();
    loadCategories();
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organize your transactions with categories</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2" />
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                Income Categories
              </h2>
            </div>

            <div className="p-6">
              {incomeCategories.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No income categories yet</p>
              ) : (
                <div className="space-y-3">
                  {incomeCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          <Tag size={20} style={{ color: category.color }} />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit category"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-red-600" />
                </div>
                Expense Categories
              </h2>
            </div>

            <div className="p-6">
              {expenseCategories.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No expense categories yet</p>
              ) : (
                <div className="space-y-3">
                  {expenseCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          <Tag size={20} style={{ color: category.color }} />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit category"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};
