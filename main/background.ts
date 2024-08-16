import path, { join } from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

const isProd = process.env.NODE_ENV === 'production'

export const dataPath = join(app.getPath('userData'), 'data')
export const pathRssFile = join(dataPath, 'rss.json')


if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
     title: 'RSS Podcast'
  })

  if (!existsSync(dataPath)) {
    await mkdir(join(dataPath))
  }

  if (isProd) {
    await mainWindow.loadURL('app://./')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})