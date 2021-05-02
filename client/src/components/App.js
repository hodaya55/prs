import React, { useEffect, useState } from 'react';
import './App.css';
import PRs from './PRs';
import FilterAndSort from './FilterAndSort';
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
      return pr;
    })
    console.log(prs);
    return prs;
  }

  const handleStatusFilterSelected = (status) => {
    if (status === 'all') {
      setFilteredData(data)
    } else {
      let _data = [];
      _data = data.filter(d => d.status === status)
      console.log(_data.map(d => d.status));
      setFilteredData(_data)
    }
  }

  const handleSortByOption = (sortByVal, asc) => {
    let _data = filteredData;
    console.log(_data[0].prNumber);
    console.log(asc);
    switch (sortByVal) {
      case 'prNumber':
        _data = filteredData.sort((d1, d2) => d1.prNumber - d2.prNumber)
        break;
      case 'title':
        _data = filteredData.sort((d1, d2) => (d1.title > d2.title) ? 1 : ((d2.title > d1.title) ? -1 : 0));
        break;
    }
    const sortedData = asc ? _data : _data.reverse()
    console.log(sortedData[0].prNumber);
    setFilteredData(sortedData);
  }


  return (
    <div className="App">
      <FilterAndSort onStatusFilterSelected={handleStatusFilterSelected} onSortByOptionClicked={handleSortByOption} />

      {isLoading ?
        <p>Loading ...</p> :
        <PRs data={filteredData} />
      }

    </div>
  );
}

export default App;

