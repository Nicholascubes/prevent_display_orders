# -*- coding: utf-8 -*-
{
    'name': "prevent_display_orders",

    'summary': "A module to show empty orders list by default and enable search functionality",

    'description': """
        A module that prevents displaying all orders by default in Point of Sale.
        When users click on orders or refund buttons, the orders list is empty.
        Users can search for specific orders to display them.
    """,

    'author': "Nicholas Cubes",
    'website': "https://www.cubes.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Point of Sale',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','point_of_sale'],

    # always loaded
    'data': [
       
        'views/views.xml',
        'views/templates.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'prevent_display_orders/static/src/js/models/pos_store.js',
            'prevent_display_orders/static/src/js/screens/ticket_screen.js',
            'prevent_display_orders/static/src/js/screens/searchbar.js',
            'prevent_display_orders/static/src/js/screens/control_buttons.js',
            
        ],
    },
    
}

