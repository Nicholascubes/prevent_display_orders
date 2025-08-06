import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import {TicketScreen} from "@point_of_sale/app/screens/ticket_screen/ticket_screen";

patch(TicketScreen.prototype,{
    async onFilterSelected(selectedFilter) {
        this.state.filter = selectedFilter;
        
        if (this.pos.config.prevent_display_orders) {
            console.log("Prevent display orders is enabled");
            // When prevent_display_orders is enabled, load orders normally for filters
           
        } else {
            // Normal behavior when prevent_display_orders is disabled
            if (this.state.filter == "SYNCED") {
                await this._fetchSyncedOrders();
            }
        }
    },

    async onSearch(search) {
        this.state.search = search;
        this.state.page = 1;
        if (this.state.filter == "SYNCED") {
            await this._fetchSyncedOrders();
        }
    },
    
    // Override getFilteredOrderList to show no orders when search is empty, filter when search has value
    getFilteredOrderList() {
        if (this.pos.config.prevent_display_orders) {
            // If prevent_display_orders is enabled
            if (this.state.search.searchTerm && this.state.search.searchTerm.trim() !== '') {
                // When there's a search term, filter the results
                console.log("Search term found:", this.state.search.searchTerm, "- filtering orders");
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