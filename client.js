import Page from './pages';
import TypeTrans from './pages/TypeTrans';

module.exports = function () {
  this.bindHook('interface_tab', tabs => {
    tabs.helloPlugin = {
      name: 'Response 转 TS 声明',
      component: Page
    }
  })
  this.bindHook('sub_nav', app => {
    app.typeTrans = {
      name: '声明转换',
      path: '/project/:id/type-trans',
      component: TypeTrans
    }
  })
}
