import { useState, useEffect } from 'react';
import affiliatesService from '../../services/affiliatesService';
import './affiliateMembers.css';

const AffiliateMembers = ({ 
    affiliateId,
    onMemberAdded,
    onMemberRemoved,
    onMemberUpdated
}) => {
    const [members, setMembers] = useState([]);
    const [availableMembers, setAvailableMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [permissions, setPermissions] = useState({});

    // Load members when affiliate changes
    useEffect(() => {
        if (affiliateId) {
            loadMembers();
            loadAvailableMembers();
        }
    }, [affiliateId]);

    const loadMembers = async () => {
        try {
            setLoading(true);
            const response = await affiliatesService.getMembers(affiliateId);
            if (response.success) {
                setMembers(response.data);
            }
        } catch (error) {
            console.error('Error loading members:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadAvailableMembers = async () => {
        try {
            const response = await affiliatesService.getAvailableMembers(affiliateId);
            if (response.success) {
                setAvailableMembers(response.data);
            }
        } catch (error) {
            console.error('Error loading available members:', error);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!selectedMember) return;

        try {
            setLoading(true);
            const response = await affiliatesService.addMember(
                affiliateId, 
                parseInt(selectedMember), 
                permissions
            );
            
            if (response.success) {
                await loadMembers();
                await loadAvailableMembers();
                setShowAddForm(false);
                setSelectedMember('');
                setPermissions({});
                
                if (onMemberAdded) {
                    onMemberAdded(response.data);
                }
            }
        } catch (error) {
            console.error('Error adding member:', error);
            alert('Error adding member');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm('Are you sure you want to remove this member?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await affiliatesService.removeMember(affiliateId, memberId);
            
            if (response.success) {
                await loadMembers();
                await loadAvailableMembers();
                
                if (onMemberRemoved) {
                    onMemberRemoved(memberId);
                }
            }
        } catch (error) {
            console.error('Error removing member:', error);
            alert('Error removing member');
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionChange = (permission, checked) => {
        setPermissions(prev => ({
            ...prev,
            [permission]: checked
        }));
    };

    const permissionOptions = affiliatesService.getPermissionOptions();

    if (loading && members.length === 0) {
        return (
            <div className="affiliate-members-loading">
                <i className="fas fa-spinner fa-spin"></i> Loading members...
            </div>
        );
    }

    return (
        <div className="affiliate-members">
            <div className="affiliate-members-header">
                <h3>Affiliate Members</h3>
                <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowAddForm(!showAddForm)}
                    disabled={loading}
                >
                    <i className="fas fa-plus"></i> Add Member
                </button>
            </div>

            {showAddForm && (
                <div className="affiliate-members-add-form">
                    <form onSubmit={handleAddMember}>
                        <div className="form-group">
                            <label>Select Affiliate to Add:</label>
                            <select 
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                                className="form-control"
                                required
                            >
                                <option value="">Choose an affiliate...</option>
                                {availableMembers.map(affiliate => (
                                    <option key={affiliate.id} value={affiliate.id}>
                                        {affiliate.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Permissions:</label>
                            <div className="permissions-checkboxes">
                                {permissionOptions.map(option => (
                                    <div key={option.name} className="permission-checkbox">
                                        <input
                                            type="checkbox"
                                            id={`perm-${option.name}`}
                                            checked={permissions[option.name] || false}
                                            onChange={(e) => handlePermissionChange(option.name, e.target.checked)}
                                        />
                                        <label htmlFor={`perm-${option.name}`}>
                                            {option.label}
                                            {option.description && (
                                                <small className="text-muted">{option.description}</small>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                <i className="fas fa-plus"></i> Add Member
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="affiliate-members-list">
                {members.length === 0 ? (
                    <div className="no-members">
                        <i className="fas fa-users"></i>
                        <p>No members found. Add the first member using the button above.</p>
                    </div>
                ) : (
                    <div className="members-table">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Member Name</th>
                                        <th>Permissions</th>
                                        <th>Added Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member.id}>
                                            <td>
                                                <strong>{member.to_affiliate?.name}</strong>
                                            </td>
                                            <td>
                                                <div className="permissions-display">
                                                    {Object.entries(member.permissions || {}).map(([key, value]) => (
                                                        value && (
                                                            <span key={key} className="badge bg-info me-1">
                                                                {key.replace('_', ' ')}
                                                            </span>
                                                        )
                                                    ))}
                                                    {Object.keys(member.permissions || {}).length === 0 && (
                                                        <span className="text-muted">No permissions</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(member.created_at).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRemoveMember(member.to_affiliate_id)}
                                                    disabled={loading}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffiliateMembers;
