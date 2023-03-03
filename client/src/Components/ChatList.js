import React from 'react'

const ChatList = ({ messages}) => {
    let messageByMe
  return (
    <div>
        {
            messages?.map((message, index) => (
            <div key={index}>
                {
                    messageByMe = message?.user === 'me' ? true : false
                }
                {
                    messageByMe ? (
                        <p className='sentbyme'>{message?.user?.toUpperCase()}: {message?.message}</p>
                    ) : (
                        <p className='opponent'>{message?.user?.toUpperCase()}: {message?.message}</p>
                    )
                }
            </div>
            ))
        }
    </div>
  )
}

export default ChatList