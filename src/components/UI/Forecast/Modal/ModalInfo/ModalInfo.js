import React from 'react';
import styled from 'styled-components';
import ForecastHour from '../../Result/Components/ForecastHour'

const ForecastWrapper = styled.div `
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div `
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: scroll;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;

`;

const modalInfo = (props) => {
    // let url = "http://streaming.tdiradio.com:8000/house.mp3";
    // let audio = new Audio(url);
    // audio.play();
    console.log(props.forecast)

    let forecasts = null
    if (props.forecast) {
        const fr = props.forecast;
        forecasts = fr.map(item => (
            <ForecastHour
                key={item.dt}
                temp={Math.floor(item.main.temp * 1) / 1}
                icon={item.weather[0].icon}
                month={item.dt_txt.slice(5, 7)}
                day={item.dt_txt.slice(8, 10)}
                hour={item.dt_txt.slice(11, 13) * 1}
            />
        ));
    }
    return (
        <div>
            <p>{props.city} </p>
            <p> average temp is : {props.temp} </p>
            <p> max temp is : {props.max} </p>
            <p> min temp is : {props.min} </p>
    <ForecastWrapper>
        <p>Forecast</p>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
        </div>
    )


}

export default modalInfo;