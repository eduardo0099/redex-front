import React from 'react';
import { Col, Layout, Button, Menu, Dropdown, Icon } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import Fullscreen from "react-full-screen";

import Map from './Map';

const baseColor = "#3498db";

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