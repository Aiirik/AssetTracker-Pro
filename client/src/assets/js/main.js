// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.sidebar a');
const assetForm = document.getElementById('asset-form');
const addAssetBtn = document.getElementById('add-asset-btn');
const addAssetBtnTop = document.getElementById('add-asset-btn-top');
const cancelAssetBtn = document.getElementById('cancel-asset');
const generateBarcodeBtn = document.getElementById('generate-barcode');
const addOptionButtons = document.querySelectorAll('.add-option-btn');
const cloneAssetBtn = document.getElementById('clone-asset');
const addUserBtn = document.getElementById('add-user-btn');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show selected page
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.id === page) {
                p.classList.add('active');
            }
        });
    });
});

// Asset button functionality
if (addAssetBtn) {
    addAssetBtn.addEventListener('click', () => {
        // Switch to add asset page
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-page="add-asset"]').classList.add('active');
        
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.id === 'add-asset') {
                p.classList.add('active');
            }
        });
        
        // Reset form
        document.getElementById('asset-form').reset();
        document.getElementById('asset-id').value = '';
        cloneAssetBtn.style.display = 'none';
        document.querySelector('#asset-form .btn-primary').innerHTML = '<i class="fas fa-save"></i> Save Asset';
        document.querySelector('#add-asset .card-header h3').innerHTML = '<i class="fas fa-info-circle"></i> Asset Information';
        
        // Apply field visibility settings
        applyFieldVisibility();
    });
}

if (addAssetBtnTop) {
    addAssetBtnTop.addEventListener('click', () => {
        // Switch to add asset page
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-page="add-asset"]').classList.add('active');
        
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.id === 'add-asset') {
                p.classList.add('active');
            }
        });
        
        // Reset form
        document.getElementById('asset-form').reset();
        document.getElementById('asset-id').value = '';
        cloneAssetBtn.style.display = 'none';
        document.querySelector('#asset-form .btn-primary').innerHTML = '<i class="fas fa-save"></i> Save Asset';
        document.querySelector('#add-asset .card-header h3').innerHTML = '<i class="fas fa-info-circle"></i> Asset Information';
        
        // Apply field visibility settings
        applyFieldVisibility();
    });
}

// User button functionality
if (addUserBtn) {
    addUserBtn.addEventListener('click', () => {
        currentSelectElement = null; // Not adding to a select element
        userModal.style.display = 'block';
    });
}

// Generate barcode
generateBarcodeBtn.addEventListener('click', () => {
    // Get prefix from settings
    const prefixInput = document.getElementById('barcode-prefix');
    const prefix = prefixInput && prefixInput.value.trim() !== '' ? prefixInput.value.trim() : '';
    const randomNum = Math.floor(Math.random() * 1000000);
    document.getElementById('asset-barcode').value = prefix ? `${prefix}-${randomNum}` : `${randomNum}`;
});

// DOM Elements for user modal
const userModal = document.getElementById('user-modal');
const closeUserModal = document.getElementById('close-user-modal');
const cancelUserBtn = document.getElementById('cancel-user');
const userForm = document.getElementById('user-form');

// DOM Elements for option modal
const optionModal = document.getElementById('option-modal');
const closeOptionModal = document.getElementById('close-option-modal');
const cancelOptionBtn = document.getElementById('cancel-option');
const optionForm = document.getElementById('option-form');
const optionModalTitle = document.getElementById('option-modal-title');
const optionNameLabel = document.getElementById('option-name-label');
const optionNameInput = document.getElementById('option-name');

// DOM Elements for filter settings modal
const filterSettingsBtn = document.getElementById('filter-settings-btn');
const filterSettingsModal = document.getElementById('filter-settings-modal');
const closeFilterSettings = document.getElementById('close-filter-settings');
const cancelFilterSettingsBtn = document.getElementById('cancel-filter-settings');
const saveFilterSettingsBtn = document.getElementById('save-filter-settings');
const filterColumnsList = document.getElementById('filter-columns-list');

let currentSelectElement = null;
let currentOptionType = null;

// Add option buttons functionality
addOptionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target.closest('.add-option-btn').dataset.target;
        let selectElement;
        let modalTitle;
        let fieldName;
        
        switch(target) {
            case 'make':
                selectElement = document.getElementById('asset-make');
                modalTitle = 'Add New Make';
                fieldName = 'Make';
                break;
            case 'model':
                selectElement = document.getElementById('asset-model');
                modalTitle = 'Add New Model';
                fieldName = 'Model';
                break;
            case 'category':
                selectElement = document.getElementById('asset-category');
                modalTitle = 'Add New Category';
                fieldName = 'Category';
                break;
            case 'location':
                selectElement = document.getElementById('asset-location');
                modalTitle = 'Add New Location';
                fieldName = 'Location';
                break;
            case 'assigned-to':
                // For assigned-to, show the user creation modal
                currentSelectElement = document.getElementById('asset-assigned-to');
                userModal.style.display = 'block';
                return;
            default:
                return;
        }
        
        // Set up the option modal
        currentSelectElement = selectElement;
        currentOptionType = target;
        optionModalTitle.textContent = modalTitle;
        optionNameLabel.textContent = `${fieldName} Name *`;
        optionNameInput.placeholder = `Enter ${fieldName.toLowerCase()} name`;
        optionNameInput.value = '';
        optionModal.style.display = 'block';
    });
});

// User modal functionality
closeUserModal.addEventListener('click', () => {
    userModal.style.display = 'none';
    userForm.reset();
});

cancelUserBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
    userForm.reset();
});

// Option modal functionality
closeOptionModal.addEventListener('click', () => {
    optionModal.style.display = 'none';
    optionForm.reset();
});

cancelOptionBtn.addEventListener('click', () => {
    optionModal.style.display = 'none';
    optionForm.reset();
});

// Filter settings modal functionality
if (filterSettingsBtn) {
    filterSettingsBtn.addEventListener('click', () => {
        // Populate filter columns list
        populateFilterColumnsList();
        filterSettingsModal.style.display = 'block';
    });
}

closeFilterSettings.addEventListener('click', () => {
    filterSettingsModal.style.display = 'none';
});

cancelFilterSettingsBtn.addEventListener('click', () => {
    filterSettingsModal.style.display = 'none';
});

saveFilterSettingsBtn.addEventListener('click', () => {
    saveFilterSettings();
    filterSettingsModal.style.display = 'none';
    // Refresh asset table with new settings
    loadAssetsFromLocalStorage();
});

window.addEventListener('click', (e) => {
    if (e.target === userModal) {
        userModal.style.display = 'none';
        userForm.reset();
    } else if (e.target === optionModal) {
        optionModal.style.display = 'none';
        optionForm.reset();
    } else if (e.target === filterSettingsModal) {
        filterSettingsModal.style.display = 'none';
    }
});

// User form submission
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('user-first-name').value;
    const lastName = document.getElementById('user-last-name').value;
    const department = document.getElementById('user-department').value;
    const email = document.getElementById('user-email').value;
    
    if (firstName && lastName) {
        const fullName = `${firstName} ${lastName}`;
        const value = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
        
        // Check if we're editing an existing user
        const editId = userForm.dataset.editId;
        
        // If we're adding to a select element (from asset form)
        if (currentSelectElement && !editId) {
            // Create new option
            const newOption = document.createElement('option');
            newOption.value = value;
            newOption.textContent = department ? `${fullName} (${department})` : fullName;
            currentSelectElement.appendChild(newOption);
            
            // Select the new option
            currentSelectElement.value = newOption.value;
        }
        
        // Save user to localStorage for the users section
        saveUserToLocalStorage({
            id: editId || value, // Use existing ID if editing
            firstName,
            lastName,
            department,
            email
        });
        
        // Refresh users table if on users page
        if (document.getElementById('users').classList.contains('active')) {
            loadUsersFromLocalStorage();
        } else {
            // Update assigned-to dropdown
            const users = JSON.parse(localStorage.getItem('users')) || [];
            updateAssignedToDropdown(users);
            
            // Also update the users table if we're on the assets page (in case we're viewing a user's assets)
            if (document.getElementById('assets').classList.contains('active')) {
                loadAssetsFromLocalStorage();
            }
        }
        
        // Close modal and reset form
        userModal.style.display = 'none';
        userForm.reset();
        delete userForm.dataset.editId; // Clear edit ID
    }
});

// Option form submission
optionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const optionName = document.getElementById('option-name').value;
    
    if (optionName && currentSelectElement) {
        // Create new option
        const newOption = document.createElement('option');
        newOption.value = optionName.toLowerCase().replace(/\s+/g, '-');
        newOption.textContent = optionName;
        currentSelectElement.appendChild(newOption);
        
        // Select the new option
        currentSelectElement.value = newOption.value;
        
        // Save the option to localStorage for future use
        if (currentOptionType) {
            let options = JSON.parse(localStorage.getItem(`${currentOptionType}s`)) || [];
            // Check if option already exists
            if (!options.includes(optionName)) {
                options.push(optionName);
                localStorage.setItem(`${currentOptionType}s`, JSON.stringify(options));
            }
        }
        
        // Close modal and reset form
        optionModal.style.display = 'none';
        optionForm.reset();
    }
});

// Form submission
assetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    const assetData = {
        id: document.getElementById('asset-id').value || Date.now().toString(),
        name: document.getElementById('asset-name').value,
        make: document.getElementById('asset-make').value,
        model: document.getElementById('asset-model').value,
        description: document.getElementById('asset-description').value,
        category: document.getElementById('asset-category').value,
        barcode: document.getElementById('asset-barcode').value,
        serialNumber: document.getElementById('asset-serial').value,
        purchaseDate: document.getElementById('asset-purchase-date').value,
        purchasePrice: document.getElementById('asset-purchase-price').value,
        currentValue: document.getElementById('asset-current-value').value,
        depreciation: document.getElementById('asset-depreciation').value || 0,
        location: document.getElementById('asset-location').value,
        assignedTo: document.getElementById('asset-assigned-to').value,
        status: document.getElementById('asset-status').value,
        condition: document.getElementById('asset-condition').value
    };
    
    // Check for duplicate barcode
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    const isDuplicate = assets.some(asset => asset.barcode === assetData.barcode && asset.id !== assetData.id);
    
    if (isDuplicate) {
        alert('An asset with this barcode already exists. Please use a unique barcode.');
        return;
    }
    
    // For offline demo, save to localStorage
    saveAssetToLocalStorage(assetData);
    
    // Show success message
    alert('Asset saved successfully!');
    
    // Show clone button for existing assets
    if (assetData.id) {
        cloneAssetBtn.style.display = 'inline-flex';
    }
    
    // Reset form and switch to assets page
    assetForm.reset();
    document.getElementById('asset-id').value = '';
    
    // Switch to assets page
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="assets"]').classList.add('active');
    
    pages.forEach(p => {
        p.classList.remove('active');
        if (p.id === 'assets') {
            p.classList.add('active');
        }
    });
    
    loadAssetsFromLocalStorage();
    updateDashboardStats();
});

// Function to update asset list (demo only)
function updateAssetList(asset) {
    // This is a simplified example
    // In a real app, you would fetch updated data from the server
    console.log('Asset data:', asset);
    
    // Add to recent assets table
    const tbody = document.querySelector('#recent-assets-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${asset.name} (${asset.make} ${asset.model})</td>
        <td>${asset.category}</td>
        <td>${asset.barcode}</td>
        <td><span class="badge badge-${asset.status}">${asset.status}</span></td>
        <td>
            <button class="btn btn-small" onclick="editAsset('${asset.id}')">Edit</button>
            <button class="btn btn-small btn-secondary" onclick="disposeAsset('${asset.id}')">Dispose</button>
        </td>
    `;
    tbody.appendChild(row);
    
    // Also update main assets table
    const assetsTbody = document.querySelector('#assets-table tbody');
    const assetRow = document.createElement('tr');
    assetRow.innerHTML = `
        <td>${asset.name} (${asset.make} ${asset.model})</td>
        <td>${asset.category}</td>
        <td>${asset.barcode}</td>
        <td>${asset.purchaseDate}</td>
        <td>$${parseFloat(asset.currentValue).toFixed(2)}</td>
        <td><span class="badge badge-${asset.status}">${asset.status}</span></td>
        <td>
            <button class="btn btn-small" onclick="editAsset('${asset.id}')">Edit</button>
            <button class="btn btn-small btn-secondary" onclick="disposeAsset('${asset.id}')">Dispose</button>
        </td>
    `;
    assetsTbody.appendChild(assetRow);
}

// Save asset to localStorage
function saveAssetToLocalStorage(asset) {
    let assets = JSON.parse(localStorage.getItem('assets')) || [];
    const existingIndex = assets.findIndex(a => a.id === asset.id);
    
    if (existingIndex >= 0) {
        assets[existingIndex] = asset;
    } else {
        assets.push(asset);
    }
    
    localStorage.setItem('assets', JSON.stringify(assets));
}

// Save user to localStorage
function saveUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
}

// Load assets from localStorage
function loadAssetsFromLocalStorage() {
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    
    // Update assets tables
    updateAssetsTable(assets);
    
    return assets;
}

// Update assets table with provided assets data
function updateAssetsTable(assets) {
    // Get column configuration
    const defaultColumns = [
        { id: 'name', label: 'Name', visible: true },
        { id: 'category', label: 'Category', visible: true },
        { id: 'barcode', label: 'Barcode', visible: true },
        { id: 'purchaseDate', label: 'Purchase Date', visible: true },
        { id: 'value', label: 'Value', visible: true },
        { id: 'status', label: 'Status', visible: true },
        { id: 'actions', label: 'Actions', visible: true }
    ];
    
    const columns = JSON.parse(localStorage.getItem('assetColumns')) || defaultColumns;
    
    // Update recent assets table header
    const recentThead = document.querySelector('#recent-assets-table thead');
    if (recentThead) {
        const headerRow = document.createElement('tr');
        columns.forEach(column => {
            if (column.visible) {
                const th = document.createElement('th');
                th.textContent = column.label;
                headerRow.appendChild(th);
            }
        });
        recentThead.innerHTML = '';
        recentThead.appendChild(headerRow);
    }
    
    // Update recent assets table
    const recentTbody = document.querySelector('#recent-assets-table tbody');
    if (recentTbody) {
        recentTbody.innerHTML = '';
        
        // Show only the first 5 assets in recent table
        const recentAssets = assets.slice(0, 5);
        recentAssets.forEach(asset => {
            const recentRow = document.createElement('tr');
            let rowHtml = '';
            
            columns.forEach(column => {
                if (column.visible) {
                    switch (column.id) {
                        case 'name':
                            rowHtml += `<td>${asset.name}</td>`;
                            break;
                        case 'category':
                            rowHtml += `<td>${asset.category}</td>`;
                            break;
                        case 'barcode':
                            rowHtml += `<td>${asset.barcode}</td>`;
                            break;
                        case 'purchaseDate':
                            rowHtml += `<td>${asset.purchaseDate}</td>`;
                            break;
                        case 'value':
                            rowHtml += `<td>$${parseFloat(asset.currentValue).toFixed(2)}</td>`;
                            break;
                        case 'status':
                            rowHtml += `<td><span class="badge badge-${asset.status}">${asset.status}</span></td>`;
                            break;
                        case 'actions':
                            rowHtml += `
                                <td>
                                    <button class="btn btn-small" onclick="editAsset('${asset.id}')">Edit</button>
                                    <button class="btn btn-small btn-secondary" onclick="disposeAsset('${asset.id}')">Dispose</button>
                                </td>
                            `;
                            break;
                    }
                }
            });
            
            recentRow.innerHTML = rowHtml;
            recentTbody.appendChild(recentRow);
        });
    }
    
    // Update main assets table header
    const assetsThead = document.querySelector('#assets-table thead');
    if (assetsThead) {
        const headerRow = document.createElement('tr');
        columns.forEach(column => {
            if (column.visible) {
                const th = document.createElement('th');
                th.textContent = column.label;
                headerRow.appendChild(th);
            }
        });
        assetsThead.innerHTML = '';
        assetsThead.appendChild(headerRow);
    }
    
    // Update main assets table
    const assetsTbody = document.querySelector('#assets-table tbody');
    if (assetsTbody) {
        assetsTbody.innerHTML = '';
        
        assets.forEach(asset => {
            const assetRow = document.createElement('tr');
            let rowHtml = '';
            
            columns.forEach(column => {
                if (column.visible) {
                    switch (column.id) {
                        case 'name':
                            rowHtml += `<td>${asset.name}</td>`;
                            break;
                        case 'category':
                            rowHtml += `<td>${asset.category}</td>`;
                            break;
                        case 'barcode':
                            rowHtml += `<td>${asset.barcode}</td>`;
                            break;
                        case 'purchaseDate':
                            rowHtml += `<td>${asset.purchaseDate}</td>`;
                            break;
                        case 'value':
                            rowHtml += `<td>$${parseFloat(asset.currentValue).toFixed(2)}</td>`;
                            break;
                        case 'status':
                            rowHtml += `<td><span class="badge badge-${asset.status}">${asset.status}</span></td>`;
                            break;
                        case 'actions':
                            rowHtml += `
                                <td>
                                    <button class="btn btn-small" onclick="editAsset('${asset.id}')">Edit</button>
                                    <button class="btn btn-small btn-secondary" onclick="disposeAsset('${asset.id}')">Dispose</button>
                                </td>
                            `;
                            break;
                    }
                }
            });
            
            assetRow.innerHTML = rowHtml;
            assetsTbody.appendChild(assetRow);
        });
    }
}

// Load users from localStorage
function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    
    // Update users table
    updateUsersTable(users, assets);
    
    // Update assigned-to dropdown in asset form
    updateAssignedToDropdown(users);
    
    return users;
}

// Update users table with provided users data
function updateUsersTable(users, assets = null) {
    // If assets not provided, load from localStorage
    if (!assets) {
        assets = JSON.parse(localStorage.getItem('assets')) || [];
    }
    
    const usersTbody = document.querySelector('#users-table tbody');
    if (usersTbody) {
        usersTbody.innerHTML = '';
        
        users.forEach(user => {
            // Count assets assigned to this user
            const assignedAssets = assets.filter(asset => asset.assignedTo === user.id).length;
            
            // Check name display setting
            const displayFirstLast = localStorage.getItem('displayFirstLast') === 'true';
            const displayName = displayFirstLast ? 
                `${user.firstName} ${user.lastName}` : 
                `${user.lastName}, ${user.firstName}`;
            
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td><span class="user-link" data-user-id="${user.id}">${displayName}</span></td>
                <td>${user.department || ''}</td>
                <td>${user.email || ''}</td>
                <td>${assignedAssets}</td>
                <td>
                    <button class="btn btn-small" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-small btn-secondary" onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            `;
            usersTbody.appendChild(userRow);
            
            // Add click event to user name
            const userLink = userRow.querySelector('.user-link');
            if (userLink) {
                userLink.addEventListener('click', () => {
                    showUserAssets(user.id);
                });
            }
        });
    }
}

// Update assigned-to dropdown with users
function updateAssignedToDropdown(users) {
    const assignedToSelect = document.getElementById('asset-assigned-to');
    if (assignedToSelect) {
        // Clear existing options except the first one
        while (assignedToSelect.children.length > 1) {
            assignedToSelect.removeChild(assignedToSelect.lastChild);
        }
        
        // Check name display setting
        const displayFirstLast = localStorage.getItem('displayFirstLast') === 'true';
        
        // Sort users alphabetically
        const sortedUsers = [...users].sort((a, b) => {
            let aName, bName;
            if (displayFirstLast) {
                aName = `${a.firstName} ${a.lastName}`.toLowerCase();
                bName = `${b.firstName} ${b.lastName}`.toLowerCase();
            } else {
                aName = `${a.lastName}, ${a.firstName}`.toLowerCase();
                bName = `${b.lastName}, ${b.firstName}`.toLowerCase();
            }
            return aName.localeCompare(bName);
        });
        
        // Add users as options
        sortedUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            
            let displayName;
            if (displayFirstLast) {
                displayName = user.department ? 
                    `${user.firstName} ${user.lastName} (${user.department})` : 
                    `${user.firstName} ${user.lastName}`;
            } else {
                displayName = user.department ? 
                    `${user.lastName}, ${user.firstName} (${user.department})` : 
                    `${user.lastName}, ${user.firstName}`;
            }
            
            option.textContent = displayName;
            assignedToSelect.appendChild(option);
        });
    }
}

// Update dashboard stats
function updateDashboardStats() {
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    document.getElementById('total-assets').textContent = assets.length;
    document.getElementById('active-assets').textContent = assets.filter(a => a.status === 'active').length;
    document.getElementById('disposed-assets').textContent = assets.filter(a => a.status === 'disposed').length;
    
    // Update maintenance count
    const maintenanceCount = assets.filter(a => a.status === 'maintenance').length;
    if (document.getElementById('maintenance-assets')) {
        document.getElementById('maintenance-assets').textContent = maintenanceCount;
    }
    
    // Update total value
    const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.currentValue || 0), 0);
    if (document.getElementById('total-value')) {
        document.getElementById('total-value').textContent = `$${totalValue.toFixed(2)}`;
    }
}

// Edit asset
function editAsset(id) {
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    const asset = assets.find(a => a.id === id);
    
    if (asset) {
        document.getElementById('asset-id').value = asset.id;
        document.getElementById('asset-name').value = asset.name;
        document.getElementById('asset-make').value = asset.make || '';
        document.getElementById('asset-model').value = asset.model || '';
        document.getElementById('asset-description').value = asset.description || '';
        document.getElementById('asset-category').value = asset.category;
        document.getElementById('asset-barcode').value = asset.barcode;
        document.getElementById('asset-serial').value = asset.serialNumber || '';
        document.getElementById('asset-purchase-date').value = asset.purchaseDate || '';
        document.getElementById('asset-purchase-price').value = asset.purchasePrice || '';
        document.getElementById('asset-current-value').value = asset.currentValue || '';
        document.getElementById('asset-depreciation').value = asset.depreciation || '';
        document.getElementById('asset-location').value = asset.location || '';
        document.getElementById('asset-assigned-to').value = asset.assignedTo || '';
        document.getElementById('asset-status').value = asset.status;
        document.getElementById('asset-condition').value = asset.condition;
        
        // Switch to add asset page with edit mode
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-page="add-asset"]').classList.add('active');
        
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.id === 'add-asset') {
                p.classList.add('active');
            }
        });
        
        document.querySelector('#add-asset .card-header h3').innerHTML = '<i class="fas fa-edit"></i> Edit Asset';
        
        // Show clone button
        cloneAssetBtn.style.display = 'inline-flex';
        document.querySelector('#asset-form .btn-primary').innerHTML = '<i class="fas fa-save"></i> Update Asset';
        
        // Apply field visibility settings
        applyFieldVisibility();
    }
}

// Dispose asset
function disposeAsset(id) {
    if (confirm('Are you sure you want to dispose this asset?')) {
        let assets = JSON.parse(localStorage.getItem('assets')) || [];
        assets = assets.map(asset => {
            if (asset.id === id) {
                return {...asset, status: 'disposed'};
            }
            return asset;
        });
        
        localStorage.setItem('assets', JSON.stringify(assets));
        loadAssetsFromLocalStorage();
        updateDashboardStats();
    }
}

// Edit user
function editUser(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id);
    
    if (user) {
        // Fill the user form with existing data
        document.getElementById('user-first-name').value = user.firstName;
        document.getElementById('user-last-name').value = user.lastName;
        document.getElementById('user-department').value = user.department || '';
        document.getElementById('user-email').value = user.email || '';
        
        // Set currentSelectElement to null since we're editing
        currentSelectElement = null;
        
        // Show the modal
        userModal.style.display = 'block';
        
        // Store the user ID for update
        document.getElementById('user-form').dataset.editId = id;
    }
}

// Show user assets
function showUserAssets(userId) {
    // Switch to assets page
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="assets"]').classList.add('active');
    
    pages.forEach(p => {
        p.classList.remove('active');
        if (p.id === 'assets') {
            p.classList.add('active');
        }
    });
    
    // Filter assets by user
    const assets = JSON.parse(localStorage.getItem('assets')) || [];
    const userAssets = assets.filter(asset => asset.assignedTo === userId);
    
    // Update assets table with user's assets
    updateAssetsTable(userAssets);
    
    // Show a message indicating we're viewing a specific user's assets
    const assetsHeader = document.querySelector('#assets .page-header h2');
    if (assetsHeader) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === userId);
        if (user) {
            assetsHeader.innerHTML = `<i class="fas fa-list"></i> Assets assigned to ${user.firstName} ${user.lastName}`;
        }
    }
}

// Delete user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.id !== id);
        
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersFromLocalStorage();
        
        // Update assigned-to dropdown
        updateAssignedToDropdown(users);
    }
}

// Initialize dashboard stats (demo only)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with sample users if none exist
    if (!localStorage.getItem('users')) {
        const sampleUsers = [
            { id: 'john-doe', firstName: 'John', lastName: 'Doe', department: 'IT', email: 'john.doe@company.com' },
            { id: 'jane-smith', firstName: 'Jane', lastName: 'Smith', department: 'HR', email: 'jane.smith@company.com' },
            { id: 'mike-johnson', firstName: 'Mike', lastName: 'Johnson', department: 'Finance', email: 'mike.johnson@company.com' }
        ];
        localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
    
    loadAssetsFromLocalStorage();
    loadUsersFromLocalStorage();
    updateDashboardStats();
    
    // Initialize assigned-to dropdown
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateAssignedToDropdown(users);
});

// Export functionality (demo only)
const exportCsvBtn = document.getElementById('export-csv');
const exportPdfBtn = document.getElementById('export-pdf');

if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
        alert('CSV export would be initiated in a real application.');
    });
}

if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => {
        alert('PDF export would be initiated in a real application.');
    });
}

// Settings form submission (demo only)
const saveSettingsBtn = document.getElementById('save-settings');
const showCurrentValueCheckbox = document.getElementById('show-current-value');
const showDepreciationCheckbox = document.getElementById('show-depreciation');
const autoGenerateBarcodeCheckbox = document.getElementById('auto-generate-barcode');
const displayFirstLastCheckbox = document.getElementById('display-first-last');

// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings from localStorage or set defaults
    let showCurrentValue = localStorage.getItem('showCurrentValue');
    let showDepreciation = localStorage.getItem('showDepreciation');
    let autoGenerateBarcode = localStorage.getItem('autoGenerateBarcode');
    let displayFirstLast = localStorage.getItem('displayFirstLast');
    
    // Set defaults if not previously set
    if (showCurrentValue === null) {
        showCurrentValue = 'false';
        localStorage.setItem('showCurrentValue', showCurrentValue);
    }
    
    if (showDepreciation === null) {
        showDepreciation = 'false';
        localStorage.setItem('showDepreciation', showDepreciation);
    }
    
    if (autoGenerateBarcode === null) {
        autoGenerateBarcode = 'false';
        localStorage.setItem('autoGenerateBarcode', autoGenerateBarcode);
    }
    
    if (displayFirstLast === null) {
        displayFirstLast = 'false';
        localStorage.setItem('displayFirstLast', displayFirstLast);
    }
    
    // Set checkbox states
    if (showCurrentValueCheckbox) {
        showCurrentValueCheckbox.checked = showCurrentValue === 'true';
    }
    if (showDepreciationCheckbox) {
        showDepreciationCheckbox.checked = showDepreciation === 'true';
    }
    if (autoGenerateBarcodeCheckbox) {
        autoGenerateBarcodeCheckbox.checked = autoGenerateBarcode === 'true';
    }
    if (displayFirstLastCheckbox) {
        displayFirstLastCheckbox.checked = displayFirstLast === 'true';
    }
    
    // Populate dropdowns with saved options
    populateDropdowns();
    
    // Initialize search functionality
    initSearch();
    
    // Apply settings
    applyFieldVisibility();
});

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Save settings to localStorage
        if (showCurrentValueCheckbox) {
            localStorage.setItem('showCurrentValue', showCurrentValueCheckbox.checked);
        }
        if (showDepreciationCheckbox) {
            localStorage.setItem('showDepreciation', showDepreciationCheckbox.checked);
        }
        if (autoGenerateBarcodeCheckbox) {
            localStorage.setItem('autoGenerateBarcode', autoGenerateBarcodeCheckbox.checked);
        }
        if (displayFirstLastCheckbox) {
            localStorage.setItem('displayFirstLast', displayFirstLastCheckbox.checked);
        }
        
        // Apply settings
        applyFieldVisibility();
        
        // Refresh user lists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        updateAssignedToDropdown(users);
        loadUsersFromLocalStorage();
        
        alert('Settings saved successfully!');
    });
}

// Populate dropdowns with saved options
function populateDropdowns() {
    // Populate makes dropdown
    const makeSelect = document.getElementById('asset-make');
    if (makeSelect) {
        const makes = JSON.parse(localStorage.getItem('makes')) || [];
        // Sort alphabetically
        makes.sort((a, b) => a.localeCompare(b));
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make.toLowerCase().replace(/\s+/g, '-');
            option.textContent = make;
            makeSelect.appendChild(option);
        });
    }
    
    // Populate models dropdown
    const modelSelect = document.getElementById('asset-model');
    if (modelSelect) {
        const models = JSON.parse(localStorage.getItem('models')) || [];
        // Sort alphabetically
        models.sort((a, b) => a.localeCompare(b));
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase().replace(/\s+/g, '-');
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
    
    // Populate categories dropdown
    const categorySelect = document.getElementById('asset-category');
    if (categorySelect) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        // Sort alphabetically
        categories.sort((a, b) => a.localeCompare(b));
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase().replace(/\s+/g, '-');
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
    
    // Populate locations dropdown
    const locationSelect = document.getElementById('asset-location');
    if (locationSelect) {
        const locations = JSON.parse(localStorage.getItem('locations')) || [];
        // Sort alphabetically
        locations.sort((a, b) => a.localeCompare(b));
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location.toLowerCase().replace(/\s+/g, '-');
            option.textContent = location;
            locationSelect.appendChild(option);
        });
    }
}

// Populate filter columns list for settings modal
function populateFilterColumnsList() {
    if (!filterColumnsList) return;
    
    // Default column configuration
    const defaultColumns = [
        { id: 'name', label: 'Name', visible: true },
        { id: 'category', label: 'Category', visible: true },
        { id: 'barcode', label: 'Barcode', visible: true },
        { id: 'purchaseDate', label: 'Purchase Date', visible: true },
        { id: 'value', label: 'Value', visible: true },
        { id: 'status', label: 'Status', visible: true },
        { id: 'actions', label: 'Actions', visible: true }
    ];
    
    // Get saved column configuration or use default
    let savedColumns = JSON.parse(localStorage.getItem('assetColumns')) || defaultColumns;
    
    // Clear existing list
    filterColumnsList.innerHTML = '';
    
    // Add columns to list
    savedColumns.forEach((column, index) => {
        const li = document.createElement('li');
        li.className = 'filter-column-item';
        li.innerHTML = `
            <div style="display: flex; align-items: center; padding: 0.5rem; border: 1px solid #ddd; margin-bottom: 0.5rem;">
                <span style="cursor: move; margin-right: 1rem;">â˜°</span>
                <input type="checkbox" id="column-${column.id}" ${column.visible ? 'checked' : ''} style="margin-right: 0.5rem;">
                <label for="column-${column.id}" style="margin: 0;">${column.label}</label>
                <input type="hidden" class="column-id" value="${column.id}">
            </div>
        `;
        filterColumnsList.appendChild(li);
    });
}

// Save filter settings
function saveFilterSettings() {
    if (!filterColumnsList) return;
    
    const columns = [];
    const items = filterColumnsList.querySelectorAll('.filter-column-item');
    
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const columnId = item.querySelector('.column-id').value;
        const label = item.querySelector('label').textContent;
        
        columns.push({
            id: columnId,
            label: label,
            visible: checkbox.checked
        });
    });
    
    // Save to localStorage
    localStorage.setItem('assetColumns', JSON.stringify(columns));
}

// Initialize search functionality
function initSearch() {
    const searchUsersInput = document.getElementById('search-users');
    if (searchUsersInput) {
        searchUsersInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const filteredUsers = users.filter(user => 
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                (user.department && user.department.toLowerCase().includes(searchTerm)) ||
                (user.email && user.email.toLowerCase().includes(searchTerm))
            );
            
            // Update the users table with filtered results
            updateUsersTable(filteredUsers);
        });
    }
    
    const searchAssetsInput = document.getElementById('search-assets');
    if (searchAssetsInput) {
        searchAssetsInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const assets = JSON.parse(localStorage.getItem('assets')) || [];
            const filteredAssets = assets.filter(asset => 
                (asset.name && asset.name.toLowerCase().includes(searchTerm)) ||
                (asset.make && asset.make.toLowerCase().includes(searchTerm)) ||
                (asset.model && asset.model.toLowerCase().includes(searchTerm)) ||
                (asset.category && asset.category.toLowerCase().includes(searchTerm)) ||
                (asset.barcode && asset.barcode.toLowerCase().includes(searchTerm))
            );
            
            // Update the assets table with filtered results
            updateAssetsTable(filteredAssets);
        });
    }
}

// Apply field visibility based on settings
function applyFieldVisibility() {
    const showCurrentValue = localStorage.getItem('showCurrentValue') === 'true';
    const showDepreciation = localStorage.getItem('showDepreciation') === 'true';
    const autoGenerateBarcode = localStorage.getItem('autoGenerateBarcode') === 'true';
    
    const currentValueGroup = document.getElementById('current-value-group');
    const depreciationGroup = document.getElementById('depreciation-group');
    const generateBarcodeBtn = document.getElementById('generate-barcode');
    
    if (currentValueGroup) {
        currentValueGroup.style.display = showCurrentValue ? 'block' : 'none';
    }
    
    if (depreciationGroup) {
        depreciationGroup.style.display = showDepreciation ? 'block' : 'none';
    }
    
    // Show/hide generate barcode button based on setting
    if (generateBarcodeBtn) {
        generateBarcodeBtn.style.display = autoGenerateBarcode ? 'inline-block' : 'none';
    }
}

// Cancel asset form
cancelAssetBtn.addEventListener('click', () => {
    assetForm.reset();
    document.getElementById('asset-id').value = '';
    cloneAssetBtn.style.display = 'none';
    
    // Switch to assets page
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="assets"]').classList.add('active');
    
    pages.forEach(p => {
        p.classList.remove('active');
        if (p.id === 'assets') {
            p.classList.add('active');
        }
    });
});

// Clone asset functionality
cloneAssetBtn.addEventListener('click', () => {
    // Clear the asset ID to create a new asset
    document.getElementById('asset-id').value = '';
    
    // Clear barcode and serial number for the new asset
    document.getElementById('asset-barcode').value = '';
    document.getElementById('asset-serial').value = '';
    
    // Change form title
    document.querySelector('#add-asset .card-header h3').innerHTML = '<i class="fas fa-clone"></i> Clone Asset';
    
    // Change submit button text
    document.querySelector('#asset-form .btn-primary').innerHTML = '<i class="fas fa-save"></i> Save Cloned Asset';
    
    alert('Asset cloned successfully! Please update the barcode and serial number for the new asset.');
});