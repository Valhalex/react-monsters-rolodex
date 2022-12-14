import { Component, useState, useEffect } from "react";
import "./App.css";
import CardList from './components/card-list/card-list.component'

import SearchBox from "./components/search-box/search-box.component";

const App =()=>{
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  const [stringField, setStringField] = useState('')

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  },[])

  useEffect(() =>{
    const newFilteredMonsters = monsters.filter((monster) =>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters)
  },[monsters,searchField]);
  
  const onSearchChange = event =>{
        const searchField = event.target.value.toLocaleLowerCase();
        setSearchField(searchField)
      }

  return (
    <div className='App'>
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox onChangeHandler ={onSearchChange} placeholder='Search Monster' className='monsters-search-box'/>
        <CardList monsters={filteredMonsters}/>
      </div>
  )
}


// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => this.setState(
//       ()=>{
//         return {monsters: users}
//       },
//       ()=>{
//       })
//     )
//   };

//   onSearchChange = event =>{
//     // console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(()=> {
//       return { searchField };
//     })
//   }

//   render() {

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
    
//     const filteredMonsters = monsters.filter((monster) =>{
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className='App'>
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox onChangeHandler ={onSearchChange} placeholder='Search Monster' className='monsters-search-box'/>
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }
export default App;
