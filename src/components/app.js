
import React, { Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
const topRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const topAll = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class MakeCamperChart extends Component{

  constructor(props){
    super(props); 
    this.state = {
      camperData: null,
      tableData: null,
      recent: 'desc', 
      username: 'asc',
      alltime: 'asc' 
    }

    this.sortBy = this.sortBy.bind(this);
    this.getData();
  }

  getData(){
    axios.get(topRecent).then(topRecentCampers => 
      axios.get(topAll).then(topAllTimeCampers => {
          let camperData = [...topRecentCampers.data, ...topAllTimeCampers.data];
          camperData = _.uniqBy(camperData, camper => {
            return camper.username;
          })
          this.setState({camperData});
          this.makeTableData(camperData);
        })
      )
  }

  makeTableData(camperData){
   let tableData = camperData.map( (camper, index) => {
      let url = `https://www.freecodecamp.org/${camper.username}`;
      return(
        <tr key={`${camper.img}${Math.random()}`}>
          <td className="align">{index + 1}</td>
          <td>
            <img src={camper.img} className="camperImg"/>
            <a href={url}>{camper.username}</a>
          </td>
          <td className="align">
            {camper.recent}
          </td>
          <td className="align">
            {camper.alltime}
          </td>
        </tr>
      )
    });
    this.setState({tableData})
  }


sortBy(event){
  let column = event.target.id
  console.log(event.target.id)
  let sortStatus = this.state[column];
  if(sortStatus == 'desc'){
      sortStatus = 'asc'
      this.setState({[column]: 'asc'})
    } else if(sortStatus == 'asc') {
      sortStatus = 'desc';
      this.setState({[column]: 'desc'})
    }
    let camperData = _.orderBy(this.state.camperData, [column], [sortStatus])
    this.makeTableData(camperData)
}

  render(){
    if(!this.state.tableData){
      return <div>Loading...</div>
    } else{
      return (
        <table className="table table-dark">
          <thead>
            <tr>
              <th className="align">#</th>
              <th><button className="btn btn-secondary" id="username" onClick={this.sortBy}>Camper Name</button></th>
              <th><button className="btn btn-secondary" id="recent" onClick={this.sortBy}>Top Recent</button></th>
              <th><button className="btn btn-secondary" id="alltime" onClick={this.sortBy}>Top All Time</button></th>
            </tr>
          </thead>
          <tbody>
          {this.state.tableData}
          </tbody>
        </table>
      )  
    }
  } 
}

export default MakeCamperChart;
