import React, { useState } from 'react'

// We should be able to filter by:
// - PR status (Draft/Open/Closed).
// - Labels.

// We should be able to sort(asc/desc) by:
// - PR number.
// - Title.
export default function FilterAndSort({ onStatusFilterSelected, onSortByOptionClicked, labels }) {

  const PRStatusOptions = [
    { value: 'all', displayName: 'All' },
    { value: 'open', displayName: 'Open' },
    { value: 'draft', displayName: 'Draft' },
    { value: 'closed', displayName: 'Closed' },
  ];

  const sortByValOptions = [
    { value: 'prNumber', asc: false },
    { value: 'title', asc: false },
  ];

  const [selectedPRStatus, setSelectedPRStatus] = useState(PRStatusOptions[0]);
  const [sortByOptions, setSortByOptions] = useState(sortByValOptions);
  const [labelInput, setLabelInput] = useState('');

  const handleChangeOption = (e) => {
    setSelectedPRStatus(e.target.value)
    onStatusFilterSelected(e.target.value)
  }

  const handleChangeLabelInput = (e) => {
    setLabelInput(e.target.value)
  }

  const handleSortByClicked = ({ target }) => {
    const find = sortByOptions.find(o => o.value === target.value);
    console.log(find);
    find.asc = !find.asc;
    const _updatedSortByOptions = sortByOptions.map(o => o.value === target.value ? find : o)
    console.log(_updatedSortByOptions);
    setSortByOptions(_updatedSortByOptions);
    onSortByOptionClicked(target.value, find.asc)
  }

  return (
    <div>
      <h4>Filter By</h4>
      <label>PR status</label>
      <select id="status" value={selectedPRStatus} onChange={(handleChangeOption)}>
        {
          PRStatusOptions.map(o => <option key={o.value} value={o.value}>{o.displayName}</option>)
        }
      </select>
      <label>Labels</label>
      <input value={labelInput} onChange={handleChangeLabelInput} />
      <h4>Sort By</h4>
      {
        sortByOptions.map(o => <button onClick={handleSortByClicked} key={o.value} value={o.value}> {o.value}({o.asc ? 'asc' : 'desc'})</button>)
      }
    </div>
  )
}


// import { Multiselect } from 'multiselect-react-dropdown';

// this.state = {
//     options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2}]
// };

// <Multiselect
// options={this.state.options} // Options to display in the dropdown
// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
// onSelect={this.onSelect} // Function will trigger on select event
// onRemove={this.onRemove} // Function will trigger on remove event
// displayValue="name" // Property name to display in the dropdown options
// />

// onSelect(selectedList, selectedItem) {
//     ...
// }

// onRemove(selectedList, removedItem) {
//     ...
// }