import { ipcMain } from "electron"
import { existsSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { pathRssFile } from "../background"

ipcMain.handle('rss-save', async (event, value) => {
    if (!new URL(encodeURI(value))) {
      throw new Error('Url invalida')
    }
    
  
    if(!existsSync(pathRssFile)) {
      return await writeFile(pathRssFile, JSON.stringify([value]), 'utf-8')
    }
    
    const readRssFile = await readFile(pathRssFile, 'utf-8')
    const convertRssFile = JSON.parse(readRssFile) as string[]
  
    const itemsSet: Set<string> = new Set(convertRssFile);
  
    if(itemsSet.has(value)){
      throw new Error('Rss já cadastrado')
    }
  
    itemsSet.add(value);
  
    await writeFile(pathRssFile, JSON.stringify(Array.from(itemsSet)), 'utf-8')
  })
  