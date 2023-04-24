import { useState, createRef, useEffect } from "react";
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from "./icons";
import { useScreenshot } from 'use-react-screenshot';

const tweetFormat = tweet => {
    tweet = tweet.replace(/@([\w]+)/, "<span>@$1</span>")
    tweet = tweet.replace(/#([\wişçğüı]+)/, "<span>#$1</span>")
    return tweet
}

const numberFormat = number => {

    if(number<1000000) {
        if (number < 1000) {
            return number;
        }else {
            number /= 1000;
            number = String(number).split('.');
            return (
                number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + 'B' : 'B')
            );
        }
    } else {
        number/=1000000
        number = String(number).split('.');
       return (
        number[0] + 'M'
       ) 
    }

   

};



function App() {

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [isVerified, setIsVerified] = useState("false")
    const [tweet, setTweet] = useState()
    const [avatar, setAvatar] = useState()
    const [retweets, setRetweets] = useState(0)
    const [quoteTweets, setQuoteTweets] = useState(0)
    const [likes, setLikes] = useState(0)

    // To download screenshot
    const [image, takeScreenshot] = useScreenshot()
    const tweetRef = createRef(null)
    const downloadRef = createRef()
    const getImage = () => takeScreenshot(tweetRef.current)

    useEffect(() => {
        if (image) {
            downloadRef.current.click()  //
        }
    }, [image])

    const avatarHandle = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener("load", function () {
            setAvatar(this.result)
        })
        reader.readAsDataURL(file)
    }

    const handleChange = (e) => {
        console.log(typeof (isVerified))
        setIsVerified(e.target._valueTracker.getValue())
    }

    return (
        <>
            <div className="tweet-settings">
                <div className="header-row-1">
                    <h3>Tweet Ayarları</h3>
                </div>
                <ul>
                    <li>
                        <label>Name Surname</label>
                        <input onChange={e => setName(e.target.value)} type="text" />
                    </li>
                    <li>
                        <label>Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" />
                    </li>
                    <li>
                        <label>Verified</label>
                        <input
                            style={{ width: "15px", marginLeft: "5px", borderBottom: "1px solid #2f3336", marginBottom: "20px" }}
                            onChange={handleChange}
                            type="checkbox" />
                        <hr />
                    </li>
                    <li>
                        <label>Tweet</label>
                        <textarea onChange={e => setTweet(e.target.value)} cols="10" rows="10"></textarea>
                    </li>
                    <li>
                        <label>Profile Picture</label>
                        <input onChange={avatarHandle} type="file" />
                    </li>
                    <li>
                        <label>Retweet</label>
                        <input onChange={e => setRetweets(e.target.value)} type="number" />
                    </li>
                    <li>
                        <label>Quotes Tweets</label>
                        <input onChange={e => setQuoteTweets(e.target.value)} type="number" />
                    </li>
                    <li>
                        <label>Likes</label>
                        <input onChange={e => setLikes(e.target.value)} type="number" />
                    </li>

                    <button onClick={getImage}>Create</button>
                    <div className="download-url">
                        {image && (
                            <a href={image} download="tweet.png" ref={downloadRef} >
                                Download Tweet
                            </a>
                        )}
                    </div>
                </ul>
            </div>

            <div className="tweet-container">
                <div className="tweet" ref={tweetRef}>

                    <div className="tweet-author">
                        <img src={avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQBtVXoi_JlTqaXm9DrbG_dZVmp-P-xeBFzxNqEqA&s"} alt="" />
                        <div>
                            <div className="name">
                                {name || "Ad-Soyad"}
                                {isVerified === "true" && <VerifiedIcon />}
                            </div>
                            <div className="username">@{username || "kullaniciadi"}</div>
                        </div>
                    </div>

                    <div className="tweet-content">
                        <p dangerouslySetInnerHTML={{ __html: tweet ? tweetFormat(tweet) : "Bu alana örnek tweet gelecek." }}>
                            {/* span etiketlerini algılaması için yapılmıştır. */}
                        </p>
                    </div>

                    <div className="tweet-stats">
                        <span><b>{numberFormat(retweets)}</b> Retweet</span>
                        <span><b>{numberFormat(quoteTweets)}</b> Alıntı Tweetler</span>
                        <span><b>{numberFormat(likes)}</b> Beğeni</span>
                    </div>

                    <div className="tweet-actions">
                        <span><ReplyIcon /></span>
                        <span><RetweetIcon /></span>
                        <span><LikeIcon /></span>
                        <span><ShareIcon /></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
