import { Component } from "react";

class NetworkErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            untillReload: 5
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch() {
        let timer = setInterval(() => {
            this.setState((prevState) => ({
                untillReload: prevState.untillReload > 0 ? prevState.untillReload - 1 : 0
            }));
        }, 1000);
        if(this.state.untillReload <= 0) {
            clearInterval(timer);
        }
        // setTimeout(() => {
        //     window.location.reload();
        // }, 5000);
    }
    render() {
        const { hasError } = this.state;
        if (hasError) {
            return (
                <div
                    style={{
                        height: "100vh",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <p
                        style={{
                            backgroundColor: "#42A5F5",
                            color: "black",
                            padding: "2px 5px",
                            borderRadius: "6px",
                            textAlign: "center"
                        }}
                    >
                        Will Reload After {this.state.untillReload} Secounds
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default NetworkErrorBoundary;
