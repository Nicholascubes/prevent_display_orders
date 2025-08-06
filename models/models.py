# -*- coding: utf-8 -*-

from odoo import models, fields, api

class PosConfig(models.Model):
    _inherit = "pos.config"
    
    prevent_display_orders = fields.Boolean("Show Empty Orders List by Default")
    
class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"
    
    prevent_display_orders = fields.Boolean(related="pos_config_id.prevent_display_orders",string="Show Empty Orders List by Default", readonly=False)