import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

const usersList = [];
const tweetsList = [];

function getTweets(init, end) {
    const tweets = [];

    if (init > tweetsList.length || tweetsList.length === 0) {
        return tweets
    } else if (end > tweetsList.length) {
        end = tweetsList.length - 1;
    }

    for (let i = end; i >= init; i--) {
        const message = {
            username: tweetsList[i].username,
            avatar: findAvatarByUsername(tweetsList[i].username),
            tweet: tweetsList[i].tweet
        }

        tweets.push(message);
    }

    return tweets
}

function findAvatarByUsername(name) {
    const user = usersList.find(u => u.username === name);

    return user.avatar
}

app.listen(PORT, () => `Rodando servidor na porta ${PORT}`);

app.get('/', (req, res) => {
    res.send('aoba');
});

app.get('/tweets', (req, res) => {
    const list = getTweets(0, 9);

    res.send(list);
});

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar || typeof(username) !== 'string'|| typeof(avatar) !== 'string') {
        res.status(400).send('Todos os campos são obrigatórios!');
    }

    const newUser = {
        username, 
        avatar
    };
    usersList.push(newUser);

    res.status(201).send('OK');
})

app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;

    if (!usersList.some(user => user.username === username)) {
        res.status(401).send('UNAUTHORIZED');
        return
    }

    if (!username || !tweet || typeof(username) !== 'string'|| typeof(tweet) !== 'string') {
        res.status(400).send('Todos os campos são obrigatórios!');
        return
    }

    const newTweet = {
        username,
        tweet
    };

    tweetsList.push(newTweet);

    res.status(201).send('OK');
});

app.get('/tweets/:USERNAME', (req,res) => {
    const {USERNAME} = req.params;
    const tweets = tweetsList.filter(tweets => tweets.username === USERNAME);
    const avatar = findAvatarByUsername(USERNAME);
    const list = tweets.map(msg => {
        return {
            username: msg.username,
            avatar,
            tweet: msg.tweet
        }
    });

    res.send(list);
})