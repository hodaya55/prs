import { Multiselect } from 'multiselect-react-dropdown';
import React, { useState } from 'react'

export default function FilterAndSort({ onStatusFilterSelected, onSortByOptionClicked, onLabelsFilterSelected, labels }) {

  const PRStatusOptions = [
    { value: 'all', displayName: 'All' },
    { value: 'open', displayName: 'Open' },
    { value: 'draft', displayName: 'Draft' },
    { value: 'closed', displayName: 'Closed' },
  ];

  const sortByValOptions = [
    { value: 'prNumber', displayName: 'PR Number', asc: false },
    { value: 'title', displayName: 'Title', asc: false },
  ];

  const [selectedPRStatus, setSelectedPRStatus] = useState(PRStatusOptions[0]);
  const [sortByOptions, setSortByOptions] = useState(sortByValOptions);
  const [selectedlabels, setSelectedLabels] = useState([]);

  const handleChangeOption = (e) => {
    setSelectedPRStatus(e.target.value)
    onStatusFilterSelected(e.target.value)
  }

  const handleSortByClicked = ({ target }) => {
    let option = sortByOptions.find(o => o.value === target.value);
    option.asc = !option.asc;
    const _updatedSortByOptions = sortByOptions.map(o => o.value === target.value ? option : o)
    setSortByOptions(_updatedSortByOptions);
    onSortByOptionClicked(target.value, option.asc)
  }

  const onSelect = (selectedList, selectedItem) => {
    setSelectedLabels(selectedList)
    const wantedLabels = selectedList.map(l => l.name);
    onLabelsFilterSelected(wantedLabels)
  }
  const onRemove = (selectedList, removedItem) => {
    setSelectedLabels(selectedList)
    const wantedLabels = selectedList.map(l => l.name);
    onLabelsFilterSelected(wantedLabels)
  }

  return (
    <>
      <div className="space-between" style={{ margin: 'auto 30%' }}>
        <div style={{ width: '50%' }}>
          <h5>Filter By</h5>
          <div >
            <label>PR status </label>
            <select id="status" value={selectedPRStatus} onChange={(handleChangeOption)}>
              {
                PRStatusOptions.map(o => <option key={o.value} value={o.value}>{o.displayName}</option>)
              }
            </select>
          </div>
          <div>
            <label className="center space-before">Labels</label>
            <Multiselect
              options={labels}
              selectedValues={selectedlabels} // Preselected value to persist in dropdown
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
            />
          </div>

        </div>
        <div >
          <h5>Sort By</h5>
          <div className="container-sort">
            {sortByOptions.map(o => <button className="btn-sort" onClick={handleSortByClicked} key={o.value} value={o.value}>
              {o.displayName} ({o.asc ? 'desc' : 'asc'})</button>)}
          </div>
        </div>
      </div>
    </>
  )
}