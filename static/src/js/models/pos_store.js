import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";
import { _t } from "@web/core/l10n/translation";

patch(PosStore.prototype, {
    _shouldLoadOrders() {
        if (this.config.prevent_display_orders){
            return !this.config.prevent_display_orders
        }
        return super._shouldLoadOrders(...arguments)
    },
    
    // Override the onTicketButtonClick method to show empty orders list when prevent_display_orders is enabled
    async onTicketButtonClick() {
        if (this.isTicketScreenShown) {
            this.closeScreen();
        } else {
            if (this.config.prevent_display_orders) {
                // If prevent_display_orders is enabled, show empty orders list
                console.log("Orders button clicked - showing empty orders list");
                this.showScreen("TicketScreen");
            } else {
                // Call the original method for normal behavior
                return super.onTicketButtonClick();
            }
        }
    }
   
})

