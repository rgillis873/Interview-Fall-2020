import express from 'express';
import moment from 'moment';
import { Launches } from './spaceX/launches';

const app = express();
app.use(express.json());
const port = 8001; // default port to listen

// define a route handler for the default home page
app.get('/', async (request: any, response: any) => {
  response.send({});
});

// Handle get requests to /nasa
app.get('/yearly-launches', async (request: any, response: any) => {
  const daily = new Launches();
  // Sends in today's date as a formatted string
  const result = await daily.getLaunchesByYear(request.query.year);
  // Sends back the result of the image getter
  response.send(result);
});

//Handle get requests to /nasa for range of years
app.get('/range-launches', async(request: any, response: any)=>{
  const range = new Launches();

  //Make request to api for launches in the range
  let result = await range.getLaunchRange(request.query.start,request.query.end);


  //Make sure the result is sorted by year
  result.sort((launchOne,launchTwo)=>{
    if(launchOne.year > launchTwo.year){
      return 1;
    }
    if(launchOne.year < launchTwo.year){
      return -1;
    }

    return 0;
  })

  //Send the response
  response.send(result);
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
