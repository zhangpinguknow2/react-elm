import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {getImgPath, getStore} from '../../utils/commons'
import {saveUserInfo} from '@/store/action'
import {connect} from 'react-redux'
import API from '../../api/api'
import QueueAnim from 'rc-queue-anim'
class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    saveUserInfo: PropTypes.func.isRequired
  }
  state = {
    username:'请登录', //用户名
    imgpath: '', //用户头像
    count: 0,//优惠券个数
    cart: 0 //购物车数量
  }
  //初始化数据
  initData = () => {
    let newState = {}
    if (this.props.userInfo && this.props.userInfo.user_id) {
      newState.username = this.props.userInfo.username
      newState.imgpath = this.props.userInfo.avatar.indexOf('/') !== -1? '/img/' + this.props.userInfo.avatar:getImgPath()
      newState.count = this.props.userInfo.gift_amount
      newState.cart = 1
    } else {
      newState.username = '请登录'
    }
    this.setState(newState)
  }
  componentDidMount () {
    if (!this.props.userInfo.user_id) {
      this.getUserInfo()
    } else {
      this.initData()
    }
  }
  getUserInfo = async() => {
    let userInfo = await API.getUser({user_id: getStore('user_id')})
    this.props.saveUserInfo(userInfo)
    this.initData()
  }
  render() {
    return (
      <div className="profile-container">
        <QueueAnim type="bottom">
          <section key="s2">
            
          </section>
        </QueueAnim>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)