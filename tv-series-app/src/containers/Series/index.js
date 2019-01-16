import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';

class Series extends Component {

    state = {
        series : [],
        seriesName :'',
        isFetching:false
    }

    onSeriesInputChange = e => {
        this.setState({seriesName:e.target.value, isFetching:true});

        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then((response) => response.json())
        .then(json => this.setState({series:json,isFetching:false}));
        
    }
    render(){
        const {series,seriesName,isFetching} = this.state;
        return (
            <div>
                <Intro  message ="Most Loved TV Series"/> 
            <div>
                <input type="text" 
                        value={seriesName} 
                        onChange={this.onSeriesInputChange} />
            </div>
            {
                !isFetching && series.length === 0 && seriesName.trim() === ''
                &&
                <p>Please Enter Series Name into the Input</p>

            }
            {
                !isFetching && series.length === 0 && seriesName.trim() !==''
                &&
                <p>No TV Series has been found for this name..!</p>
            }
            {
                isFetching && <Loader /> 
            }
            {
                !isFetching && <SeriesList list={this.state.series} /> 
            }
            <SeriesList list = {this.state.series}/>
            </div>
        )
    }

}

export default Series;