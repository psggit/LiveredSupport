import React from "react"
import "./complaints.scss"
import { POST } from "./../utils/fetch"

const consumer = "https://consumer.livered-dev.com"

class Complaints extends React.Component {
  constructor() {
    super()
    this.state = {
      reason: "",
      message: "",
      ottpId: "",
      count: 150
    }
    this.characterLimit = 150
    this.reasons = [
      {
        text: "Wrong product(s) delivered / Product(s) missing",
        value: 0
      },
      {
        text: "Product(s) delivered late",
        value: 1
      },
      {
        text: "Proper packaging absent",
        value: 2
      },
      {
        text: "MRP violation",
        value: 3
      },
      {
        text: "Product(s) damaged/ tampered/ spurious",
        value: 4
      },
      {
        text: "Inappropriate behaviour by agent",
        value: 5
      }
    ]
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  componentDidMount() {
    const queryParam = location.pathname.split("/")
    this.setState({ ottpId: queryParam[queryParam.length - 1] })
  }

  handleMessageChange(e) {
    const message = e.target.value
    message.length > this.characterLimit
      ? e.preventDefault()
      : this.setState({
        message,
        count: this.characterLimit - message.length
      })
  }

  handleChange() {
    const selectedReasonIdx = parseInt(document.getElementById("reason").value)
    this.setState({
      reason: this.reasons.find(item => item.value === selectedReasonIdx).text
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    document.getElementById("submit-btn").disabled = true
    const { message, ottpId, reason } = this.state
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({
        complaint_message: message,
        ottp_id: ottpId,
        reason
      })
    }
    fetch(`${consumer}/livered/consumers/insertComplaints`, fetchData)
      .then((json) => {
        location.href = "/complaint-success"
      })
      .catch((error) => {
        document.getElementById("submit-btn").disabled = false
        const queryParam = location.pathname.split("/")
        location.href = `/complaint-failure/${queryParam[queryParam.length - 1]}`
      })
  }

  render() {
    return (
      <div id="complaints" className="container">
        <div className="main-header">
          Excise Department
          {/* <span>
            of Pondicherry
          </span> */}
        </div>
        <div className="body">
          <div className="header">
            <p className="title">Grievances & Complaints</p>
            <p className="sub-title">Ref OTTP ID# {this.state.ottpId}</p>
          </div>
          <div className="content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Please select a reason</label>
                <select id="reason" onChange={() => this.handleChange()} required>
                  <option value="" disabled selected>
                    Choose a reason
                </option>
                  {this.reasons.map(item => {
                    return <option value={item.value}>{item.text}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <div>
                  <textarea
                    required
                    placeholder="Write a message"
                    value={this.state.message}
                    onChange={e => this.handleMessageChange(e)}
                  />
                  <p className="os s9"><span id="char_count">{this.state.count}</span> characters {this.state.count < this.characterLimit ? 'remaining' : ''}</p>
                </div>
              </div>
              <div className="form-group">
                <button id="submit-btn">Submit</button>
              </div>
            </form>
          </div>
          <div className="footer">
            <div>
              <p className="text">For any other support, please contact us</p>
              {/* <p className="ottp-id">00-800-1008110</p> */}
              <a className="ottp-id" href="tel:00-800-1008110" data-rel="external">00 800 1008110</a>
            </div>
            <div>
              <p className="text" style={{ color: "#4a90e2" }}>
                Operating hours
              </p>
              <p className="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Complaints
