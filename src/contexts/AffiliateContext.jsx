import React, { createContext, useContext, useState, useEffect } from 'react';
import affiliatesService from '../services/affiliatesService';
import { setCurrentAffiliateId, getCurrentAffiliateId } from '../utils/affiliateUtils';

// Create context
const AffiliateContext = createContext();

// Custom hook to use affiliate context
export const useAffiliate = () => {
    const context = useContext(AffiliateContext);
    if (!context) {
        throw new Error('useAffiliate must be used within an AffiliateProvider');
    }
    return context;
};

// Provider component
export const AffiliateProvider = ({ children }) => {
    const [currentAffiliate, setCurrentAffiliate] = useState(null);
    const [userAffiliates, setUserAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user's affiliates on mount
    useEffect(() => {
        loadUserAffiliates();
    }, []);

    const loadUserAffiliates = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await affiliatesService.get();
            
            if (response.success) {
                setUserAffiliates(response.data);
                
                // Handle affiliate selection logic
                await handleAffiliateSelection(response.data);
            } else {
                setError('Failed to load affiliates');
                console.error('Error loading affiliates:', response.error);
            }
        } catch (error) {
            console.error('Error loading user affiliates:', error);
            setError('Failed to load affiliates');
        } finally {
            setLoading(false);
        }
    };

    const handleAffiliateSelection = async (affiliates) => {
        if (affiliates.length === 0) {
            console.log('No affiliates available for user');
            setCurrentAffiliate(null);
            return;
        }

        // Check if there's a stored affiliate ID
        const storedAffiliateId = getCurrentAffiliateId();
        console.log('Stored affiliate ID:', storedAffiliateId);
        
        let affiliateToUse = null;

        if (storedAffiliateId) {
            // Try to find the stored affiliate in the user's affiliates
            affiliateToUse = affiliates.find(a => a.id == storedAffiliateId);
            if (affiliateToUse) {
                console.log('Using stored affiliate:', affiliateToUse.name);
            } else {
                console.log('Stored affiliate not found in user affiliates, will use first available');
            }
        }

        // If no stored affiliate or stored affiliate not found, use the first one
        if (!affiliateToUse) {
            affiliateToUse = affiliates[0];
            console.log('Using first available affiliate:', affiliateToUse.name);
        }

        // Set the affiliate
        if (affiliateToUse) {
            setCurrentAffiliate(affiliateToUse);
            setCurrentAffiliateId(affiliateToUse.id);
            console.log('Affiliate set to:', affiliateToUse.name, 'ID:', affiliateToUse.id);
        }
    };

    const switchAffiliate = async (affiliateId) => {
        try {
            // Find affiliate in user's affiliates
            const affiliate = userAffiliates.find(a => a.id === affiliateId);
            if (affiliate) {
                setCurrentAffiliate(affiliate);
                setCurrentAffiliateId(affiliateId);
                
                // Trigger a refresh of all data that depends on affiliate context
                // This will update any components that use affiliate-dependent data
                window.dispatchEvent(new CustomEvent('affiliateChanged', { 
                    detail: { affiliateId } 
                }));
                
                console.log('Switched to affiliate:', affiliate.name);
                return true;
            }
            
            console.error('Affiliate not found in user affiliates:', affiliateId);
            return false;
        } catch (error) {
            console.error('Error switching affiliate:', error);
            setError('Failed to switch affiliate');
            return false;
        }
    };

    const refreshAffiliates = async () => {
        await loadUserAffiliates();
    };

    const getCurrentAffiliateName = () => {
        return currentAffiliate?.name || 'No Affiliate Selected';
    };

    const isAffiliateSelected = () => {
        return !!currentAffiliate;
    };

    const value = {
        currentAffiliate,
        userAffiliates,
        loading,
        error,
        switchAffiliate,
        refreshAffiliates,
        getCurrentAffiliateId: getCurrentAffiliateId,
        getCurrentAffiliateName,
        isAffiliateSelected
    };

    return (
        <AffiliateContext.Provider value={value}>
            {children}
        </AffiliateContext.Provider>
    );
};

export default AffiliateContext; 