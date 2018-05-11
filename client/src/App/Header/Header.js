import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isEditing: false,
            inputs: {
                username: "",
                password: ""
            }
        }
        this.state = this.initialState;
    };

    toggleEdit = () =>
        this.setState(prevState => {
            return {
                inputs: this.initialState.inputs,
                isEditing: !prevState.isEditing
            }
        });

    handleChange = (event) => {
        // console.log(event);
        const { value, name } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        });
    }

    render() {
        const { username, password } = this.state.inputs;
        const { isEditing } = this.state;
        if (isEditing) {
            return (
                <header>
                    <nav>
                        <div className="navi">
                            <Link className="noline" to="/"><span>Home</span></Link>
                            <Link className="noline" to="/issues"><span>Issues</span></Link>
                            <Link className="noline" to="/about"><span>About</span></Link>
                        </div>
                        <div className="formlog">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <input onChange={this.handleChange} name="username" type="text" placeholder="Username" value={username} />
                                    <input onChange={this.handleChange} name="password" type="text" placeholder="Password" value={password} />
                                </div>
                                <div>
                                    <button>Login</button>
                                    <button onClick={this.toggleEdit}>Back</button>
                                </div>
                            </form>
                        </div>
                    </nav>
                </header>
            )
        }
        return (
            <header>
                <nav>
                    <div className="navi">
                        <Link className="noline" to="/"><span>Home</span></Link>
                        <Link className="noline" to="/issues"><span>Issues</span></Link>
                        <Link className="noline" to="/about"><span>About</span></Link>
                    </div>
                    <div onClick={this.toggleEdit} className="login">
                        <div>
                            Login
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;