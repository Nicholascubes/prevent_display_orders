/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { _t } from "@web/core/l10n/translation";

patch(Navbar.prototype, {
    _shouldLoadOrders() {
        if (this.pos.config.prevent_display_orders){
            return !this.pos.config.prevent_display_orders
        }
        return super._shouldLoadOrders(...arguments)
    },
    
    // Override the onTicketButtonClick method to show empty orders list when prevent_display_orders is enabled
    async onTicketButtonClick() {
        if (this.isTicketScreenShown) {
            this.pos.closeScreen();
        } else {
            if (this.pos.config.prevent_display_orders) {
                // If prevent_display_orders is enabled, show empty orders list
                console.log("Orders button clicked - showing empty orders list");
                this.pos.showScreen("TicketScreen");
            } else {
                // Call the original method for normal behavior
                return super.onTicketButtonClick();
            }
        }
    }
   
})

