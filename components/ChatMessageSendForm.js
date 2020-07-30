import { useState, useRef, useEffect } from "react";

import "../styles/chatmessagesendform.scss";

const ChatMessageSendForm = ({ handleMessageSend }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const chatInputRef = useRef(null);

    useEffect(() => {
        chatInputRef.current.focus();
    });

    const onSend = (event) => {
        event.preventDefault();

        if (message != "") {
            handleMessageSend(message);
            setMessage("");
            chatInputRef.current.focus();
        } else {
            validate(message);
        }
    };

    /**
     * Validating form fields
     * @param  {String} value
     */
    const validate = (value) => {
        let messageError = null;
        if (value === "") {
            messageError = "Type your message!";
        }
        setError(messageError);
    };
    /**
     * adds error class
     * @param  {String} error
     */
    const addErrorClass = (error) => {
        if (error) return "error";
        return "";
    };

    return (
        <div className="chatsend-form">
            <form
                className="row justify-content-center align-items-center"
                onSubmit={onSend}>
                <div className={`col-10 ${addErrorClass(error)}`}>
                    <input
                        className="form-control"
                        ref={chatInputRef}
                        type="text"
                        placeholder="Enter Message"
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="col-*">
                    <button className="btn btn-secondary" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatMessageSendForm;
