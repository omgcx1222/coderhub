import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  current: 0, // 首页显示的第几个label
	clickSlide: false,  // 首页的滑块是否点击滑动
	userInfo: {},  // 用户登录后的信息
	shopCart: [],  // 用户购物车信息
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store