import { useAffiliate } from '../contexts/AffiliateContext';

/**
 * Hook to get the current affiliate ID
 * @returns {number|null} Current affiliate ID
 */
export const useAffiliateId = () => {
    const { currentAffiliate } = useAffiliate();
    return currentAffiliate?.id || null;
};

export default useAffiliateId;
