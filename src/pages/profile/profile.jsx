import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {getImgPath, getStore} from '../../utils/commons'
import {saveUserInfo} from '@/store/action'
import {connect} from 'react-redux'
import API from '../../api/api'
import QueueAnim from 'rc-queue-anim'
import {Link} from 'react-router-dom'
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
  handleClick= (type) => {
    
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
      <div className='profile-container'>
        <QueueAnim type='bottom'>
          <section key='s2'>
            <section className='profile-number'>
              <Link
                className='profile-link' 
                to={this.props.userInfo&& this.props.userInfo.user_id?'/info':'/login'}
              >
                <img src={this.state.imgpath} alt='img is wrong' className='private-image' />
                <div>{this.state.username}</div>
              </Link>
            </section>
            <section className='order-data' key='order'>
              <Link to='' className='my-order'>
                <div className='icon-dingdan'>我的订单</div>
                <div className='icon-arrow-right'>查看全部订单</div>
              </Link>
              <div className='clear'>
                <Link to='' className='info-data-link'>
                  <span className='icon-jifen1'></span>
                  <span className='info-data-bottom'>待付款</span>
                </Link>
                <Link to='' className='info-data-link'>
                  <span className='icon-jifen1'></span>
                  <span className='info-data-bottom'>待收货</span>
                </Link>
                <Link to='' className='info-data-link'>
                  <span className='icon-jifen1'></span>
                  <span className='info-data-bottom'>待安装</span>
                </Link>
                <Link to='' className='info-data-link'>
                  <span className='icon-jifen1'></span>
                  <span className='info-data-bottom'>待评价</span>
                </Link>
                <Link to='' className='info-data-link'>
                  <span className='icon-jifen1'></span>
                  <span className='info-data-bottom'>退货</span>
                </Link>
              </div>
            </section>
            <section className='profile-list'>
              <QueueAnim delay={400}>
                <div 
                  className='profile-item'
                  key='i1'
                  onClick={this.handleClick.bind(this, 'unfinished')}>
                  <div className='item-left'>
                    <div className='icon-dingdan order-icon'></div>
                    <div className='item-text'>购物车</div>
                  </div>
                </div>
              </QueueAnim>
            </section>
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