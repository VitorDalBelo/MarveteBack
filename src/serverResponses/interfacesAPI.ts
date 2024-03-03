export interface TextObject {
    type ?: string,// The canonical type of the text object (e.g. solicit text, preview text, etc.).,
    language ?: string,// The IETF language tag denoting the language the text object is written in.,
    text ?: string,// The text.
}
export interface Url {
    type ?: string ,// A text identifier for the URL.,
    url ?: string ,// A full URL (including scheme, domain, and path).
}
export interface SeriesSummary {
    resourceURI ?: string ,// The path to the individual series resource.,
    name ?: string ,// The canonical name of the series.
}
export interface ComicSummary {
    resourceURI ?: string ,// The path to the individual comic resource.,
    name ?: string ,// The canonical name of the comic.
}
export interface ComicDate {
    type ?: string ,// A description of the date (e.g. onsale date, FOC date).,
    date ?: string //The date.
}
export interface CreatorSummary {
    resourceURI ?: string , // The path to the individual creator resource.,
    name ?: string , // The full name of the creator.,
    role ?: string , // The role of the creator in the parent entity.
}
export interface CreatorList {
    available ?: Number,// The number of total available creators in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number,// The number of creators returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of creators in this collection.,
    items ?:Array<CreatorSummary>,//The list of returned creators in this collection.
}
export interface  Image {
    path ?: string,// The directory path of to the image.,
    extension ?: string,// The file extension for the image.
}
export interface  CharacterList {
    available ?: Number,// The number of total available characters in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number,// The number of characters returned in this collection (up to 20).,
    collectionURI ?:string,// The path to the full list of characters in this collection.,
    items ?:Array<CharacterSummary>,// The list of returned characters in this collection.
}

export interface CharacterSummary {
    resourceURI ?: string,// The path to the individual character resource.,
    name ?: string,// The full name of the character.,
    role ?: string,// The role of the creator in the parent entity.
}
export interface  StoryList {
    available ?: Number, // The number of total available stories in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number, // The number of stories returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of stories in this collection.,
    items ?: Array<StorySummary>, //The list of returned stories in this collection.
}
export interface StorySummary {
    resourceURI ?: string,// The path to the individual story resource.,
    name ?: string,// The canonical name of the story.,
    type ?: string,// The type of the story (interior or cover).
}
export interface EventList {
    available ?: Number, // The number of total available events in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number, // The number of events returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of events in this collection.,
    items ?: Array<EventSummary>, // The list of returned events in this collection.
}
export interface EventSummary {
    resourceURI ?: string,// The path to the individual event resource.,
    name ?: string,// The name of the event.
}
export interface ComicPrice {
    type ?: string , // A description of the price (e.g. print price, digital price).,
    price ?: Number, //The price (all prices in USD).
}
export interface Comic {
    id ?: Number, //The unique ID of the comic resource.
    digitalId ?: Number, //The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally
    title ?: string, // The canonical title of the comic.
    issueNumber ?: Number //The number of the issue in the series (will generally be 0 for collection formats).,
    variantDescription ?: string ,// If the issue is a variant (e.g. an alternate cover, second printing, or director’s cut), a text description of the variant.,
    description ?: string ,// The preferred description of the comic.,
    modified  ?: Date //The date the resource was most recently modified.,
    isbn ?: string ,// The ISBN for the comic (generally only populated for collection formats).,
    upc ?: string ,// The UPC barcode number for the comic (generally only populated for periodical formats).,
    diamondCode ?: string ,// The Diamond code for the comic.,
    ean ?: string ,// The EAN barcode for the comic.,
    issn ?: string ,// The ISSN barcode for the comic.,
    format ?: string ,// The publication format of the comic e.g. comic, hardcover, trade paperback.,
    pageCount ?: Number//The number of story pages in the comic.,
    textObjects  ?: Array<TextObject>,//A set of descriptive text blurbs for the comic.,
    resourceURI ?: string ,// The canonical URL identifier for this resource.,
    urls  ?: Array<Url>,//A set of public web site URLs for the resource.,
    series ?: SeriesSummary,//A summary representation of the series to which this comic belongs.,
    variants ?: Array<ComicSummary>,// A list of variant issues for this comic (includes the "original" issue if the current issue is a variant).,
    collections ?: Array<ComicSummary>,// A list of collections which include this comic (will generally be empty if the comic's format is a collection).,
    collectedIssues  ?: Array<ComicSummary>,// A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine").,
    dates  ?: Array<ComicDate> // A list of key dates for this comic.,
    prices  : Array<ComicPrice>,// A list of prices for this comic.,
    thumbnail ?: Image, //The representative image for this comic.,
    images  : Array<Image>,// A list of promotional images associated with this comic.,
    creators  ?: CreatorList,// A resource list containing the creators associated with this comic.,
    characters  ?: CharacterList,// A resource list containing the characters which appear in this comic.,
    stories  ?: StoryList, //A resource list containing the stories which appear in this comic.,
    events  ?: EventList,// A resource list containing the events in which this comic appears.
}

// characters
export interface ComicList {
    available ?: Number ,//The number of total available issues in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number ,//The number of issues returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of issues in this collection.,
    items ?:Array<ComicSummary>, // The list of returned issues in this collection.
}
export interface ComicSummary {
    resourceURI ?: string,// The path to the individual comic resource.,
    name ?: string,// The canonical name of the comic.
}
export interface StoryList {
    available ?: Number ,//The number of total available stories in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number ,//The number of stories returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of stories in this collection.,
    items ?:Array<StorySummary>, // The list of returned stories in this collection.
}
export interface StorySummary {
    resourceURI ?: string,// The path to the individual story resource.,
    name ?: string,// The canonical name of the story.,
    type ?: string,// The type of the story (interior or cover).
}
export interface SeriesList {
    available ?: Number,// The number of total available series in this list. Will always be greater than or equal to the "returned" value.,
    returned ?: Number,// The number of series returned in this collection (up to 20).,
    collectionURI ?: string,// The path to the full list of series in this collection.,
    items ?:Array<SeriesSummary>, // The list of returned series in this collection.
}
export interface  SeriesSummary {
    resourceURI ?: string,// The path to the individual series resource.,
    name ?: string,// The canonical name of the series.
}

export interface Character {
    id ?: Number ,// The unique ID of the character resource.,
    name : string,// The name of the character.,
    description ?: string,// A short bio or description of the character.,
    modified ?:string, // The date the resource was most recently modified.,
    resourceURI ?: string,// The canonical URL identifier for this resource.,
    urls ?:Array<Url>, // A set of public web site URLs for the resource.,
    thumbnail ?:Image, // The representative image for this character.,
    comics ?:ComicList,// A resource list containing comics which feature this character.,
    stories ?:StoryList, // A resource list of stories in which this character appears.,
    events ?:EventList, // A resource list of events in which this character appears.,
    series ?:SeriesList, // A resource list of series in which this character appears.
    }



// creator
export interface Creator {
    id ?: Number ,// The unique ID of the creator resource.,
    firstName ?: string ,// The first name of the creator.,
    middleName ?: string ,// The middle name of the creator.,
    lastName ?: string ,// The last name of the creator.,
    suffix ?: string ,// The suffix or honorific for the creator.,
    fullName ?: string ,// The full name of the creator (a space-separated concatenation of the above four fields).,
    modified ?: string ,// The date the resource was most recently modified.,
    resourceURI ?: string ,// The canonical URL identifier for this resource.,
    urls ?:Array<Url>, //A set of public web site URLs for the resource.,
    thumbnail ?:Image, //The representative image for this creator.,
    series ?:SeriesList, //A resource list containing the series which feature work by this creator.,
    stories ?:StoryList, //A resource list containing the stories which feature work by this creator.,
    comics ?:ComicList, //A resource list containing the comics which feature work by this creator.,
    events ?:EventList, //A resource list containing the events which feature work by this creator.
}


// events


export interface Event {
    id ?: Number, // The unique ID of the event resource.,
    title ?: string ,// The title of the event.,
    description ?: string ,// A description of the event.,
    resourceURI ?: string ,// The canonical URL identifier for this resource.,
    urls ?:Array<Url>,// A set of public web site URLs for the event.,
    modified ?: string,// The date the resource was most recently modified.,
    start ?: string,// The date of publication of the first issue in this event.,
    end ?: string,// The date of publication of the last issue in this event.,
    thumbnail ?:Image,// The representative image for this event.,
    comics ?:ComicList,// A resource list containing the comics in this event.,
    stories ?:StoryList,// A resource list containing the stories in this event.,
    series ?:SeriesList,// A resource list containing the series in this event.,
    characters ?:CharacterList,// A resource list containing the characters which appear in this event.,
    creators ?:CreatorList,// A resource list containing creators whose work appears in this event.,
    next ?:EventSummary,// A summary representation of the event which follows this event.,
    previous ?:EventSummary,// A summary representation of the event which preceded this event.
    }