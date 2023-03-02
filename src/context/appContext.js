
import React, { Component, createContext } from 'react'
// import { withRouter } from 'react-router-dom'
import Fetch from '../common/fetch'
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";


export const MainContext = createContext()

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class AppContext extends Component {
  state = {
    isLogin: false,
    role: '',
    userProfile: {},
    allRoaster:[],
    license:{},
    sideBarOpen:false,
    notificationsCount:0
  }
  componentDidMount() {
    if (localStorage.token) {
      const user = localStorage.user && JSON.parse(localStorage.user)
      this.setState({
        isLogin: true,
        role: +user?.role,
      })
      this.getProfile()
    } else {
      this.setState({
        isLogin: false,
        role: '',
      })
    }
  }
  getProfile = () => {
    Fetch('notifications/unread-count/').then((d) => {
      if (d?.status) {
        this.setState({
          notificationsCount: d.data?.unread_count,
        })
      }
    })
    Fetch('accounts/user/').then((d) => {
      if (d?.status) {
        this.setState({
          userProfile: d.data,
        })
      }
    })
  }
  authLogin = (role) => {
    this.setState({
      isLogin: true,
      role: role ? role : this.state.role,
    })
  }
  logOut = () => {
    localStorage.clear()
    this.setState({
      isLogin: false,
      role: '',
    })
  }
  render() {
    return (
      <MainContext.Provider
        value={{
          ...this.state,
          logOut: this.logOut,
          authLogin: this.authLogin,
          addRoaster: (data) =>this.setState({allRoaster:data}),
          addlicense: (data,type) =>this.setState({license:{...this.state.license,[type]:data}}),
          getProfile: this.getProfile,
          notifyCountUpdate:(count)=>this.setState({...this.state,notificationsCount:count}),
          handleSideBarOpen:(val)=>this.setState({...this.state,sideBarOpen:val})
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    )
  }
}

export default withRouter(AppContext)

export const withContext = (Components) => (props) => {
  return (
    <MainContext.Consumer>
      {(value) => <Components context={value} {...props} />}
    </MainContext.Consumer>
  )
}
