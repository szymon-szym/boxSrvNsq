import { App } from './app'

const nsqClient = new App.nsqClient(App.boxSrv)

nsqClient.connectWriter()
nsqClient.connectReader()
