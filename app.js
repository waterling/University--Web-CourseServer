
const app = require('./connections/ExpressConnect');
//const bodyParser = require('body-parser'); // use for json
// app.use(bodyParser.json());


const newsRoute = require('./route/NewsRoute');
app.use('/news', newsRoute);

const onlineSeriesRoute = require('./route/OnlineSeriesRoute');
app.use('/online', onlineSeriesRoute);

const charactersRoute = require('./route/CharactersRoute');
app.use('/chars', charactersRoute);

const organizationsRoute = require('./route/OrganizationsRoute');
app.use('/org', organizationsRoute);

const signUpRoute = require('./route/SignUpRoute');
app.use('/signup',signUpRoute);

const authRoute = require('./route/AuthRoute');
authRoute(app);



