const devConfig = { MONGO_URL: 'mongodb://yagozt:e4ZnC9ty5tMV9gq@ds129004.mlab.com:29004/heroku_2vf3l1wj', JWT_SECRET: "thisisasecret", };
const testConfig = { MONGO_URL: 'mongodb://heroku_vgs84qlk:i8il8ldlc41q4sm52r9qk3um6n@ds135689.mlab.com:35689/heroku_vgs84qlk', };
const prodConfig = { MONGO_URL: 'mongodb://yagozt:e4ZnC9ty5tMV9gq@ds129004.mlab.com:29004/heroku_2vf3l1wj', JWT_SECRET: "thisisasecret", };
const defaultConfig = {
    PORT: process.env.PORT || 3000,
};
function envConfig(env) {
    env = env ? env.trim() : 'development';
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

//Take defaultConfig and make it a single object 
//So, we have concatenated two objects into one 
module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV)
}