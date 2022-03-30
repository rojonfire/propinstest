import React, {Component} from "react";
import {Container} from "react-bootstrap";


import {Events, animateScroll as  scrollSpy } from 'react-scroll'


export class pruebapagina extends Component{
componentDidMount() {
    Events.scrollEvent.register('begin', function(to, element) {
        console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
        console.log("end", arguments);
    });

    scrollSpy.update();
}
    constructor(props)
    {
        super(props);
        this.myref=React.createRef();
    }
    render() {
          
        return (
            <Container fluid="true" className="bg-light pa0 paMobile flex-auto">
                <section className="section-space6 bg-white">
                    dfghjkldasdkaskldjaslkdjaskldjaskldjaskldjasldkjasd
                    <button onClick={this.scrollToBottom}>
                        hola
                        <div id="main" style={{ overflowY: 'scroll' }}>
                            <button onClick={() => this.myref.scroll.scrollToBottom()}>Scroll To Bottom</button>
                            <div className='yellow' style={{ height: '100vh', width: '100vw', backgroundColor: 'yellow' }} />
                            <div className='red' style={{ height: '100vh', width: '100vw', backgroundColor: 'red' }} />
                            <div ref={this.myRef} className='green' style={{ height: '100vh', width: '100vw', backgroundColor: 'green' }} />
                        </div>
                    </button>

                </section>
                <section  className="section-space6 bg-white">
holaaa
                </section>
                <section  className="section-space6 bg-white">
                    holaaa
                </section>
                <section  className="section-space6 bg-white">
                    holaaa
                </section>
                <section  className="section-space6 bg-white">
                    chao
                </section>
            </Container>
        );
    }
}

export default pruebapagina;
