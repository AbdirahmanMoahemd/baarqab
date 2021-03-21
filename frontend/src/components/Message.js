import React from 'react'

const Message = ({ variant, children, someAlert }) => {
    var close = document.getElementsByClassName("closebtn");
    var i;

    for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 5000);
    }
    }
    return (
        <>
            <div className={`alert ${variant} ${someAlert}`}> 
              
                <strong>{variant}!</strong> {children}.
            </div>
        </> 
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message





