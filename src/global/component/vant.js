import {
  Button, Tabbar, TabbarItem, Field, NavBar,
  Search, Icon, Swipe, SwipeItem, Grid, GridItem,
  Cell, Image, IndexBar, IndexAnchor, List, Popup, Tag, Tabs, Tab, DropdownItem,
  DropdownMenu, Picker, Lazyload, Form, Uploader
} from 'vant'

const els = [
  Button, Tabbar, TabbarItem, Field, NavBar,
  Search, Icon, Swipe, SwipeItem, Grid, GridItem,
  Cell, Image, IndexBar, IndexAnchor, List, Popup,
  Tag, Tab, Tabs, DropdownMenu, DropdownItem, Picker,
  Form, Lazyload, Uploader

]

export function registerVant(Vue) {
  els.forEach(el => Vue.use(el))
}
