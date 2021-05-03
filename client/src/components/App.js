import React, { useEffect, useState } from 'react';
import './App.css';
import PRs from './PRs';
import FilterAndSort from './FilterAndSort';
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqLabels, setUniqLabels] = useState([]);
  // const [labelsFilter, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost:3000';

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/api/vcs/prs`);
        const prs = processData(response.data);
        setData(prs);
        setFilteredData(prs);
        setIsLoading(false);

      } catch (exception) {
        console.log('error:', exception);
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      }
    };
    fetchPRs();
  }, []);

  const processData = (prData) => {
    let labels = [];
    let prs = prData.map(prObj => {
      let pr = {
        id: prObj.id,
        prNumber: prObj.number,
        title: prObj.title,
        description: null,
        author: { name: prObj.user.login, urlPic: prObj.user.avatar_url },
        status: prObj.state,
        labels: prObj.labels.map(l => l.name),
        creationDate: prObj.created_at
      }
      labels.push(...pr.labels);
      return pr;
    })

    const uniqLabelsNames = [...new Set(labels)].map((l, i) => ({ name: l, id: i }))
    setUniqLabels(uniqLabelsNames);

    return prs;
  }

  const handleStatusFilterSelected = (status) => {
    if (status === 'all') {
      setFilteredData(data)
    } else {
      const _data = data.filter(d => d.status === status)
      // need to merge/ do intersection with filteredData ? or reset status to All
      // const intersection = filteredData.filter(item1 => _data.some(item2 => item1.id === item2.id))
      setFilteredData(_data)
    }
  }

  const handleSortByOption = (val, asc) => {
    let _data = [...filteredData]
    switch (val) {
      case 'prNumber':
        _data = _data.sort((d1, d2) => d1.prNumber - d2.prNumber)
        break;
      case 'title':
        _data = _data.sort((d1, d2) => (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 :
          ((d2.title.toLowerCase() > d1.title.toLowerCase()) ? -1 : 0));
        break;
    }
    const sortedData = asc ? _data : _data.reverse()
    setFilteredData(sortedData);
  }

  const handleFilterByLabels = (selectedLabels) => {
    // matchSubArray
    const _data = data.filter(d => d.labels.join("").search(selectedLabels.join("")) !== -1)
    // need to merge/ do intersection with filteredData ? or reset selectedLabels
    // const intersection = filteredData.filter(item1 => _data.some(item2 => item1.id === item2.id))
    // setFilteredData(intersection)
    setFilteredData(_data)
  }

  return (
    <div className="App">
      <FilterAndSort onStatusFilterSelected={handleStatusFilterSelected} onSortByOptionClicked={handleSortByOption}
        onLabelsFilterSelected={handleFilterByLabels} labels={uniqLabels} />

      {isLoading ?
        <p>Loading ...</p> :
        <PRs data={filteredData} />
      }

    </div>
  );
}

export default App;


