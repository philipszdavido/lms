import React, { Component, createElement } from 'react';
import { connect } from './../connect'
import PropTypes from 'prop-types'
import Subscription from './Subscription'

function _w(_cmp, mapStateToProps, mapDispatchToProps) {
    console.log('======= nnamdi =============')
    console.log(_cmp)
    console.log('======= end =============')
    class W extends Component {
        constructor(props, context) {
            super(props, context)
            this.store = this.context.store
            this.state = {}
            this.initSubscription()
        }
        static contextTypes = {
            store: PropTypes.object.isRequired
        }
        componentDidMount() {
            this.subscription.trySubscribe()            
        }
        componentWillUnmount() {
            this.subscription = null
        }
        
        initSubscription () {
            this.subscription = new Subscription(this.store, this.stateChange.bind(this))
        }

        stateChange () {
            alert('state change')
            this.setState({})
        }

        render() {
            console.log('======= rendering =============')
            //const { store } = this.context
            let state = this.store.getState()
            let dispatch = this.store.dispatch;

            console.log('======= d =============')
            let _d = mapDispatchToProps(this.store.dispatch)
            console.log(_d)

            console.log('======= d end =============')
            
            if(typeof mapDispatchToProps == 'object') {
                for (var key in mapDispatchToProps) {
                    mapDispatchToProps[key]()
                }
            }
            let _s = mapStateToProps(state)
            let _props = Object.assign(_s, _d)
            return ( 
                createElement(_cmp,_props/*{nnamdi:'nnamdi'}*/)
            );
        }
    }
    return W
}

/**
 * const mapStateToProps = dispatch => {
 *  calc: dispatch => console.log()
 * }
 * @param {*} mapStateToProps 
 * @param {*} mapStateToProps
 */
export function _connect(mapStateToProps, mapDispatchToProps) {
    console.log(mapStateToProps, mapDispatchToProps)

    return function(cmp) {
        console.log(cmp)
        return _w(cmp,mapStateToProps, mapDispatchToProps)
    }
}

let g = {
    fish: function fish(params) {
        return (d) => {
            d('pop')
        }        
    }
}