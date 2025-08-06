# Prevent Display Orders - Odoo Point of Sale Module

## Overview

This Odoo module modifies the Point of Sale (POS) behavior to show an empty orders list by default. Users must search for specific orders to display them, providing better control over order visibility and improved performance by not loading all orders initially.

## Features

- **Empty Orders List by Default**: When users click on the Orders button or Refund button, no orders are displayed initially
- **Search-Only Display**: Orders are only displayed when users actively search for them
- **Search Functionality**: Users can search for orders by:
  - Order name/number
  - Customer name
  - Order amount
  - Order date
  - POS reference
- **Real-time Search Clearing**: When the search box is cleared, orders list becomes empty immediately
- **Isolated Search Results**: Each search shows only results for that specific search term, not retained from previous searches
- **Configurable**: Can be enabled/disabled per POS configuration
- **Performance Improvement**: Reduces initial load time by not loading all orders at once

## Installation

1. Place this module in your Odoo addons directory
2. Update the addons list in Odoo
3. Install the module
4. Configure the setting in Point of Sale configuration

## Configuration

1. Go to **Point of Sale** → **Configuration** → **Point of Sale**
2. Select your POS configuration
3. In the **Interface** section, enable **"Show Empty Orders List by Default"**
4. Save the configuration

## Usage

### When the feature is enabled:

1. **Orders Button**: Clicking the Orders button will show an empty orders list
2. **Refund Button**: Clicking the Refund button will also show an empty orders list
3. **Search**: Use the search bar to find specific orders by:
   - Typing part of the order number (shows only matching orders)
   - Customer name (shows only matching orders)
   - Order amount (shows only matching orders)
   - Date (shows only matching orders)
   - POS reference (shows only matching orders)
4. **Clear Search**: Clearing the search box will immediately show an empty orders list

### When the feature is disabled:

- Normal POS behavior is maintained
- All orders are loaded and displayed as usual

## Technical Details

### Files Modified/Created:

- `models/models.py`: Adds configuration field to POS config
- `views/views.xml`: Adds configuration option to POS settings
- `static/src/js/models/pos_store.js`: Modifies order loading behavior and ticket button click
- `static/src/js/screens/ticket_screen.js`: Handles orders screen behavior and search
- `static/src/js/screens/searchbar.js`: Enhances search functionality
- `static/src/js/screens/control_buttons.js`: Handles refund button click

### Key Methods:

- `_shouldLoadOrders()`: Returns false to prevent automatic order loading
- `onTicketButtonClick()`: Handles orders button click to show empty orders list
- `loadOrdersForSearch()`: Loads orders when search is performed
- `_loadOrdersWithSearch()`: Filters orders based on search criteria
- `onSearch()`: Handles search events in ticket screen
- `clickRefund()`: Handles refund button click to show empty orders list

## Compatibility

- Odoo 18.0
- Point of Sale module

## Support

For issues or questions, please contact the development team.

## License

This module is provided as-is for educational and business use. 