import { ipcMain } from "electron";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { pathRssFile } from "../background";
import rssToJson, { IRss, IRssItem } from "../../services/rss-to-json";



ipcMain.handle('rss-get-podcasts', async () => {
  if (!existsSync(pathRssFile)) {
    return [];
  }
  const readRssFile = await readFile(pathRssFile, 'utf-8');
  const convertRssFile = JSON.parse(readRssFile) as string[];



  const promises: Promise<IRss>[] = new Array(convertRssFile.length)

  for (let i = 0; i < convertRssFile.length; i++) {
    promises[i] = ((async () => {
      const res = await fetch(convertRssFile[i]);
      const data = await res.text();
      const rss = await rssToJson(data, convertRssFile[i])
      return rss;
    })())
  }

  const results = (await Promise.all<IRss>(promises)).flat()

  function quicksort(arr: IRss[], left: number, right: number) {
    if (left < right) {
      const pivotIndex = partition(arr, left, right)
      quicksort(arr, left, pivotIndex - 1)
      quicksort(arr, pivotIndex + 1, right)
    }
  }

  function partition(arr: IRss[], left: number, right: number): number {
    const pivot = arr[right].items[0].created;
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j].items[0]?.created >= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  quicksort(results, 0, results.length - 1);


  for (let i = 0; i < results.length; i++) {
    results[i].items = results[i].items.slice(0, 4)
  }

  return results
});