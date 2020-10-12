import React, { Component } from 'react'
import Map from '../../components/PanelItems/Map/Map.js'
import Menu from '../../components/PanelItems/Menu/Menu'
import Classes from './Panel.css'
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Action/actionTypes';
import Modal from '../../components/UI/Forecast/Modal/Modal'
import Result from '../../components/UI/Forecast/Result/Result';

class Panel extends Component{

      state = {
          mode: "", 
          citiesInfo: [],
          count: 0,
          showModal: false,
          temp: null,
    }
    
    componentDidMount() {
        this.props.cities.map((city) => {
            this.getWeatherInfo(city);
        })
        
        // console.log(country)
            //  this.getWeatherInfo(country);
        
        //*************************************************************************** */

        }
        //  this.getWeatherInfo('iran');
        // this.state.cities.map((element) =>
        //     this.getWeatherInfo(element)
        // )
    
    showingModal = () =>{
        this.setState({showModal : true})
    }

    
    
    getWeatherInfo = (city) => {
 const weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ce2944c0bbb657728d1da14af74dd283
&units=metric`;

 const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=ce2944c0bbb657728d1da14af74dd283
&units=metric`;

        
 Promise.all([fetch(weather), fetch(forecast)])
     .then(([res1, res2]) => {
         if (res1.ok && res2.ok) {
             return Promise.all([res1.json(), res2.json()]);
         }
         throw Error(res1.statusText, res2.statusText);
     })
     .then(([data1, data2]) => {
         const months = [
             'January',
             'February',
             'March',
             'April',
             'May',
             'June',
             'July',
             'August',
             'September',
             'October',
             'Nocvember',
             'December',
         ];
         const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
         const currentDate = new Date();
         const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
                        months[currentDate.getMonth()]
                        }`;
         const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
         const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

         // console.log(data1);

         const weatherInfo = {
             city: data1.name,
             coords: data1.coord,
             country: data1.sys.country,
             date,
             description: data1.weather[0].description,
             main: data1.weather[0].main,
             temp: data1.main.temp,
             highestTemp: data1.main.temp_max,
             lowestTemp: data1.main.temp_min,
             sunrise,
             sunset,
             clouds: data1.clouds.all,
             humidity: data1.main.humidity,
             wind: data1.wind.speed,
             forecast: data2.list,
         };

         const updateCitiesInfo = this.state.citiesInfo;
         updateCitiesInfo.push(weatherInfo);
         this.setState({ temp: weatherInfo });
         this.setState({
             citiesInfo: updateCitiesInfo,
         });
     })
     .catch(error => {
         console.log(error);

         this.setState({
              citiesInfo: null,
         });
     });
        // })

    }
    // cityAdded = (city) => {
    //      const updatedCities = this.props.cities;
    //      updatedCities.push(city);
    //     // this.setState({
    //     //     cities: updatedCities,
    //     //  })
    
    //     this.getWeatherInfo(city);
    // }

    render() {
        console.log(this.props.reg)
        const {temp} = this.state
        const map = (
                <Map className={Classes.Map} cityInfo={this.state.citiesInfo} mode="dark-v10"/>
        )
        // this.getWeatherInfo();
        return (
            <div className={Classes.bdy}>
                {map}
                {/* <Map className={Classes.Map} cityInfo={this.state.citiesInfo} mode="dark-v10"/>  */}
                 <Menu className = {Classes.Men} >
                </Menu>
                <Modal show={this.state.showModal}><p> mamad</p></Modal>
                {/* {temp && <Result props={temp} className={Classes.result}/>} */}


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cities: state.cities,
        reg: state.registered
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Panel);