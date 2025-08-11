import React from 'react';
import './skeletonField.css';

const SkeletonField = ({ type = 'text', label = true, helpText = false, rows = 3 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'text':
            case 'email':
            case 'url':
            case 'number':
                return (
                    <div className="skeleton-input skeleton-animate"></div>
                );
            
            case 'textarea':
                return (
                    <div 
                        className="skeleton-textarea skeleton-animate" 
                        style={{ height: `${rows * 24}px` }}
                    ></div>
                );
            
            case 'select':
                return (
                    <div className="skeleton-select skeleton-animate"></div>
                );
            
            case 'checkbox':
                return (
                    <div className="skeleton-checkbox skeleton-animate"></div>
                );
            
            case 'color':
                return (
                    <div className="skeleton-color skeleton-animate"></div>
                );
            
            case 'editor':
                return (
                    <div className="skeleton-editor skeleton-animate">
                        <div className="skeleton-editor-toolbar">
                            <div className="skeleton-tool skeleton-animate"></div>
                            <div className="skeleton-tool skeleton-animate"></div>
                            <div className="skeleton-tool skeleton-animate"></div>
                        </div>
                        <div className="skeleton-editor-content skeleton-animate"></div>
                    </div>
                );
            
            case 'custom':
                return (
                    <div className="skeleton-custom skeleton-animate"></div>
                );
            
            default:
                return (
                    <div className="skeleton-input skeleton-animate"></div>
                );
        }
    };

    return (
        <div className="skeleton-field mb-3">
            {label && (
                <div className="skeleton-label skeleton-animate"></div>
            )}
            {renderSkeleton()}
            {helpText && (
                <div className="skeleton-help-text skeleton-animate"></div>
            )}
        </div>
    );
};

export default SkeletonField;
