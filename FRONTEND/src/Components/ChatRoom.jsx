import React, { useState, useRef, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

let stompClient = null;

const ChatRoom = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('doctorEmail');
    const initialCaseId = queryParams.get('caseId');

    const [cases, setCases] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: email,
        receivername: '',
        connected: false,
        message: '',
        caseId: initialCaseId
    });
    const [pastMessages, setPastMessages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loadingMore, setLoadingMore] = useState(false);
    const [connecting, setConnecting] = useState(true); 
    const [connectionReady, setConnectionReady] = useState(false); 

    const connectionRef = useRef(false);

    const connect = () => {
        if (!connectionRef.current) {
            let Sock = new SockJS('http://localhost:9191/ws');
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
            connectionRef.current = true;
        }
    }

    const onConnected = () => {
        setConnecting(false);
        setConnectionReady(true);
        setUserData({ ...userData, "connected": true });
        var registerMessage = {
            senderName: userData.username,
            status: "JOIN",
            caseId: userData.caseId
        };
        stompClient.send("/app/message", {}, JSON.stringify(registerMessage));
        stompClient.subscribe('/chatroom/public', onMessageReceived);   
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

    const onPastMessagesReceived = (payload) => {
        try {
            const pastMessage = JSON.parse(payload.body);
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
        if (connectionReady) { 
            if (stompClient) {
                var chatMessage = {
                    senderName: userData.username,
                    message: userData.message,
                    caseId: userData.caseId,
                    status: "MESSAGE"
                };
                stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
                setUserData({ ...userData, "message": "" });
            }
        }
    }

    const loadPastMessages = () => {
        const timestamp = new Date().getTime();
        stompClient.send("/app/request-past-messages", {}, JSON.stringify({ username: userData.username, caseId: userData.caseId, pageNumber, pageSize, timestamp }));
        setLoadingMore(true);
    }  

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && !loadingMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            loadPastMessages();
        }
    }

    useEffect(() => {
        connect();
    }, []);

    const sortPastMessages = (arr) => {
        return arr.sort((a, b)=>{
            return (a.messageId < b.messageId) ? -1 : (a.messageId > b.messageId) ? 1 : 0;
        })
    }

    return (
        <div className="container" onScroll={handleScroll}>
            {connecting ? (
                <div>Connecting...</div>
            ) : (
                userData.connected && (
                    <div className="chat-box">
                        <div className="chat-content">
                            <ul className="chat-messages">
                                {sortPastMessages(pastMessages).map((chat, index) => (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                    </li>
                                ))}
                                {publicChats.map((chat, index) => (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                    </li>
                                ))}
                            </ul>
                            <div className="send-message">
                                <input type="text" className="input-message" placeholder="Enter the message" value={userData.message} onChange={handleMessage} />
                                <button type="button" className="send-button" onClick={sendValue}>Send</button>
                            </div>

                            <div>
                                {loadingMore}
                                {!loadingMore && <button onClick={loadPastMessages}>Load More Messages</button>}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ChatRoom;