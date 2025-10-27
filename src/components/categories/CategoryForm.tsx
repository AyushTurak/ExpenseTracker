import { useState, FormEvent } from 'react';
import { categoryService } from '../../services/categoryService';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface CategoryFormProps {
  category?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const COLOR_PRESETS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];

export const CategoryForm = ({ category, onSuccess, onCancel }: CategoryFormProps) => {
  const [name, setName] = useState(category?.name || '');
  const [type, setType] = useState<'income' | 'expense'>(category?.type || 'expense');
  const [color, setColor] = useState(category?.color || COLOR_PRESETS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please enter a category name', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        name: name.trim(),
        type,
        color,
      };

      if (category) {
        await categoryService.updateCategory(category.id, data);
        showToast('Category updated successfully', 'success');
      } else {
        await categoryService.createCategory(data);
        showToast('Category created successfully', 'success');
      }

      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Operation failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        label="Category Name"
        placeholder="e.g., Groceries, Salary, etc."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Select
        label="Type"
        options={typeOptions}
        value={type}
        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Color
        </label>
        <div className="grid grid-cols-8 gap-3">
          {COLOR_PRESETS.map((presetColor) => (
            <button
              key={presetColor}
              type="button"
              onClick={() => setColor(presetColor)}
              className={`w-10 h-10 rounded-full transition-all ${color === presetColor
                ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                : 'hover:scale-105'
                }`}
              style={{ backgroundColor: presetColor }}
              aria-label={`Select ${presetColor}`}
            />
          ))}
        </div>
        <div className="mt-4">
          <Input
            type="color"
            label="Custom Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {category ? 'Update' : 'Create'} Category
        </Button>
      </div>
    </form>
  );
};
