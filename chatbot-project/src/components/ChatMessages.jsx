import { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';
function ChatMessages({chatMessages}){
            const chatMessagesRef=useRef(null);//this lets us automatically save an html element from a component
            
            useEffect(()=>{
                 const containerElem=chatMessagesRef.current;//points to the rendered DOM element of the messages container
                 if(containerElem){
                    containerElem.scrollTop=containerElem.scrollHeight; //scrolls the container immediately to the bottom whenever a message is added
                 }

            },[chatMessages]);
            //react will run this function after component is created and everytime the component is updated
            return (
                <div className="chat-messages-container"
                ref={chatMessagesRef}
                >
                {chatMessages.map((chatMessage)=>
                    <ChatMessage 
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    key={chatMessage.id}
                    time={chatMessage.time}
                    />

                )}
                </div>
            );
        }
export default ChatMessages;