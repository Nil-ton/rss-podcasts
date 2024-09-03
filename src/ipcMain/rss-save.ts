import { ipcMain } from "electron"
import { existsSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { pathRssFile } from "../index"
import rssToJson from "../services/rss-to-json";

ipcMain.handle('rss-save', async (event, value) => {
    value = value.trim();

    if (!/^https?:\/\/.*/.test(value)) {
        throw new Error('URL deve começar com http:// ou https://');
    }

    const occurrencesHttp = (value.match(/http:\/\//g) || []).length;
    const occurrencesHttps = (value.match(/https:\/\//g) || []).length;

    if (occurrencesHttp > 1 || occurrencesHttps > 1) {
        throw new Error('URL contém múltiplos http:// ou https://');
    }

    try {
        new URL(encodeURI(value));
    } catch (error) {
        throw new Error('URL inválida');
    }

    // Verificar se é um RSS válido antes de qualquer outra ação
    try {
        const fetchRSS = await fetch(value)
        const fetchText = await fetchRSS.text()
        const isValidyRSS = await rssToJson(fetchText);
        if (!isValidyRSS || isValidyRSS.title === "" || isValidyRSS.items.length === 0) {
            throw new Error('RSS não é valida');
        }
    } catch (error) {
        throw new Error('RSS não é valida');
    }


    // Verificar se o arquivo de RSS já existe
    if (!existsSync(pathRssFile)) {
        return await writeFile(pathRssFile, JSON.stringify([value]), 'utf-8');
    }

    const readRssFile = await readFile(pathRssFile, 'utf-8');
    const convertRssFile = JSON.parse(readRssFile) as string[];

    const itemsSet: Set<string> = new Set(convertRssFile);

    if (itemsSet.has(value)) {
        throw new Error('RSS já cadastrado');
    }

    itemsSet.add(value);

    await writeFile(pathRssFile, JSON.stringify(Array.from(itemsSet)), 'utf-8');
});
