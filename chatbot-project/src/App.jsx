import { useState ,useEffect} from 'react'
import {Chatbot} from 'supersimpledev';
import './App.css'              
import {ChatInput} from './components/ChatInput.jsx';
import  ChatMessages from './components/ChatMessages.jsx'   

function App(){
            const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))||[{
                message:"hello chatbot",
                sender:"user",
                id:'id1'
            }]);
            //const [chatMessages,setChatMessages]=array; //this is called array destructuring an alternative and shorter code for the code that is commented out below 
            // const chatMessages=array[0];//gives current value of chatmessages(current data)
            // const setChatMessages=array[1];//gives a function that updates this data (MUST USE CAMELCASE)
            //this setChatMessages is A.K.A as updater function 
            useEffect(()=>{ //we create custom responses to the messages 
                Chatbot.addResponses({
                    'goodbye':"lowde ke ball ",
                    'hello':"muh me lele lowde"

                });
            },[]);
            useEffect(()=>{
                localStorage.setItem('messages',JSON.stringify(chatMessages));


            },[chatMessages]);
            return (
                <div className="app-container">
                    <ChatMessages 
                    chatMessages={chatMessages}
                    />
                    <ChatInput
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                    />
                </div>
            );
        }

export default App
