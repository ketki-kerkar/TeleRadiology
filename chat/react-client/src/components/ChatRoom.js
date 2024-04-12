import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    const [pastMessages, setPastMessages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }    

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        var registerMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        console.log(registerMessage);
        stompClient.send("/app/message", {}, JSON.stringify(registerMessage));
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        stompClient.subscribe('/user/' + userData.username + '/pastMessages', onPastMessagesReceived);
        loadPastMessages();
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                setPublicChats(prevChats => [...prevChats, payloadData]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onPastMessagesReceived = (payload) => {
        try {
            const pastMessage = JSON.parse(payload.body);
            console.log('Received past message:', pastMessage);
            setPastMessages(prevMessages => [...prevMessages, pastMessage]);
        } catch (error) {
            console.error('Error parsing past message:', error);
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        if (userData.username.trim() !== "") {
            connect();
        } else {
            alert("Please enter a username.");
        }
    }

    const loadPastMessages = () => {
    console.log('Loading past messages...');
    const timestamp = new Date().getTime(); // Get current timestamp
    stompClient.send("/app/request-past-messages", {}, JSON.stringify({ username: userData.username, pageNumber, pageSize, timestamp }));
    setLoadingMore(true);
}    

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        console.log('Scroll position:', scrollTop, clientHeight, scrollHeight);
        if (scrollHeight - scrollTop === clientHeight && !loadingMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            loadPastMessages();
        }
    }

    useEffect(() => {
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <div className="container" onScroll={handleScroll}>
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="chat-content">
                        <ul className="chat-messages">
                            {pastMessages.map((chat, index) => {
                                console.log('Rendering past message:', chat);
                                return (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                    </li>
                                );
                            })}
                            {publicChats.map((chat, index) => {
                                console.log('Rendering public chat message:', chat);
                                return (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>

                        <div>
                            {loadingMore && <p>Loading...</p>}
                            {!loadingMore && <button onClick={loadPastMessages}>Load More Messages</button>}
                        </div>
                    </div>
                </div> :
                <div className="username-form">
                    <input type="text" className="input-username" placeholder="enter username" onChange={handleUsername} />
                    <button type="button" className="register-button" onClick={registerUser}>Register</button>
                </div>
            }
        </div>
    );
}

export default ChatRoom;
