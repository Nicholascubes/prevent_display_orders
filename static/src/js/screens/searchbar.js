import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import {SearchBar} from "@point_of_sale/app/screens/ticket_screen/search_bar/search_bar";

patch(SearchBar.prototype,{
    _onSelectFilter(key) {
        console.log("++++Search Key is Clicked for the search++++")
        this.state.selectedFilter = key;
        this.props.onFilterSelected(this.state.selectedFilter);
    },

    onSearchInputKeyup(event) {
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
            this.state.selectedSearchFieldId = this._fieldIdToSelect(event.key);
        } else if (event.key === "Enter" || this.state.searchInput == "") {
            if (this.state.searchInput !== ""){
                this._onClickSearchField(this.searchFieldsList[this.state.selectedSearchFieldId]);
            } else {
                // When search input is empty, trigger search with empty term
                console.log("Search input is empty - triggering empty search");
                this._onClickSearchField(this.searchFieldsList[this.state.selectedSearchFieldId]);
            }
        } else {
            if (this.state.selectedSearchFieldId === -1 && this.searchFieldsList.length) {
                this.state.selectedSearchFieldId = 0;
            }
            this.state.showSearchFields = true;
        }
    },
    
    // Override onInput to handle real-time search clearing
    onInput(event) {
        // Call the original onInput method first
        super.onInput(event);
        
        // If the input becomes empty, immediately trigger empty search to show no orders
        if (event.target.value.trim() === "") {
            console.log("Input cleared - showing no orders");
            this.props.onSearch({ 
                fieldName: this.searchFieldsList[this.state.selectedSearchFieldId] || this.searchFieldsList[0], 
                searchTerm: "" 
            });
        }
    }
    
   
})