import { useState, useEffect, FormEvent } from 'react';
import { transactionService } from '../../services/transactionService';
import { categoryService } from '../../services/categoryService';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { formatDateInput } from '../../utils/formatters';

interface QuickAddTransactionProps {
  onSuccess: () => void;
}

export const QuickAddTransaction = ({ onSuccess }: QuickAddTransactionProps) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(formatDateInput(new Date()));
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
      if (data.length > 0) {
        setCategoryId(data[0].id);
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to load categories', 'error');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    setIsLoading(true);

    try {
      await transactionService.createTransaction({
        amount: parseFloat(amount),
        type,
        category_id: categoryId || null,
        date,
        notes,
      });

      showToast('Transaction added successfully', 'success');
      setAmount('');
      setNotes('');
      setDate(formatDateInput(new Date()));
      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Failed to add transaction', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  const categoryOptions = [
    { value: '', label: 'No Category' },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Add</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          label="Amount"
          placeholder="0.00"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <Select
          label="Type"
          options={typeOptions}
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          required
        />

        <Select
          label="Category"
          options={categoryOptions}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <Input
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Add notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Add Transaction
        </Button>
      </form>
    </div>
  );
};
