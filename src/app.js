import express from 'express';

const app = express();
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