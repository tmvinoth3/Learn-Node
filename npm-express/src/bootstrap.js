module.exports = async () => {
    const Tweet = require('./models/Tweet');
    const User = require('./models/User');

    User.hasMany(Tweet, {as:"Tweets", foreignKey:'userId'});
    Tweet.belongsTo(User,{as:"User", foreignKey:'userId'});

    const errHandler = (err) =>{
        console.log(err);
    }

    const user = await User.create({username: "John", passwd: "john@123"}).catch(errHandler);
    const tweet = await Tweet.create({content:"This is tweet from Android", userId:user.id}).catch(errHandler);

    const tweets = await User.findAll({where: {username:'john'}, include: [{model:Tweet, as:"Tweets"}]}).catch(errHandler);

    console.log(JSON.stringify(tweets));
}