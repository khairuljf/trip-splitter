import { useCallback } from 'react';

import { downloadExpenses } from '@/api/sync/downloadExpenses';
import { uploadExpenses } from '@/api/sync/uploadExpenses';

export const useSync = () => {
  const syncDown = useCallback(async () => {
    await downloadExpenses();
  }, []);

  const syncUp = useCallback(async () => {
    await uploadExpenses();
  }, []);

  const syncAll = useCallback(async () => {
    await downloadExpenses();
    await uploadExpenses();
  }, []);

  return { syncDown, syncUp, syncAll };
};

