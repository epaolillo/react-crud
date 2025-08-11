// Example of how to use the library in a React application

import React, { useState, useEffect } from 'react';
import AdminCrudApp, { 
  createEntity, 
  createEntityTableConfig, 
  createColumn,
  createAction,
  createFilter,
  commonEntityGroups,
  commonIcons,
  EntityService,
  createAutoEntity
} from '@epaolillo/react-crud';

// Example: Simple Users entity using createAutoEntity
const usersEntity = createAutoEntity({
  label: 'Users',
  key: 'users',
  icon: 'fas fa-users',
  group: 'System',
  description: 'Manage system users',
  columns: [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'first_name', header: 'First Name', type: 'text' },
    { field: 'last_name', header: 'Last Name', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { 
      field: 'status', 
      header: 'Status', 
      type: 'custom',
      render: (entity, value) => {
        const colors = {
          active: 'success',
          inactive: 'warning',
          banned: 'danger'
        };
        return <span className={`badge bg-${colors[value] || 'secondary'}`}>{value}</span>;
      }
    },
    { field: 'created_at', header: 'Created', type: 'date' }
  ],
  // Create button configuration
  createButton: {
    show: true,
    text: 'Add New User',
    icon: 'fas fa-user-plus',
    className: 'btn btn-success',
    tooltip: 'Create a new user account'
  },
  // Editor configuration - using modal for simple user creation
  editorConfig: {
    title: 'User Editor',
    fields: [
      { name: 'first_name', label: 'First Name', type: 'text', required: true },
      { name: 'last_name', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'banned', label: 'Banned' }
      ]}
    ]
  },
  editorType: 'modal'
});

// Example: Simple Categories entity using createAutoEntity  
const categoriesEntity = createAutoEntity({
  label: 'Categories',
  key: 'categories',
  icon: 'fas fa-tags',
  group: 'Content',
  description: 'Manage content categories',
  columns: [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'slug', header: 'Slug', type: 'text' },
    { field: 'description', header: 'Description', type: 'text' },
    { 
      field: 'status', 
      header: 'Status', 
      type: 'custom',
      render: (entity, value) => value === 'active'
        ? <span className="badge bg-success">Active</span>
        : <span className="badge bg-secondary">Inactive</span>
    },
    { field: 'created_at', header: 'Created', type: 'date' }
  ],
  // Create button configuration
  createButton: {
    show: true,
    text: 'Add New Category',
    icon: 'fas fa-tag',
    className: 'btn btn-primary',
    tooltip: 'Create a new content category'
  },
  // Editor configuration - using modal for simple category creation
  editorConfig: {
    title: 'Category Editor',
    fields: [
      { name: 'name', label: 'Category Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]}
    ]
  },
  editorType: 'modal'
});

// Example: Complex entity with page editor
const pagesEntity = createAutoEntity({
  label: 'Pages',
  key: 'pages',
  icon: 'fas fa-file-alt',
  group: 'Content',
  description: 'Manage website pages with rich content',
  columns: [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'title', header: 'Title', type: 'text' },
    { field: 'slug', header: 'Slug', type: 'text' },
    { field: 'status', header: 'Status', type: 'text' },
    { field: 'created_at', header: 'Created', type: 'date' }
  ],
  // Create button configuration
  createButton: {
    show: true,
    text: 'Create New Page',
    icon: 'fas fa-plus',
    className: 'btn btn-info',
    tooltip: 'Create a new page with rich content editor'
  },
  // Editor configuration - using page editor for complex page creation
  editorConfig: {
    title: 'Page Editor',
    fields: [
      { name: 'title', label: 'Page Title', type: 'text', required: true },
      { name: 'content', label: 'Page Content', type: 'editor' },
      { name: 'slug', label: 'URL Slug', type: 'text' },
      { name: 'meta_description', label: 'Meta Description', type: 'textarea', rows: 3 },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
      ]},
      { name: 'custom_css', label: 'Custom CSS', type: 'textarea', rows: 8 }
    ]
  },
  editorType: 'page'
});

// Example: Story entity with story editor
const storiesEntity = createAutoEntity({
  label: 'Stories',
  key: 'stories',
  icon: 'fas fa-newspaper',
  group: 'Content',
  description: 'Create and manage story content',
  columns: [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'title', header: 'Title', type: 'text' },
    { field: 'subtitle', header: 'Subtitle', type: 'text' },
    { field: 'status', header: 'Status', type: 'text' },
    { field: 'created_at', header: 'Created', type: 'date' }
  ],
  // Create button configuration
  createButton: {
    show: true,
    text: 'Write New Story',
    icon: 'fas fa-pen-fancy',
    className: 'btn btn-warning',
    tooltip: 'Write a new story with rich text editor'
  },
  // Editor configuration - using story editor for content creation
  editorConfig: {
    title: 'Story Editor',
    fields: [
      { name: 'title', label: 'Story Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'content', label: 'Story Content', type: 'editor' },
      { name: 'featured_image', label: 'Featured Image', type: 'file' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' }
      ]}
    ]
  },
  editorType: 'story'
});

// Example: System entity that cannot be created
const modulesEntity = createAutoEntity({
  label: 'Modules',
  key: 'modules',
  icon: 'fas fa-puzzle-piece',
  group: 'System',
  description: 'System modules (cannot be created)',
  columns: [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'name', header: 'Module Name', type: 'text' },
    { field: 'type', header: 'Type', type: 'text' },
    { field: 'status', header: 'Status', type: 'text' }
  ],
  // Create button configuration - disabled for system entities
  createButton: {
    show: false, // Cannot create system modules
    text: 'Add New Module',
    icon: 'fas fa-plus',
    className: 'btn btn-secondary',
    tooltip: 'Modules are system entities that cannot be created'
  },
  // Editor configuration - can still edit existing modules
  editorConfig: {
    title: 'Module Editor',
    fields: [
      { name: 'name', label: 'Module Name', type: 'text', required: true, disabled: true },
      { name: 'content', label: 'Content', type: 'editor' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]}
    ]
  },
  editorType: 'page'
});

// Main application
function App() {
  // Create entities - Testing the new system with real backend entities!
  const entities = [
    usersEntity,
    categoriesEntity,
    pagesEntity,
    storiesEntity,
    modulesEntity
  ];
  
  console.log("Entities:", entities);

  return (
    <div className="App">
      <AdminCrudApp entities={entities} />
    </div>
  );
}

export default App;
