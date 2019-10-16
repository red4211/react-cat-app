import React, { Component } from "react";
import "./App.css";
import List from "./List";
import CatCard from "./CatCard";
import CatImageList from "./CatImageList";
import CategoryFilter from "./CategoryFilter";

class App extends Component {
  state = {
    catInfo: [],
    breeds: [],
    catImages: [],
    pageNumber: 0,
    categories: [],
    currCategory: "",
    categoryIsSet: false,
    showCatCard: false
  };

  componentDidMount() {
    Promise.all([
      fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "2e902c7d-d9c1-49cf-9cf3-0ad15e74fe2f"
        }
      }),
      fetch(
        "https://api.thecatapi.com/v1/images/search?limit=9&page=" +
          this.state.pageNumber +
          "&order=Desc"
      ),
      fetch("https://api.thecatapi.com/v1/categories")
    ])
      .then(([res1, res2, res3]) => {
        return Promise.all([res1.json(), res2.json(), res3.json()]);
      })
      .then(([res1, res2, res3]) => {
        this.setState({ breeds: res1, catImages: res2, categories: res3 });
      });
  }

  showBreed = id => {
    fetch(
      "https://api.thecatapi.com/v1/images/search?breed_ids=" + id.target.value,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "2e902c7d-d9c1-49cf-9cf3-0ad15e74fe2f"
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        this.setState({ catInfo: result, showCatCard: true });
      });
  };

  showNextPage = () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1
      }),
      () => {
        const str = this.state.categoryIsSet
          ? "https://api.thecatapi.com/v1/images/search?limit=9&page=" +
            this.state.pageNumber +
            "&category_ids=" +
            this.state.currCategory
          : "https://api.thecatapi.com/v1/images/search?limit=9&page=" +
            this.state.pageNumber +
            "&order=Desc";
        fetch(str)
          .then(res => res.json())
          .then(result => {
            this.setState({ catImages: result });
          });
      }
    );
  };

  setCategory = e => {
    let changedState = { pageNumber: 0, currCategory: e.target.value };
    if (e.target.value === "") {
      changedState.categoryIsSet = false;
    } else {
      changedState.categoryIsSet = true;
    }

    this.setState(changedState, () => {
      fetch(
        "https://api.thecatapi.com/v1/images/search?limit=9&page=0&category_ids=" +
          this.state.currCategory
      )
        .then(res => res.json())
        .then(result => {
          this.setState({ catImages: result });
        });
    });
  };

  closeCatCard = () => {
    this.setState({ showCatCard: false });
  };

  render() {
    return (
      <div className="App">
        <List list={this.state.breeds} showBreed={this.showBreed} />
        <CatCard
          catInfo={this.state.catInfo}
          closeCatCard={this.closeCatCard}
          showCatCard={this.state.showCatCard}
        />
       <CategoryFilter
          categories={this.state.categories}
          setCategory={this.setCategory}
        />
        <CatImageList
          catImages={this.state.catImages}
          showNextPage={this.showNextPage}
        />
      </div>
    );
  }
}
export default App;
