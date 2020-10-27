import React from 'react';
import "./Message.css";

const getStyle = (props) => {
	let style = "standard";
	if(props.message.msgError)
		style = "bad";
	else
		style = "good";
	return style + " default"
}


const Message = props => {
	return(
		<div className={getStyle(props)}>
			{props.message.msgBody}
		</div>
	)
}

export default Message;