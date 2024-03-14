export interface TextObject {
    type?: string;
    language?: string;
    text?: string;
}
export interface Url {
    type?: string;
    url?: string;
}
export interface SeriesSummary {
    resourceURI?: string;
    name?: string;
}
export interface ComicSummary {
    resourceURI?: string;
    name?: string;
}
export interface ComicDate {
    type?: string;
    date?: string;
}
export interface CreatorSummary {
    resourceURI?: string;
    name?: string;
    role?: string;
}
export interface CreatorList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<CreatorSummary>;
}
export interface Image {
    path?: string;
    extension?: string;
}
export interface CharacterList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<CharacterSummary>;
}
export interface CharacterSummary {
    resourceURI?: string;
    name?: string;
    role?: string;
}
export interface StoryList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<StorySummary>;
}
export interface StorySummary {
    resourceURI?: string;
    name?: string;
    type?: string;
}
export interface EventList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<EventSummary>;
}
export interface EventSummary {
    resourceURI?: string;
    name?: string;
}
export interface ComicPrice {
    type?: string;
    price?: Number;
}
export interface Comic {
    id?: Number;
    digitalId?: Number;
    title?: string;
    issueNumber?: Number;
    variantDescription?: string;
    description?: string;
    modified?: Date;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format?: string;
    pageCount?: Number;
    textObjects?: Array<TextObject>;
    resourceURI?: string;
    urls?: Array<Url>;
    series?: SeriesSummary;
    variants?: Array<ComicSummary>;
    collections?: Array<ComicSummary>;
    collectedIssues?: Array<ComicSummary>;
    dates?: Array<ComicDate>;
    prices: Array<ComicPrice>;
    thumbnail?: Image;
    images: Array<Image>;
    creators?: CreatorList;
    characters?: CharacterList;
    stories?: StoryList;
    events?: EventList;
}
export interface ComicList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<ComicSummary>;
}
export interface ComicSummary {
    resourceURI?: string;
    name?: string;
}
export interface StoryList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<StorySummary>;
}
export interface StorySummary {
    resourceURI?: string;
    name?: string;
    type?: string;
}
export interface SeriesList {
    available?: Number;
    returned?: Number;
    collectionURI?: string;
    items?: Array<SeriesSummary>;
}
export interface SeriesSummary {
    resourceURI?: string;
    name?: string;
}
export interface Character {
    id?: Number;
    name: string;
    description?: string;
    modified?: string;
    resourceURI?: string;
    urls?: Array<Url>;
    thumbnail?: Image;
    comics?: ComicList;
    stories?: StoryList;
    events?: EventList;
    series?: SeriesList;
}
export interface Creator {
    id?: Number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    suffix?: string;
    fullName?: string;
    modified?: string;
    resourceURI?: string;
    urls?: Array<Url>;
    thumbnail?: Image;
    series?: SeriesList;
    stories?: StoryList;
    comics?: ComicList;
    events?: EventList;
}
export interface Event {
    id?: Number;
    title?: string;
    description?: string;
    resourceURI?: string;
    urls?: Array<Url>;
    modified?: string;
    start?: string;
    end?: string;
    thumbnail?: Image;
    comics?: ComicList;
    stories?: StoryList;
    series?: SeriesList;
    characters?: CharacterList;
    creators?: CreatorList;
    next?: EventSummary;
    previous?: EventSummary;
}
