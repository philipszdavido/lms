import React, { Component } from 'react';
import { _connect } from './../connect'
import PropTypes from 'prop-types'
import CountDown from 'countdown-timer'
import 'countdown-timer/dist/countdown.min.css'

class Test extends Component {
    constructor(props,context){
        super(props,context)
        this.state = {
            greeting: ""
        }
        this.take = this.take.bind(this)
    }
    take() {
        this.props._take('nnamdi')
    }
    /*static contextTypes = {
        store: PropTypes.object.isRequired
    }*/
    componentDidMount() {
        setTimeout(()=>{
            this.setState({greeting:"Hello World"})
        },
        1000)
    }
    
    render() {
        let _props = []

        //const {store} = this.context
        //console.log('store')
        //console.log(store)

        for (var key in this.props) {
            _props.push([key, this.props[key].toString()])
            //console.log(this.props[key])
        }
        return ( 
            <div className="App">
                Hi, Test
                <CountDown />
                <button onClick={this.take}>TEST DISPATCH: {this.props.appName}</button>
                <div>appName: {this.props.appName}</div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    _take: s => dispatch({ type:'CHG_APP_NAME', appName: s })
})
/*function _take() {
    return (dispatch) => {
        dispatch({ type:'TOGGLE_MODAL', modalMode: true })        
    }    
}*/

const mapStateToProps = state => {
    return {
        appName: state.common.appName
    }
}

export default /*Test;*/_connect(mapStateToProps, /*{ _take }*/mapDispatchToProps)(Test);