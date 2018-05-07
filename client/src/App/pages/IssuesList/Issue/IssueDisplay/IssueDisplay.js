
import React from "react";

import { connect } from "react-redux";
import { deleteIssue, editIssue } from "./../../../../../redux/issues.js";
import { addComment, getComments, deleteComment } from "./../../../../../redux/comments.js";

import CommentDisplay from "./CommentDisplay/CommentDisplay.js";

class IssueDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isCommenting: false,
            comment: {
                container: ""
            }
        }
        this.state = this.initialState;
    };

    componentDidMount() {
        const { getComments} = this.props;
        getComments();
    }

    handleChange = (event) => {
        // console.log(event);
        const { value, name } = event.target;
        this.setState(prevState => {
            return {
                comment: {
                    ...prevState.comment,
                    [name]: value
                }
            }
        });
    }

    handleClick = (event) => {
        const { deleteIssue, deleteComment, id } = this.props;
        const { data } = this.props;
        deleteIssue(id);
        data.filter(comment => comment.issueId === id).map((comment, i) => deleteComment(comment._id));
    }

    toggleComment = (event) => {
        this.setState({ ...this.state, isCommenting: !this.state.isCommenting });
    }

    toggleCommentBack = (event) => {
        this.setState({ ...this.state, isCommenting: false });
    }

    handleClickUpVote = (event) => {
        const { editIssue, id, upVotes } = this.props;
        editIssue(id, { upVotes: upVotes + 1 });
    }
    handleClickDownVote = (event) => {
        const { editIssue, id, downVotes } = this.props;
        editIssue(id, { downVotes: downVotes + 1 });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { container } = this.state.comment;
        const { addComment, id } = this.props;
        addComment({
            container,
            issueId: id
        });
        this.setState({ ...this.state, comment: this.initialState.comment });
    }

    render = () => {
        // console.log(this.props);
        const { isCommenting } = this.state;
        const { container } = this.state.comment;

        // comments
        const { data, loading, errMsg, id } = this.props;
        const presentComments = data.filter(comment => comment.issueId === id).map((comment, i) =>
            <CommentDisplay key={comment._id + i}
                idComment={comment._id} index={i} loadingComment={loading} errMsgComment={errMsg}
                {...comment}></CommentDisplay>);

        // issues
        const { title, description, imgUrl, upVotes, downVotes } = this.props;
        return (
            <div className="singleItem">
                <div className="small">
                    <p>{title.charAt(0).toUpperCase().concat(title.substr(1))}</p>
                    <button onClick={this.handleClick}>Delete</button>
                </div>
                <p className="description">{description.charAt(0).toUpperCase().concat(description.substr(1))}</p>

                <img src={imgUrl} alt={title} />

                <div className="votes">
                    <div>
                        Votes: {(upVotes + downVotes) > 0 ? (upVotes + downVotes) : 0}
                    </div>
                    <div>
                        <i onClick={this.handleClickUpVote} className="fa fa-thumbs-up"></i>
                        <i onClick={this.handleClickDownVote} className="fa fa-thumbs-down"></i>
                        <i onClick={this.toggleComment} className="fa fa-comment"></i>
                    </div>
                </div>
                {isCommenting ?
                    <div className="view-comments">
                        <button onClick={this.toggleCommentBack}>Go Back</button>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} name="container"
                                value={container} type="text" placeholder="Add a Comment" />
                            <button disabled={container.length < 3}>Post</button>
                        </form>
                        <ol>Comments:
                        {presentComments}
                        </ol>
                    </div>
                    : ""}
            </div>
        )
    }
}

function stateToProps(globalState) {
    return globalState.comments;
}

export default connect(stateToProps, { deleteIssue, editIssue, addComment, getComments, deleteComment })(IssueDisplay);