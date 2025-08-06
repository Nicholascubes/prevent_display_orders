/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { RefundButton } from "@point_of_sale/app/screens/product_screen/control_buttons/refund_button/refund_button";

patch(RefundButton.prototype, {
    // Override the click method to handle empty orders list
    click() {
        const order = this.pos.get_order();
        const partner = order.get_partner();
        const searchDetails = partner ? { fieldName: "PARTNER", searchTerm: partner.name } : {};
        
        if (this.pos.config.prevent_display_orders) {
            // If prevent_display_orders is enabled, show empty orders list
            console.log("Refund button clicked - showing empty orders list");
            this.pos.showScreen("TicketScreen", {
                ui: { filter: "", searchDetails: {} },
                destinationOrder: order,
            });
        } else {
            // Normal behavior when prevent_display_orders is disabled
            this.pos.showScreen("TicketScreen", {
                ui: { filter: "SYNCED", searchDetails },
                destinationOrder: order,
            });
        }
    }
}) 