export interface KitsuResponse {
	data: KitsuResponseItem[];
	meta: Meta;
	links: Links;
}

export interface Links {
	first: string;
	next: string;
	last: string;
}

export interface Meta {
	count: number;
}

export interface KitsuResponseItem {
	id: string;
	type: string;
	links: ResponseLinks;
	attributes: Attributes;
	relationships: { [key: string]: Relationship };
}

export interface Attributes {
	createdAt: string;
	updatedAt: string;
	slug: string;
	synopsis: string;
	description: string;
	coverImageTopOffset: number;
	titles: Titles;
	canonicalTitle: string;
	abbreviatedTitles: unknown[];
	averageRating: string;
	ratingFrequencies: { [key: string]: string };
	userCount: number;
	favoritesCount: number;
	startDate: string;
	endDate: string;
	nextRelease: null;
	popularityRank: number;
	ratingRank: number;
	ageRating: string;
	ageRatingGuide: string;
	subtype: string;
	status: string;
	tba: null;
	posterImage: PosterImage;
	coverImage: null;
	episodeCount: number;
	episodeLength: number;
	totalLength: number;
	youtubeVideoId: string;
	showType: string;
	nsfw: boolean;
}

export interface PosterImage {
	tiny: string;
	large: string;
	small: string;
	medium: string;
	original: string;
	meta: Meta;
}

export interface Meta {
	dimensions: Dimensions;
}

export interface Dimensions {
	tiny: Large;
	large: Large;
	small: Large;
	medium: Large;
}

export interface Large {
	width: number;
	height: number;
}

export interface Titles {
	en: string;
	en_jp: string;
	en_us: string;
	ja_jp: string;
}

export interface ResponseLinks {
	self: string;
}

export interface Relationship {
	links: RelationshipLinks;
}

export interface RelationshipLinks {
	self: string;
	related: string;
}
