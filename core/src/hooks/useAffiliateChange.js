import { useCallback } from 'react';
import { useAffiliate } from '../contexts/AffiliateContext';

/**
 * Hook to handle affiliate changes and data refresh
 * @returns {object} Affiliate change handlers
 */
export const useAffiliateChange = () => {
    const { switchAffiliate, currentAffiliate } = useAffiliate();

    const handleAffiliateChange = useCallback(async (affiliateId) => {
        try {
            const success = await switchAffiliate(affiliateId);
            if (success) {
                console.log('Affiliate changed successfully to:', affiliateId);
                
                // Dispatch custom event for components to listen to
                window.dispatchEvent(new CustomEvent('affiliateChanged', {
                    detail: { 
                        affiliateId,
                        previousAffiliateId: currentAffiliate?.id 
                    }
                }));
                
                return true;
            } else {
                console.error('Failed to change affiliate');
                return false;
            }
        } catch (error) {
            console.error('Error changing affiliate:', error);
            return false;
        }
    }, [switchAffiliate, currentAffiliate?.id]);

    const refreshAffiliateData = useCallback(() => {
        if (currentAffiliate?.id) {
            window.dispatchEvent(new CustomEvent('affiliateChanged', {
                detail: { 
                    affiliateId: currentAffiliate.id,
                    forceRefresh: true 
                }
            }));
        }
    }, [currentAffiliate?.id]);

    return {
        handleAffiliateChange,
        refreshAffiliateData,
        currentAffiliateId: currentAffiliate?.id
    };
};

export default useAffiliateChange;
