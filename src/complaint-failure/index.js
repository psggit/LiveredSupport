import React from "react"
import "./../complaint-success/complaint-success.scss"
import Icons from "./../icons"

function ComplaintFailure() {
  return (
    <div id="complaintSuccess" className="container" >
      <div className="main-header">
        Excise Department
        </div>
      <div className="body">
        <div className="content failure-container">
          <div className="failure-text">
            {Icons["failure"]}
            <p className="header text">Something went wrong!</p>
            <a href={`/complaints/${location.pathname.split("/")[2]}`}><button>Try again</button></a>
          </div>
        </div>
        <div className="footer">
          <div>
            <p className="text">For any other support, please contact us</p>
            {/* <p className="ottp-id">00 800 1008110</p> */}
            <a className="ottp-id" href="tel:00-800-1008110" data-rel="external">00 800 1008110</a>
          </div>
          <div>
            <p className="text" style={{ color: '#4a90e2' }}>Operating hours</p>
            <p className="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintFailure
