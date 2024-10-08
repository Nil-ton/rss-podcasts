import { XMLParser } from "fast-xml-parser";

export interface IRss {
    title: string;
    description: string;
    link: string;
    image: string;
    category: string[];
    items: IRssItem[];
}

export interface IRssItem {
    xmlURL: string
    id: string;
    title: string;
    description: string;
    link: string;
    author: string;
    published: number;
    created: number;
    category: string[];
    content: string;
    enclosures: any[];
    itunes_image: {href: string}
}

export default async function rssToJson (xmlRss: string, xmlURL?: string): Promise<IRss> {
    const xml = new XMLParser({
        attributeNamePrefix: '',
        textNodeName: '$text',
        ignoreAttributes: false,
    });

    const result = xml.parse(xmlRss);

    let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;
    if (Array.isArray(channel)) channel = channel[0];

    const rss = {
        title: channel?.title ?? '',
        description: channel?.description ?? '',
        link: channel?.link && channel?.link.href ? channel?.link.href : channel?.link,
        image: channel?.image ? channel.image?.url : channel?.['itunes:image'] ? channel?.['itunes:image'].href : '',
        category: channel?.category || [],
        items: [] as  IRssItem[],
    };

    let items = channel?.item || channel?.entry || [];
    if (items && !Array.isArray(items)) items = [items];

    for (let i = 0; i < items.length; i++) {
        const val = items[i];
        const media = {};

        const obj = {
            xmlURL,
            id: val.guid && val.guid.$text 
            ? val.guid.$text 
            : val.id 
                ? val.id 
                : `${rss.title}_${i + 1}`,
            title: val.title && val.title.$text ? val.title.$text : val.title,
            description: val.summary && val.summary.$text ? val.summary.$text : val.description,
            link: val.link && val.link.href ? val.link.href : val.link,
            author: val.author && val.author.name ? val.author.name : val['dc:creator'] || channel.author ? channel.author : channel['itunes:author'],
            published: val.created ? Date.parse(val.created) : val.pubDate ? Date.parse(val.pubDate) : Date.now(),
            created: val.updated ? Date.parse(val.updated) : val.pubDate ? Date.parse(val.pubDate) : val.created ? Date.parse(val.created) : Date.now(),
            category: val.category || [],
            content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],
            enclosures: val.enclosure ? (Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure]) : [],
        };

        ['content:encoded', 'podcast:transcript', 'itunes:summary', 'itunes:author', 'itunes:explicit', 'itunes:duration', 'itunes:season', 'itunes:episode', 'itunes:episodeType', 'itunes:image'].forEach((s) => {
            //@ts-ignore
            if (val[s]) obj[s.replace(':', '_')] = val[s];
        });

        if (val['media:thumbnail']) {
            Object.assign(media, { thumbnail: val['media:thumbnail'] });
            obj.enclosures.push(val['media:thumbnail']);
        }

        if (val['media:content']) {
            Object.assign(media, { thumbnail: val['media:content'] });
            obj.enclosures.push(val['media:content']);
        }

        if (val['media:group']) {
            if (val['media:group']['media:title']) obj.title = val['media:group']['media:title'];

            if (val['media:group']['media:description']) obj.description = val['media:group']['media:description'];

            if (val['media:group']['media:thumbnail']) obj.enclosures.push(val['media:group']['media:thumbnail'].url);

            if (val['media:group']['media:content']) obj.enclosures.push(val['media:group']['media:content']);
        }

        Object.assign(obj, { media });

        //@ts-ignore
        rss.items.push(obj);
    }
    return rss;
};