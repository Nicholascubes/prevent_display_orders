/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import {TicketScreen} from "@point_of_sale/app/screens/ticket_screen/ticket_screen";

patch(TicketScreen.prototype,{
    async onFilterSelected(selectedFilter) {
        this._state.ui.filter = selectedFilter;
        
        if (this.pos.config.prevent_display_orders) {
            console.log("Prevent display orders is enabled");
            // When prevent_display_orders is enabled, load orders normally for filters
           
        } else {
            // Normal behavior when prevent_display_orders is disabled
            if (this._state.ui.filter == "SYNCED") {
                await this._fetchSyncedOrders();
            }
        }
    },

    async onSearch(search) {
        Object.assign(this._state.ui.searchDetails, search);
        this._state.syncedOrders.currentPage = 1;
        if (this._state.ui.filter == "SYNCED") {
            await this._fetchSyncedOrders();
        }
    },
    
    // Override getFilteredOrderList to show no orders when search is empty, filter when search has value
    getFilteredOrderList() {
        if (this.pos.config.prevent_display_orders) {
            // If prevent_display_orders is enabled
            if (this._state.ui.searchDetails.searchTerm && this._state.ui.searchDetails.searchTerm.trim() !== '') {
                // When there's a search term, filter the results
                console.log("Search term found:", this._state.ui.searchDetails.searchTerm, "- filtering orders");
                return super.getFilteredOrderList();
            } else {
                // When search is empty, show no orders
                console.log("No search term - showing no orders");
                return [];
            }
        } else {
            // Normal behavior when prevent_display_orders is disabled
            return super.getFilteredOrderList();
        }
    }
    
    
})