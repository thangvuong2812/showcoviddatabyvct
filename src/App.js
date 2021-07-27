import { useEffect, useState, useMemo, useCallback } from 'react';
import { getCountries, getReportByCountry } from './apis';
import CountrySelector from './components/CountrySelector/CountrySelector';
import Highlight from './components/Highlight/Highlight';
import Summary from './components/Summary/Summary';
import { sortBy } from 'lodash';
import '@fontsource/roboto';
import moment from 'moment';
import 'moment/locale/vi';
import { Container, Typography, Grid } from '@material-ui/core';
import logo from './no-image.png';
moment.locale('vi');
function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries()
      .then(res => {
        console.log(res)
        const {data} = res;
        const countries = sortBy(data, 'Country');
        setCountries(countries);

        setSelectedCountryId('vn');
      })
  }, []);

  const handleChange = useCallback(e => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    //call api
    if(selectedCountryId) {
      const selectedCountry  = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId);
      console.log(selectedCountry)
      getReportByCountry(selectedCountry.Slug).then(res =>{
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries,selectedCountryId])

  const summary = useMemo(() => {
    if (report && report.length) {
      const lastestData = report[report.length - 1];
      return [
        {
          title: 'Số ca nhiễm',
          count: lastestData.Confirmed,
          type: 'confirmed'
      },
      {
          title: 'Số ca khỏi',
          count: lastestData.Recovered,
          type: 'recovered'
      },
      {
          title: 'Số ca tử vong',
          count: lastestData.Deaths,
          type: 'death'
      },
      ]
    }
    return [];
  }, [report]);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Typography variant="h2" style={{color: '#178BF7'}} component="h2">
            Số liệu COVID-19
          </Typography>
        </Grid>
        <Grid item sm={6} style={{textAlign: 'right'}}>
          <Typography variant="h5" component="h5" style={{textAlign: 'right', color: '#178BF7'}}>
            Powered by VCT
          </Typography>
          <img style={{width:'200px', height:'100px', marginRight:'-10px'}} src={logo}/>
        </Grid>
      </Grid>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleChange={handleChange} value={selectedCountryId}/>
      <Highlight summary={summary}/>
      <Summary report={report} countryId={selectedCountryId}/>
    </Container>
  );
}

export default App;
