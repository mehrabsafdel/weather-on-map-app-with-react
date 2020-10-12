import React,{Component} from 'react'
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Action/actionTypes';
import Classes from './Manager.css'
import CityBox from '../../components/UI/CityBox/CityBox'
import Menu from '../../components/PanelItems/Menu/Menu'

class Manager extends Component{

    state ={
    addingCity: "",
        
    }

    inputChanged = (event) => {
        const city = event.target.value;
        this.setState({
            addingCity: city
        })
    }

    render() {
                console.log(this.props.reg)

        const cities = this.props.cities.map((city) => {
            return <CityBox key={city} cityName={city} remove={() => {
                this.props.cityDeleted(city)
            }} ></CityBox>
        })

        return (
            <div className={Classes.main}>
                <div className={Classes.body}>
                    <button className={Classes.backbtn} onClick={() => {this.props.history.push('/panel')}}> back to map</button>
                <input onChange={this.inputChanged} />
                <button onClick={() => {
                    alert(this.state.addingCity)
                    this.props.cityAdded(this.state.addingCity)
                    this.setState({
                        addingCity: ""
                    })
                }}> ADD CITY </button>
                    {cities}
                </div>
                <Menu/>
            </div>
        )
    }
}




const mapStateToProps = state => {
    return {
        cities: state.cities,
                reg: state.registered !== null

    };
};

const mapDispatchToProps = dispatch => {
    return {
        cityAdded: (city) => dispatch({
            type: actionTypes.CITY_ADDED,
            addedCity: city
        }),
        cityDeleted: (city) => dispatch({type: actionTypes.CITY_DELETED, deletedCity: city})

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);