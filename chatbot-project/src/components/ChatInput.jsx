import { useState} from 'react'
import dayjs from 'dayjs';
import{Chatbot} from 'supersimpledev'
import './ChatInput.css';

export function ChatInput({chatMessages,setChatMessages}){
            const[inputText,setInputText]=useState('');
            const[isLoading,setIsLoading]=useState(false);
            function SaveInputText(event){
                setInputText(event.target.value);
            }
            function KeyTarget(event){
                if(event.key==='Enter'){
                  SendMessage();
              }
              if(event.key=='Escape'){
                setInputText('');
              }
            }
            
            async function SendMessage(){
                if(isLoading || inputText===""){//you cannot send a message if you are waiting for a response or the message is empty
                  return;
                }
                setIsLoading(true); 
                const newChatMessages=[ 
                    ...chatMessages ,//this is a spread operator it takes the values of an array and copies them into a new array
                    {
                        message: inputText,
                        sender:'user',
                        id : crypto.randomUUID(),
                        time: dayjs().valueOf()
                    }
                    

                ]
                setChatMessages(newChatMessages);
                setInputText('');
                setChatMessages([
                  ...newChatMessages,
                  {
                    message:'Loading...',
                    sender:'robot',
                    id:crypto.randomUUID(),
                    time: dayjs().valueOf()
                  }
                ]

                );
                const response=await Chatbot.getResponseAsync(inputText);
                   setChatMessages([ //what setChatMessages does is that it takes an array and completely replaces the chatMessages array with this one 
                    ...newChatMessages ,//this is a spread operator it takes the values of an array and copies them into a new array
                    {
                        message: response,
                        sender:'robot',
                        id : crypto.randomUUID()
                    }
                    

                ]);
                setInputText('');
              setIsLoading(false);

            }
            return(
                <div className="chat-input-container">
                    <input 
                        placeholder="Send a message to the chatbot" 
                        size="30"
                        onChange={SaveInputText}
                        value={inputText}
                        onKeyDown={KeyTarget}
                        className="chat-input"
                    />
                    <button onClick={SendMessage} 
                    className="send-button"
                    >Send</button>
                </div>
            );
        }