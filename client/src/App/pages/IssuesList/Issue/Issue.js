
import React from "react";
import { connect } from "react-redux";
import IssueDisplay from "./IssueDisplay/IssueDisplay.js";

class Issue extends React.Component {

    render = () => {
        // console.log(this.props);
        const { data, loading, errMsg } = this.props;

        const presentIssues = data.sort((issueOne, issueTwo) =>
            issueOne.upVotes < issueTwo.upVotes).map((issue, i) =>
                <IssueDisplay key={issue._id + i} id={issue._id}
                    index={i} {...issue}></IssueDisplay>);
        if (loading) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)", paddingLeft: "15px", fontSize: ".9em" }}>... loading Issues</div>
            )
        } else if (errMsg) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsg}</div>
            )
        } else {
            return (
                <div className="contain">
                    {presentIssues}
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.issues;
}

export default connect(stateToProps, {})(Issue);