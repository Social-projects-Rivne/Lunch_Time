// import React, {Component} from "react";
// import {getJwt} from "./jwt";
// import axios from 'axios';
//
// class AuthenticatedComponent extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       user: undefined
//     };
//     componentDidMount();
//     {
//       const jwt = getJwt();
//       if (!jwt) {
//         this.props.history.push('/login');
//       }
//       axios.get('/api/', {headers: {Authorization: 'Bearer ${jwt}'}}).then(res => res.setState({
//         user: res.data
//       })).cache(() => {
//         localStorage.removeItem('Bearer ');
//         this.props.history.push('/login')
//       });
//     }
//     render();
//     {
//       if (this.state.user === undefined) {
//         return (<div><h1>Loading...</h1></div>);
//       }
//       return (
//
//         <div>{this.props.children}</div>
//       )
//     }
//
//
//   }
//
// }
