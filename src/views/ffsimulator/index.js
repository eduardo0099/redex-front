import React from 'react';
import { Layout } from "antd";
import { TheContent } from "../../components/layout";
import Fullscreen from "react-full-screen";
import Map from './Map';

export default class FFSimulator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false
        }
    }

    goFull = () => this.setState({...this.state, isFullscreen: true});

    render() {
        return (
            <Layout>
                <TheContent>
                    <button onClick={this.goFull}>Go Fullscreen </button>
                    <Fullscreen
                        enabled={this.state.isFullscreen}
                        onChange={isFullscreen => this.setState({ isFullscreen })}
                    >
                        <div className="simulator-fullscreen-bg">
                        <Map/>
                        </div>
                    </Fullscreen>
                </TheContent>
            </Layout>
        )
    }
}