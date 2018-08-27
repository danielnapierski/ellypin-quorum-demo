import React from 'react'
import TokenSender from '../components/TokenSender'
import MessageSender from '../components/MessageSender'

class Index extends React.Component {

    render() {
        return (
            <div>
                <div  style={{ background: '#fff', padding: 24, minHeight: 280, marginTop:'25px' }}>
                    <TokenSender />
                </div>
                <div  style={{ background: '#fff', padding: 24, minHeight: 280, marginTop:'25px' }}>
                    <MessageSender />
                </div>
            </div>
        )
    }
}

export default Index
