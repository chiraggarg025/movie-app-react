import React from 'react';
import { render } from '@testing-library/react';
import {handleMovieSearch, addMovieToList} from '../actions'
import { connect, StoreContext } from '..';
class Navbar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      searchText:''
    };
  }
  handleAddToMovies = (movie) =>{
    console.log('Inside Handle Add to movie')
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults: false
    });
  }

  handleSearch = () => {

    const {searchText} = this.state;

     this.props.dispatch(handleMovieSearch(searchText));

  };
  handlechange = (e) =>{
    this.setState({
      searchText:e.target.value
    })
  };
  

    render(){
      const {result : movie,showSearchResults} = this.props.search;
      console.log("PRINTIN******",this.props.search)  
      return (
            <div className="nav">
              <div className="search-container">
                  <input onChange = {this.handlechange}/>
                  <button id="search-btn" onClick={this.handleSearch}>Search</button> 
              
                {showSearchResults &&
                  <div className="search-results">
                    <div className="search-result">
                      <img src = {movie.Poster} alt="search-pic" />

                      <div className="movie-info">
                        <span>{movie.Title}</span>
                        <button onClick = {() => this.handleAddToMovies(movie)}>
                          Add to Movies
                        </button>
                      
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          );
    }
  
}

// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch = {store.dispatch} search = {this.props.search}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }
function mapStateToProps({search}){
  return {
    search
  }
}
export default connect(mapStateToProps)(Navbar)

// export default AppWrapper;
