import { ipcMain } from "electron"
import { existsSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { pathRssFile } from "../background"

ipcMain.handle('rss-save', async (event, value) => {
    // Remover espaços em branco desnecessários
    value = value.trim();

    // Verificar se a URL começa com "http://" ou "https://"
    if (!/^https?:\/\/.*/.test(value)) {
        throw new Error('URL deve começar com http:// ou https://');
    }

    // Verificar se a URL contém mais de uma vez "http://" ou "https://"
    const occurrencesHttp = (value.match(/http:\/\//g) || []).length;
    const occurrencesHttps = (value.match(/https:\/\//g) || []).length;
    
    if (occurrencesHttp > 1 || occurrencesHttps > 1) {
        throw new Error('URL contém múltiplos http:// ou https://');
    }
    
    // Verificar se a URL é válida
    try {
        new URL(encodeURI(value));
    } catch (error) {
        throw new Error('URL inválida');
    }
  
    if(!existsSync(pathRssFile)) {
        return await writeFile(pathRssFile, JSON.stringify([value]), 'utf-8');
    }
    
    const readRssFile = await readFile(pathRssFile, 'utf-8');
    const convertRssFile = JSON.parse(readRssFile) as string[];
  
    const itemsSet: Set<string> = new Set(convertRssFile);
  
    if(itemsSet.has(value)){
        throw new Error('RSS já cadastrado');
    }
  
    itemsSet.add(value);
  
    await writeFile(pathRssFile, JSON.stringify(Array.from(itemsSet)), 'utf-8');
});
