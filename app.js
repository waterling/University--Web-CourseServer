const app = require('./connections/ExpressConnect');


const newsRoute = require('./route/NewsRoute');
app.use('/news', newsRoute);

const onlineSeriesRoute = require('./route/OnlineSeriesRoute');
app.use('/online', onlineSeriesRoute);

const charactersRoute = require('./route/CharactersRoute');
app.use('/chars', charactersRoute);

const organizationsRoute = require('./route/OrganizationsRoute');
app.use('/org', organizationsRoute);

const mapRoute = require('./route/MapRoute');
app.use('/map', mapRoute);

const authRoute = require('./route/AuthRoute');
app.use('/auth', authRoute);

const userRoute = require('./route/UserRoute');
app.use('/user', userRoute);
