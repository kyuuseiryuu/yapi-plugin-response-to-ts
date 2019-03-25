import InterfaceTab from './pages/InterfaceTab';
import SubNav from './pages/SubNav';

module.exports = function () {
  this.bindHook('interface_tab', tabs => {
    tabs.helloPlugin = {
      name: 'Response 转 TS 声明',
      component: InterfaceTab
    }
  })
  this.bindHook('sub_nav', app => {
    app.typeTrans = {
      name: '声明转换',
      path: '/project/:id/type-trans',
      component: SubNav
    }
  })
}
