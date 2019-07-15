import React, { Component } from "react";
import axios from "axios";


import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "welcome to my portfolio",
            isLoading: false, 
            data: [
                // {title:"Quip", category: "eCommerce", slug: 'quip'}, 
                // {title: "Eventbrite", category: "Scheduling", slug: 'eventbrite' }, 
                // {title: "Ministry Safe", category: "Enterprise", slug: 'ministry-safe'},
                // {title: "Swing Away", category: "eCommerce", slug: 'swing-away'}
            ]
        };

        this.handleFilter = this.handleFilter.bind(this); 
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter; 
            })
        }); 
    }

    getPortfolioItems() {
        axios.get('https://ashleylujan.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        this.setState({
            data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }

    portfolioItems() {
          // Data that we'll need:
    // - background image: thumb_image_url
    // - logo
    // - description: description
    // - id: id
        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item}/>;   
        
        })
    }

    componentDidMount() {
        this.getPortfolioItems(); 
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>; 
        }
        // this.getPortfolioItems(); 
        return (
                <div className="portfolio-items-wrapper">
                    <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                    <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                    <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>

                    {this.portfolioItems()}
                </div>
        );
    }
}