
import React, { Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
const topRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const topAll = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class App extends Component{

  constructor(props){
    super(props); 
    this.getData = this.getData.bind(this);
    this.state = {
      data: null,
      table: null
    }
    this.getData()
  }

  getData(){
    axios.get(topRecent)
      .then(results => 
        axios.get(topAll).then(results2 => {
          let data = [...results.data, ...results2.data];
          data = _.uniqBy(data, e => {
            return e.username
          }) 
          this.setState({data})
          this.makeTableData(this.state.data)
        })
      )
  }

  makeTableData(data){
   var table = data.map( item => {
      let url = `https://www.freecodecamp.org/${item.username}`;
      return(
        <tr key={item.img}>
          <td>{item.index}</td>
          <td>
            <img src={item.img}/>
            <a href={url}>{item.username}</a>
          </td>
          <td>
            {item.recent}
          </td>
          <td>
            {item.alltime}
          </td>
        </tr>
      )
    });
    this.setState({table})
  }


  
  render(){
    if(!this.state.data){
      return <div>Loading...</div>
    } else{
      return (
        <table className="table table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th>Recent</th>
              <th>All Time</th>
            </tr>
          </thead>
          {this.state.table}
        </table>
      )  
    }
  } 
}


export default App;

/*


            */