import { createRouter, createWebHashHistory } from "vue-router"

const Index = () => import("../page/Index.vue")
const Crypto = () => import("../page/Crypto.vue")
const Chat = () => import("../page/Chat.vue")
const ChatDetail = () => import("../page/ChatDetail.vue")

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/crypto/:coinCode",
    name: "crypto",
    component: Crypto
  },
  {
    path: "/chat/:id",
    name: "chat",
    component: Chat
  },
  {
    path: "/chatDetail/:code",
    name: "ChatDetail",
    component: ChatDetail
  },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })
  export default router