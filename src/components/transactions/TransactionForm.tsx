import { useState, useEffect, FormEvent } from 'react';
import { transactionService } from '../../services/transactionService';
import { categoryService } from '../../services/categoryService';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { formatDateInput } from '../../utils/formatters';

interface TransactionFormProps {
  transaction?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TransactionForm = ({ transaction, onSuccess, onCancel }: TransactionFormProps) => {
  const [amount, setAmount] = useState(transaction?.amount?.toString() || '');
  const [type, setType] = useState<'income' | 'expense'>(transaction?.type || 'expense');
  const [categoryId, setCategoryId] = useState(transaction?.category_id || '');
  const [date, setDate] = useState(transaction?.date || formatDateInput(new Date()));
  const [notes, setNotes] = useState(transaction?.notes || '');
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
      const data = {
        amount: parseFloat(amount),
        type,
        category_id: categoryId || null,
        date,
        notes,
      };

      if (transaction) {
        await transactionService.updateTransaction(transaction.id, data);
        showToast('Transaction updated successfully', 'success');
      } else {
        await transactionService.createTransaction(data);
        showToast('Transaction created successfully', 'success');
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

  const categoryOptions = [
    { value: '', label: 'No Category' },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          placeholder="Add notes about this transaction..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {transaction ? 'Update' : 'Create'} Transaction
        </Button>
      </div>
    </form>
  );
};
