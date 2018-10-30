import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { position: null };
        this.getRef = this.getRef.bind(this);
    }
    componentDidMount() {
        this.updatePosition();
    }
    
    componentDidUpdate() {
        this.updatePosition();
    }
    
    getPosition() {
        const { x, y } = this.props;
    
        if (!this.el || x === undefined || y === undefined) return null;
    
        const canDisplayOnRight = x < document.documentElement.clientWidth - this.el.clientWidth - 10;
        const canDisplayOnBottom =
          y < document.documentElement.clientHeight - this.el.clientHeight - 10;
        const leftPos = canDisplayOnRight ? x + 10 : x - this.el.clientWidth - 10;
        const topPos = canDisplayOnBottom ? y + 10 : y - this.el.clientHeight - 10;
    
        const left = Number.isNaN(leftPos) ? 0 : leftPos;
        const top = Number.isNaN(topPos) ? 0 : topPos;
        return { left, top };
    }

    getRef(el) {
        this.el = el;
    }

    updatePosition() {
        const newPosition = this.getPosition();
        const { position } = this.state;
        console.log("position",position,newPosition);
        /*if (!isEqual(position, newPosition)) {
            this.setState({ position: newPosition });
        }*/
    }
    render() {
        const { className, text, items = [], show } = this.props;
        const { position } = this.state;
        const { top, left } = position || {};
        const visibility = show && position ? 'visible' : 'hidden';

        return (
            <div
                ref={this.getRef}
                className={className}
                style={{ left, top, visibility }}
            >
                <div className="units-tooltip-text">{text}</div>
                {items.map(item => (
                <div key={item.title} className="units-tooltip-value">
                    <div className="units-tooltip-title">{item.title}</div>
                    <div className="units-tooltip-data">
                    {item.value}
                    {item.unit && <span> {item.unit}</span>}
                    </div>
                </div>
                ))}
            </div>
        );
    }
}


export default Modal;